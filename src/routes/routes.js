const express = require('express');
const router = express.Router();

// controllers
const ClienteController = require('../controllers/ClienteController');
const VendaController = require('../controllers/VendaController');
const FuncionarioController = require('../controllers/FuncionarioController');
const ManutencaoController = require('../controllers/ManutencaoController');
const VeiculoController = require('../controllers/VeiculoController');

// validators
const { validarID } = require('../validators/IdValidator')
const { validarCliente } = require('../validators/Clientevalidator')
const { validarFuncionario } = require('../validators/FuncionarioValidator')
const { validarVeiculo } = require('../validators/Veiculovalidator')
const { validarManutencao } = require('../validators/ManutencaoValidator')
const { validarVenda } = require('../validators/Vendavalidator')

// cliente
router.get('/Cliente', ClienteController.buscarTodos);
router.get('/Cliente/:id', validarID, ClienteController.buscarPorID);
router.post('/Cliente', validarCliente, ClienteController.criar);
router.put('/Cliente/:id', validarID, validarCliente, ClienteController.atualizar);
router.delete('/Cliente/:id', validarID, ClienteController.excluir);

// vendas
router.get('/Venda', VendaController.buscarTodos);
router.get('/Venda/:id', validarID, VendaController.buscarPorID);
router.post('/Venda', validarVenda, VendaController.criar);
router.put('/Venda/:id', validarID, validarVenda, VendaController.atualizar);
router.delete('/Venda/:id', validarID, VendaController.excluir);

// funcionarios
router.get('/Funcionarios', FuncionarioController.buscarTodos);
router.get('/Funcionarios/:id', validarID, FuncionarioController.buscarPorID);
router.post('/Funcionarios', validarFuncionario, FuncionarioController.criar);
router.put('/Funcionarios/:id', validarID, validarFuncionario, FuncionarioController.atualizar);
router.delete('/Funcionarios/:id', validarID, FuncionarioController.excluir);

// manutenção
router.post('/Manutencao', validarManutencao, ManutencaoController.criar);
router.get('/Manutencao', ManutencaoController.buscarTodos);
router.get('/Manutencao/:id', validarID, ManutencaoController.buscarPorID);
router.put('/Manutencao/:id', validarID, validarManutencao, ManutencaoController.atualizar);
router.delete('/Manutencao/:id', validarID, ManutencaoController.excluir);

// veiculos
router.post('/Veiculo', validarVeiculo, VeiculoController.criar);
router.get('/Veiculo', VeiculoController.buscarTodos);
router.get('/Veiculo/:id', validarID, VeiculoController.buscarPorID);
router.put('/Veiculo/:id', validarID, validarVeiculo, VeiculoController.atualizar);
router.delete('/Veiculo/:id', validarID, VeiculoController.excluir);

module.exports = router;
