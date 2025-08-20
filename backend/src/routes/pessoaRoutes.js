const express = require('express');
const router = express.Router();

const pessoaController = require('../controllers/pessoaController');

router.get('/', pessoaController.listarPessoasHandler);
router.get('/:id', pessoaController.buscarPessoaPorIdHandler);
router.post('/', pessoaController.criarPessoaHandler);
router.put('/:id', pessoaController.atualizarPessoaHandler);
router.delete('/:id', pessoaController.deletarPessoaHandler);

module.exports = router;