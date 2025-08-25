const express = require('express');
const app = (express.json());

const pessoaRoutes = require('./routes/pessoaRoutes');
const acoesAdmRoutes = require('./routes/acoesAdmRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

app.use('/api/pessoas', pessoaRoutes);
app.use('/api/acoesAdm', acoesAdmRoutes);
app.use('/api/categorias', categoriaRoutes);

app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
