const express = require('express');
const router = express.Router();

const pessoaController = require('../controllers/pessoaController');
const doacaoController = require('../controllers/doacaoController');
const pessoaEnderecoRoutes = require('./pessoaEnderecoRoutes');
const telefoneRoutes = require('./telefoneRoutes');

router.get('/', pessoaController.listarPessoasHandler);
router.get('/:id', pessoaController.buscarPessoaPorIdHandler);
router.post('/', pessoaController.criarPessoaHandler);
router.put('/:id', pessoaController.atualizarPessoaHandler);
router.delete('/:id', pessoaController.deletarPessoaHandler);
router.use('/:pessoaId/enderecos', pessoaEnderecoRoutes);
router.get('/:pessoaId/doacoes', doacaoController.listarDoacoesPorPessoaHandler);

router.use('/:pessoaId/telefones', telefoneRoutes);

module.exports = router;