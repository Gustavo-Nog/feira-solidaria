const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("feira-solidaria");
});

module.exports = app;
