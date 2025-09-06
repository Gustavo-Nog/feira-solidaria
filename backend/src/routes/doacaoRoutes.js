const express = require('express');
const router = express.Router();

const doacaoController = require('../controllers/doacaoController');

router.post('/solicitar', doacaoController.solicitarDoacaoHandler);

router.get('/:id', doacaoController.buscarDoacaoPorIdHandler);

router.put('/:id/status', doacaoController.atualizarStatusDoacaoHandler);

module.exports = router;