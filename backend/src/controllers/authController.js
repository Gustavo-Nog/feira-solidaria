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

    res.cookie('accessToken', tokenDeAcesso, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 604800000
    });

    const dadosCompletosDaPessoa = await pessoaModel.buscarPessoaPorId(usuario.pessoa.id);

    return res.status(200).json({
      message: 'Login bem sucedido',
      usuario: dadosCompletosDaPessoa,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logout realizado com sucesso' });
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

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, async (erro, usuarioPassport, info) => {
    if (erro || !usuarioPassport) {
      console.error(erro || info);
      return res.redirect(`${FRONTEND_URL}/login?error=google`);
    }

    try {
      const usuarioCompleto = await prisma.usuario.findUnique({
        where: { id: usuarioPassport.id },
        include: { pessoa: true }
      });

      if (!usuarioCompleto) {
        return res.redirect(`${FRONTEND_URL}/login?error=usuario_nao_encontrado`);
      }

      const payload = {
        usuarioId: usuarioCompleto.id,
        pessoaId: usuarioCompleto.pessoa?.id
      };

      const tokenDeAcesso = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_SECRET_EXPIRES });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES });

      res.cookie('accessToken', tokenDeAcesso, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 3600000
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 604800000
      });

      return res.redirect(`${FRONTEND_URL}/`);

    } catch (dbError) {
      console.error("Erro ao re-buscar utilizador no callback do Google:", dbError);
      return res.redirect(`${FRONTEND_URL}/login?error=bd`);
    }

  })(req, res, next);
};

module.exports = {
  login,
  logout,
  loginGoogle,
  googleCallback,
  buscarPerfil,
};