const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favoritoController');

router.get('/', favoritoController.listarFavoritosHandler);

router.post('/', favoritoController.criarFavoritoHandler);

router.delete('/', favoritoController.deletarFavoritoHandler);


module.exports = router;