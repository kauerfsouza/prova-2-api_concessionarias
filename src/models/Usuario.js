const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        senha: {
            type: String,
            required: true
        },
        secret2FA: {
            type: String,
            defaukt: Date.now
        }

    },
    { timestamps: true })

const Usuario = mongoose.model('Usuario', schema)

module.exports = Usuario