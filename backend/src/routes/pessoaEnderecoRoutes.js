const express = require('express');

const router = express.Router({ mergeParams: true });

const pessoaEnderecoController = require('../controllers/pessoaEnderecoController');

router.post('/', pessoaEnderecoController.associarPessoaEnderecoHandler);
router.delete('/:enderecoId', pessoaEnderecoController.desassociarPessoaEnderecoHandler);

module.exports = router;