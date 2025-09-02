const express = require('express');
const app = express();

app.use(express.json());

const pessoaRoutes = require('./routes/pessoaRoutes');
const acoesAdmRoutes = require('./routes/acoesAdmRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');

app.use('/api/pessoas', pessoaRoutes);
app.use('/api/acoesAdm', acoesAdmRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/enderecos', enderecoRoutes);

app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
