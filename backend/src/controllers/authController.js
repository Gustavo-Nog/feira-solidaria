require('dotenv').config();
const prisma = require('../generated/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const passport = require('passport');
require('../services/loginGoogleServices');


const login = async (req, res) => {
  const { nomeUsuario, senha } = req.body;
  if (!nomeUsuario || !senha) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { 
        nomeUsuario 
      }
    });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const tokenDeAcesso = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_SECRET_EXPIRES }
    );

    const refreshToken = jwt.sign(
      { id: usuario.id },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES }
    );

    return res.status(200).json({ message: 'Login bem sucedido', tokenDeAcesso, refreshToken });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: 'Logout realizado' });
};

const loginGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (erro, usuario, info) => {
    if (erro || !usuario) {
      console.error(erro || info);
      return res.redirect('http://localhost:5173/login?error=google');
    }

    const tokenDeAcesso = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_SECRET_EXPIRES }
    );

    const refreshToken = jwt.sign(
      { id: usuario.id },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES }
    );

    // Setando cookies
    res.cookie('accessToken', tokenDeAcesso, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRES) || 24 * 60 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRES) || 24 * 60 * 60 * 1000
    });

    // Redireciona para o frontend
    return res.redirect('http://localhost:5173/');
  })(req, res, next);
};

module.exports = {
  login,
  logout,
  loginGoogle,
  googleCallback
};