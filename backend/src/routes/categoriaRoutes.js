const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categoriaController');

router.get('/total-categorias', categoriaController.totalCategoriasHandler);
router.get('/', categoriaController.listarCategoriasHandler);
router.get('/:id', categoriaController.buscarCategoriaPorIdHandler);
router.post('/', categoriaController.criarCategoriaHandler);
router.put('/:id', categoriaController.atualizarCategoriaHandler);
router.delete('/:id', categoriaController.deletarCategoriaHandler);

module.exports = router;