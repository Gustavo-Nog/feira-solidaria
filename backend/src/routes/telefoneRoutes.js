const express = require('express');
const router = express.Router();
const telefoneController = require('../controllers/telefoneController');


router.get('/:id', telefoneController.listarTelefonesHandler);
router.post('/:id', telefoneController.criarTelefoneHandler);
router.put('/:id', telefoneController.atualizarTelefoneHandler);
router.delete('/:id', telefoneController.deletarTelefoneHandler);

module.exports = router;
