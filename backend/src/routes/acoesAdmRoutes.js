const express = require('express');
const router = express.Router();

const acoesAdmController = require('../controllers/acoesAdmController');

router.get('/total-acoesAdm', acoesAdmController.totalAcoesAdmHandler);
router.get('/', acoesAdmController.listarAcoesAdmHandler);
router.get('/:id', acoesAdmController.buscarAcoesAdmPorIdHandler);
router.get('/usuario/:usuarioId', acoesAdmController.buscarAcoesAdmPorUsuarioHandler);
router.post('/', acoesAdmController.criarAcaoAdmHandler);
router.put('/:id', acoesAdmController.atualizarAcaoAdmHandler);
router.delete('/:id', acoesAdmController.deletarAcaoAdmHandler);

module.exports = router;