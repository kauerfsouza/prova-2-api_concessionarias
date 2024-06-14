const Veiculo = require('../models/Veiculo');

async function buscarTodos(req, res) {
    res.json(await Veiculo.find().populate(['marca', 'modelo']));
}

async function buscarPorID(req, res) {
    const veiculo = await Veiculo.findById(req.params.id).populate(['marca', 'modelo']);
    if (veiculo) {
        res.json(veiculo);
    } else {
        res.status(404).json({ mensagem: "Veiculo não encontrado!" });
    }
}

async function criar(req, res) {
    const novoVeiculo = new Veiculo(req.body);
    const veiculoCriado = await novoVeiculo.save();
    res.status(201).json(veiculoCriado);
}

async function atualizar(req, res) {
    const veiculoAtualizado = await Veiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (veiculoAtualizado) {
        res.json({
            mensagem: "Veiculo atualizado com sucesso!",
            veiculoAtualizado
        });
    } else {
        res.status(404).json({ mensagem: "Veiculo não encontrado!" });
    }
}

async function excluir(req, res) {
    const veiculoExcluido = await Veiculo.findByIdAndDelete(req.params.id);
    if (veiculoExcluido) {
        res.json({
            mensagem: "Veiculo excluído com sucesso!",
            veiculoExcluido
        });
    } else {
        res.status(404).json({ mensagem: "Veiculo não encontrado!" });
    }
}

module.exports = {
    buscarTodos,
    buscarPorID,
    criar,
    atualizar,
    excluir
};
