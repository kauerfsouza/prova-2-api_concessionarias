const mongoose = require('mongoose');

const vendaSchema = new mongoose.Schema({
    id_veiculo: {
        type: String,
        required: [true, 'ID do veículo é obrigatório']
    },
    id_cliente: {
        type: String,
        required: [true, 'ID do cliente é obrigatório']
    },
    id_funcionario: {
        type: String,
        required: [true, 'ID do funcionário é obrigatório']
    },
    data_venda: {
        type: Date,
        required: [true, 'Data da venda é obrigatória']
    },
    valor: {
        type: Number,
        required: [true, 'Valor é obrigatório']
    }
});

const Venda = mongoose.model('Venda', vendaSchema);
module.exports = Venda;
