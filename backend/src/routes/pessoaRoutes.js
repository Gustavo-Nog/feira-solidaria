const express = require('express');
const router = express.Router();

const pessoaController = require('../controllers/pessoaController');
const pessoaEnderecoRoutes = require('./pessoaEnderecoRoutes');
const doacaoController = require('../controllers/doacaoController');

router.get('/', pessoaController.listarPessoasHandler);
router.get('/:id', pessoaController.buscarPessoaPorIdHandler);
router.post('/', pessoaController.criarPessoaHandler);
router.put('/:id', pessoaController.atualizarPessoaHandler);
router.delete('/:id', pessoaController.deletarPessoaHandler);
router.use('/:pessoaId/enderecos', pessoaEnderecoRoutes);
router.get('/:pessoaId/doacoes', doacaoController.listarDoacoesPorPessoaHandler);

module.exports = router;