const mongoose = require('mongoose')


const schema = new mongoose.Schema(
    {
        id_veiculo: {
            type: String,
            required: true
        },
        id_cliente: {
            type: String,
            required: true
        },
        id_funcionario: {
            type: String,
            required: true
        },
        valor: {
            type: Number,
            required: true
        },
        data_venda: {
            type: Date,
            required: true
        },
        
       
    },
    { timestamps: true })

const Manutencao = mongoose.model('Manutencao', schema)

module.exports = Manutencao