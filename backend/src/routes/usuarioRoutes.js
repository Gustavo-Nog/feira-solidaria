const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.get('/', usuarioController.listarUsuariosHandler);
router.get('/');
router.post('/');
router.put('/');
router.delete('/');

module.exports = router;