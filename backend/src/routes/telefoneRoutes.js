const express = require('express');
const router = express.Router({ mergeParams: true });

const telefoneController = require('../controllers/telefoneController');

router.get('/', telefoneController.listarTelefonesHandler);
router.post('/', telefoneController.adicionarTelefoneHandler);

router.put('/:telefoneId', telefoneController.atualizarTelefoneHandler);
router.delete('/:telefoneId', telefoneController.deletarTelefoneHandler);

module.exports = router;