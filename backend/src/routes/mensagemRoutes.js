const express = require('express');
const router = express.Router();
const mensagemController = require('../controllers/mensagemController');

router.get('/', mensagemController.listarMensagens);

router.get('/:id', mensagemController.buscarMensagemPorId);

router.post('/', mensagemController.criarMensagem);

router.put('/:id', mensagemController.atualizarMensagem);

router.delete('/:id', mensagemController.deletarMensagem);

module.exports = router;