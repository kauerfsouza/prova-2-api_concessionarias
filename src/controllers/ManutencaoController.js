const Manutencao = require('../models/Manutencao');

async function buscarTodos(req, res) {
    res.json(await Manutencao.find().populate(['serviço', 'id_funcionario']));
}

async function buscarPorID(req, res) {
    const manutencao = await Manutencao.findById(req.params.id).populate(['serviço', 'id_funcionario']);
    if (manutencao) {
        res.json(manutencao);
    } else {
        res.status(404).json({ mensagem: "Manutencao não encontrada!" });
    }
}

async function criar(req, res) {
    const novaManutencao = new Manutencao(req.body);
    const manutencaoCriada = await novaManutencao.save();
    res.status(201).json(manutencaoCriada);
}

async function atualizar(req, res) {
    const manutencaoAtualizada = await Manutencao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (manutencaoAtualizada) {
        res.json({
            mensagem: "Manutencao atualizada com sucesso!",
            manutencaoAtualizada
        });
    } else {
        res.status(404).json({ mensagem: "Manutencao não encontrada!" });
    }
}

async function excluir(req, res) {
    const manutencaoExcluida = await Manutencao.findByIdAndDelete(req.params.id);
    if (manutencaoExcluida) {
        res.json({
            mensagem: "Manutencao excluída com sucesso!",
            manutencaoExcluida
        });
    } else {
        res.status(404).json({ mensagem: "Manutencao não encontrada!" });
    }
}

module.exports = {
    buscarTodos,
    buscarPorID,
    criar,
    atualizar,
    excluir
};
