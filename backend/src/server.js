const app = require('./app');
const PORT = process.env.PORT || 3001;

const pessoaRoutes = require('./routes/pessoaRoutes');



app.use('/api/pessoas', pessoaRoutes);
 


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
