const express = require('express');
const app = require('./app');
const PORT = process.env.PORT || 3001;
app.use(express.json());

const pessoaRoutes = require('./routes/pessoaRoutes');
const acoesAdmRoutes = require('./routes/acoesAdmRoutes');

app.use('/api/pessoas', pessoaRoutes);
app.use('/api/acoesAdm', acoesAdmRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
