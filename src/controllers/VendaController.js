const Venda = require('../models/Venda');

async function buscarTodos(req, res) {
    res.json(await Venda.find());
}

async function buscarPorID(req, res) {
    const venda = await Venda.findById(req.params.id);
    if (venda) {
        res.json(venda);
    } else {
        res.status(404).json({ mensagem: "Venda não encontrada!" });
    }
}

async function criar(req, res) {
    const novaVenda = new Venda(req.body);
    const vendaCriada = await novaVenda.save();
    res.status(201).json(vendaCriada);
}

async function atualizar(req, res) {
    const vendaAtualizada = await Venda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (vendaAtualizada) {
        res.json({
            mensagem: "Venda atualizada com sucesso!",
            vendaAtualizada
        });
    } else {
        res.status(404).json({ mensagem: "Venda não encontrada!" });
    }
}

async function excluir(req, res) {
    const vendaExcluida = await Venda.findByIdAndDelete(req.params.id);
    if (vendaExcluida) {
        res.json({
            mensagem: "Venda excluída com sucesso!",
            vendaExcluida
        });
    } else {
        res.status(404).json({ mensagem: "Venda não encontrada!" });
    }
}

module.exports = {
    buscarTodos,
    buscarPorID,
    criar,
    atualizar,
    excluir
};
