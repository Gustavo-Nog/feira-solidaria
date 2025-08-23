const express = require('express');
const app = express();
const produtoRoutes = require('./routes/produtoRoutes');
const favoritoRoutes = require('./routes/favoritoRoutes');

app.use('/favoritos', favoritoRoutes);
app.use('/produto', produtoRoutes);
app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
