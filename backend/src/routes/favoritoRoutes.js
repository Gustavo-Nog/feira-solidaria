const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favoritoController');

router.get('/', favoritoController.listarFavoritosHandler);
router.get('/:id', favoritoController.buscarFavoritoPorIdHandler);
router.post('/', favoritoController.criarFavoritoHandler);
router.delete('/:id', favoritoController.deletarFavoritoHandler);

module.exports = router;