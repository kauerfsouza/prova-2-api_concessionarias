const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const JWT_SECRET = process.env.JWT_SECRET;

async function registrar(req, res) {
    try {
        const { nome, email, senha } = req.body;

        // Verificar se todos os campos foram enviados
        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
        }

        // Verificar se o usuário já está cadastrado
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensagem: "Este e-mail já está cadastrado!" });
        }

        // Criptografar a senha
        const hash = await bcrypt.hash(senha, 10);

        // Criar um novo usuário
        const novoUsuario = new Usuario({ nome, email, senha: hash });
        await novoUsuario.save();

        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro durante o registro:", error);
        res.status(500).json({ mensagem: "Ocorreu um erro durante o registro do usuário." });
    }
}

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        // Verificar se todos os campos foram enviados
        if (!email || !senha) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
        }

        // Verificar se o usuário existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensagem: "Usuário não encontrado!" });
        }

        // Verificar se a senha está correta
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha incorreta!" });
        }

        // Gerar token de autenticação
        const token = jwt.sign({ nome: usuario.nome, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ mensagem: "Usuário logado com sucesso!", token });
    } catch (error) {
        console.error("Erro durante o login:", error);
        res.status(500).json({ mensagem: "Ocorreu um erro durante o login do usuário." });
    }
}

async function enable2FA(req, res) {
    try {
        const usuario = await Usuario.findById(req.user._id);
        if (!usuario) {
            return res.status(404).send();
        }

        const secret = speakeasy.generateSecret({ length: 20 });
        usuario.secret2FA = secret.base32;

        await usuario.save();

        const otpauth_url = secret.otpauth_url;
        qrcode.toDataURL(otpauth_url, (err, data_url) => {
            res.send({ secret: secret.base32, qrCodeURL: data_url });
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function verify2FA(req, res) {
    const { token } = req.body;
    try {
        const usuario = await Usuario.findById(req.user._id);
        if (!usuario) {
            return res.status(404).send();
        }

        const verified = speakeasy.totp.verify({
            secret: usuario.secret2FA,
            encoding: 'base32',
            token
        });

        if (verified) {
            res.send({ message: '2FA verificado com sucesso' });
        } else {
            res.status(400).send({ error: 'Código 2FA inválido' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = { 
    registrar, 
    login,
    enable2FA,
    verify2FA
 };
