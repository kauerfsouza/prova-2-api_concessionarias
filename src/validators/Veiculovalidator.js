const yup = require('yup');

const schema = yup.object().shape({
    modelo: yup
        .string()
        .required("Modelo é um campo obrigatório"),
    marca: yup
        .string()
        .required("Marca é um campo obrigatório"),
    quilometragem: yup
        .number()
        .min(0, "Quilometragem não pode ser negativa")
        .required("Quilometragem é um campo obrigatório"),
    ano: yup
        .number()
        .positive("Ano deve ser um número positivo")
        .integer("Ano deve ser um número inteiro")
        .required("Ano é um campo obrigatório"),
    valor: yup
        .number()
        .min(0, "Valor não pode ser negativo")
        .required("Valor é um campo obrigatório"),
});

function validarVeiculo(req, res, next) {
    schema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const errors = err.inner.map(e => ({
                campo: e.path,
                erros: e.errors
            }));
            res.status(400).json({
                mensagem: "Falha na validação dos campos",
                err
            });
        });
}

module.exports = {
    validarVeiculo
};
