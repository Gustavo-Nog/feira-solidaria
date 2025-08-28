const express = require('express');
const app = express();





app.use(express.json());

const usuarioRoutes = require('./routes/usuarioRoutes');
const pessoaRoutes = require('./routes/pessoaRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const favoritoRoutes = require('./routes/favoritoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/enderecos', enderecoRoutes);
app.use('/api/pessoas', pessoaRoutes);

app.use('/favoritos', favoritoRoutes);
app.use('/produto', produtoRoutes);
app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
