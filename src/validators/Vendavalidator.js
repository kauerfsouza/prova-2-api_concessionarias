const yup = require('yup');

// Definindo o esquema de validação usando Yup
const schema = yup.object().shape({
    id_veiculo: yup
        .string()
        .required("ID do veículo é um campo obrigatório"),
    id_cliente: yup
        .string()
        .required("ID do cliente é um campo obrigatório"),
    id_funcionario: yup
        .string()
        .required("ID do funcionário é um campo obrigatório"),
    data_venda: yup
        .date()
        .typeError("Insira uma data válida")
        .required("Data da venda é um campo obrigatório"),
    valor: yup
        .number()
        .typeError("Insira um valor numérico")
        .required("Valor é um campo obrigatório"),
});

// Middleware de validação
function validarVenda(req, res, next) {
    schema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const errors = err.inner.map(e => ({
                campo: e.path,
                mensagem: e.message
            }));
            res.status(400).json({
                mensagem: "Falha na validação dos campos",
                erros: errors
            });
        });
}

module.exports = {
    validarVenda
};
