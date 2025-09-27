const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = required('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')));

let FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
if (FRONTEND_URL.endsWith('/')) {
  FRONTEND_URL = FRONTEND_URL.slice(0, -1);
}
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

const pessoaRoutes = require('./routes/pessoaRoutes');
const acoesAdmRoutes = require('./routes/acoesAdmRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const doacaoRoutes = require('./routes/doacaoRoutes');
const favoritoRoutes = require('./routes/favoritoRoutes');
const authRoutes = require('./routes/authRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const telefoneRoutes = require('./routes/telefoneRoutes');
const mensagemRoutes = require('./routes/mensagemRoutes');

app.use('/api/acoesAdm', acoesAdmRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/doacoes', doacaoRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/enderecos', enderecoRoutes);
app.use('/api/favoritos', favoritoRoutes);
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/telefones', telefoneRoutes);
app.use('/api/mensagens', mensagemRoutes);

app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
