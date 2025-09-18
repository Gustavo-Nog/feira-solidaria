require('dotenv').config();
const prisma = require('../generated/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../services/loginGoogleServices');

const pessoaModel = require('../models/pessoaModel');

const login = async (req, res) => {
  const { nomeUsuario, senha } = req.body;
  if (!nomeUsuario || !senha) {
    return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { nomeUsuario },
      include: {
        pessoa: {
          select: { id: true }
        }
      }
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }
    const payload = {
      usuarioId: usuario.id,
      pessoaId: usuario.pessoa?.id
    };

    const tokenDeAcesso = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_SECRET_EXPIRES });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES });

    return res.status(200).json({
      message: 'Login bem sucedido',
      tokenDeAcesso,
      refreshToken,
      usuario: payload 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: 'Logout realizado' });
};

const buscarPerfil = async (req, res) => {
  try {
    const pessoaId = req.usuario.pessoaId;
    if (!pessoaId) {
        return res.status(404).json({ error: 'Este utilizador não tem um perfil de pessoa associado.' });
    }

    const perfil = await pessoaModel.buscarPessoaPorId(pessoaId);
    if (!perfil) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    res.status(200).json({ usuario: perfil });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

    return res.redirect('http://localhost:5173/');
  })(req, res, next);
};

module.exports = {
  login,
  logout,
  loginGoogle,
  googleCallback,
  buscarPerfil,
};