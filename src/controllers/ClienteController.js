const Cliente = require('../models/Cliente');

// Busca todos os clientes
async function buscarTodos(req, res) {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar clientes" });
    }
}

// Busca um cliente por ID
async function buscarPorID(req, res) {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ mensagem: "Cliente não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar cliente" });
    }
}

// Cria um novo cliente
async function criar(req, res) {
    try {
        const novoCliente = new Cliente(req.body);
        const clienteCriado = await novoCliente.save();
        res.status(201).json(clienteCriado);
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao criar cliente" });
    }
}

// Atualiza um cliente existente por ID
async function atualizar(req, res) {
    try {
        const clienteAtualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (clienteAtualizado) {
            res.json({
                mensagem: "Cliente atualizado com sucesso!",
                clienteAtualizado
            });
        } else {
            res.status(404).json({ mensagem: "Cliente não encontrado!" });
        }
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao atualizar cliente" });
    }
}

// Exclui um cliente por ID
async function excluir(req, res) {
    try {
        const clienteExcluido = await Cliente.findByIdAndDelete(req.params.id);
        if (clienteExcluido) {
            res.json({
                mensagem: "Cliente excluído com sucesso!",
                clienteExcluido
            });
        } else {
            res.status(404).json({ mensagem: "Cliente não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir cliente" });
    }
}

module.exports = {
    buscarTodos,
    buscarPorID,
    criar,
    atualizar,
    excluir
};
