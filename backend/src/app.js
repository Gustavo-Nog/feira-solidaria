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
const produtoRoutes = require('./routes/produtoRoutes');
const doacaoRoutes = require('./routes/doacaoRoutes');
<<<<<<< HEAD
const mensagemRoutes = require('./routes/mensagemRoutes');
=======
>>>>>>> 57caedf (feat: adicionar gerenciamento de doações com rotas, controladores e modelos)

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
