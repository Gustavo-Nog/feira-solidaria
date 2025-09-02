const express = require('express');
const app = express();

app.use(express.json());

const pessoaRoutes = require('./routes/pessoaRoutes');
const acoesAdmRoutes = require('./routes/acoesAdmRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const favoritoRoutes = require('./routes/favoritoRoutes');
const authRoutes = require('./routes/authRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const telefoneRoutes = require('./routes/telefoneRoutes');

app.use('/api/acoesAdm', acoesAdmRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/enderecos', enderecoRoutes);
app.use('/api/favoritos', favoritoRoutes);
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/telefones', telefoneRoutes);

app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
