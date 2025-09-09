const express = require('express');
const router = express.Router();
const mensagemController = require('../controllers/mensagemController');

router.get('/', mensagemController.listarMensagensHandler);

router.get('/:id', mensagemController.buscarMensagemPorIdHandler);

router.post('/', mensagemController.criarMensagemHandler);

router.put('/:id', mensagemController.atualizarMensagemHandler);

router.delete('/:id', mensagemController.deletarMensagemHandler);

module.exports = router;