const yup = require('yup');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const registroSchema = yup.object().shape({
    nome: yup.string().required("Campo obrigatório"),
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    senha: yup.string().required("Campo obrigatório"),
});

function validarUsuario(req, res, next) {
    registroSchema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const erros = err.inner.map(e => ({
                campo: e.path,
                erros: e.errors
            }));
            res.status(400).json({
                mensagem: "Falha na validação dos campos",
                erros
            });
        });
}

const loginSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    senha: yup.string().required("Campo obrigatório"),
});

function validarLogin(req, res, next) {
    loginSchema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const erros = err.inner.map(e => ({
                campo: e.path,
                erros: e.errors
            }));
            res.status(400).json({
                mensagem: "Falha na validação dos campos",
                erros
            });
        });
}

async function checkToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).json({ mensagem: "Token inválido" });
    }
}

module.exports = {
    validarUsuario,
    validarLogin,
    checkToken
};
