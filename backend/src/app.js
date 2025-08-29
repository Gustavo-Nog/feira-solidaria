const express = require('express');
const app = express();

app.use(express.json());

<<<<<<< HEAD
const pessoaRoutes = require('./routes/pessoaRoutes');
const acoesAdmRoutes = require('./routes/acoesAdmRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
=======
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const pessoasRoutes = require('./routes/pessoaRoutes');
>>>>>>> ad6531a (feat: chama o authRoutes no arquivo)
const enderecoRoutes = require('./routes/enderecoRoutes');
const telefoneRoutes = require('./routes/telefoneRoutes');

app.use('/api/acoesAdm', acoesAdmRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/enderecos', enderecoRoutes);
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/telefones', telefoneRoutes);

app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
