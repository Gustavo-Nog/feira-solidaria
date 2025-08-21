const express = require('express');
const app = express();
const produtoRoutes = require('./routes/produtoRoutes');

app.use('/api', produtoRoutes);
app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
