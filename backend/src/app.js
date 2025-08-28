const express = require('express');
const app = express();
const produtoRoutes = require('./routes/produtoRoutes');
const favoritoRoutes = require('./routes/favoritoRoutes');

app.use('/produtos', produtoRoutes); 
app.use('/favoritos', favoritoRoutes);

app.use(express.json());

const usuarioRoutes = require('./routes/usuarioRoutes');
const pessoaRoutes = require('./routes/pessoaRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/enderecos', enderecoRoutes);
app.use('/api/pessoas', pessoaRoutes);

app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
