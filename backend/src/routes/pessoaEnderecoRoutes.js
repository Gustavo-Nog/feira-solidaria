const express = require('express');
// O 'mergeParams: true' é essencial para que esta rota possa aceder ao :pessoaId da rota pai
const router = express.Router({ mergeParams: true });

const pessoaEnderecoController = require('../controllers/pessoaEnderecoController');

// Rota para ASSOCIAR um novo endereço a uma pessoa específica
// Exemplo de uso: POST /api/pessoas/1/enderecos
router.post('/', pessoaEnderecoController.associarPessoaEnderecoHandler);

// Rota para DESASSOCIAR um endereço de uma pessoa
// Exemplo de uso: DELETE /api/pessoas/1/enderecos/5
router.delete('/:enderecoId', pessoaEnderecoController.desassociarPessoaEnderecoHandler);

module.exports = router;