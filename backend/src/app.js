const express = require('express');
const app = express();

app.use(express.json());

const pessoaRoutes = require('./routes/pessoaRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const doacaoRoutes = require('./routes/doacaoRoute');
const mensagemRoutes = require('./routes/mensagemRoute');

app.use('/api/enderecos', enderecoRoutes);
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/doacoes', doacaoRoutes);
app.use('/api/mensagens', mensagemRoutes);

app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
