const express = require('express');
const app = express();

app.use(express.json());

const pessoaRoutes = require('./routes/pessoaRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');

app.use('/api/enderecos', enderecoRoutes);
app.use('/api/pessoas', pessoaRoutes);

app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
