const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/google', authController.loginGoogle);
router.get('/google/callback', authController.googleCallback);

router.get('/verificar-token', authMiddleware, authController.buscarPerfil);

module.exports = router;