const app = require('./app');
const PORT = process.env.PORT || 3001;

const pessoaRoutes = require('./routes/pessoaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const favoritoRoutes = require('./routes/favoritoRoutes');

app.use('/api/pessoas', pessoaRoutes);
app.use('/produtos', produtoRoutes); 
app.use('/favoritos', favoritoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
