const yup = require('yup');

const schema = yup.object().shape({
    idVeiculo: yup
        .string()
        .required('ID do veículo é obrigatório'),
    idCliente: yup
        .string()
        .required('ID do cliente é obrigatório'),
    servico: yup
        .date()
        .required('Serviço é obrigatório'),
    dataentrada: yup
        .date()
        .required('Data de entrada é obrigatória'),
    datasaida: yup
        .date()
        .required('Data de saída é obrigatória')
});

function validarManutencao(req, res, next) {
    schema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const errors = err.inner.map(e => ({
                campo: e.path,
                erros: e.errors
            }));
            res.status(400).json({
                mensagem: "Falha na validação dos campos",
                erros: errors
            });
        });
}

module.exports = {
    validarManutencao
};
