const mongoose = require('mongoose');

const VeiculoSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    quilometragem: {
        type: Number,
        required: true
    },
    preco: {
        type: Number,  
        required: true
    }
});

const Veiculo = mongoose.model('Veiculo', VeiculoSchema);

module.exports = Veiculo;
