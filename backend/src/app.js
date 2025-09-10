const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

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
