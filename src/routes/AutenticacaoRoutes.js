const express = require('express')
const router = express.Router();


const AutenticacaoController = require('../controllers/AutenticacaoController')
const auth = require('../middleware/AutenticacaoMiddleware.js'); 
const { validarUsuario, validarLogin } = require('../validators/AutenticacaoValidator')

router.post('/auth/registrar', validarUsuario, AutenticacaoController.registrar);
router.post('/auth/login', validarLogin, AutenticacaoController.login);
router.post('/auth/enable2FA', auth, AutenticacaoController.enable2FA);
router.post('/auth/verify2FA', auth, AutenticacaoController.verify2FA);

module.exports = router