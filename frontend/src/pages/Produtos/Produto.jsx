import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import produtoService from '../../services/produtoService';
import favoritoService from '../../services/favoritoServices';
import categoriaServices from '../../services/categoriaServices';

import Button from '../../components/Button/Button';
import './Produto.css';

function Produtos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [qualidade, setQualidade] = useState('');
  const [categorias, setCategorias] = useState([]);

  const toggleFavorito = async (produtoId) => {
    try {
      if (favoritos.includes(produtoId)) {
        await favoritoService.deletarFavorito(produtoId);
        setFavoritos(prev => prev.filter(id => id !== produtoId));
      } else {
        await favoritoService.criarFavorito({ produtoId });
        setFavoritos(prev => [...prev, produtoId]);
      }
    } catch (error) {
      console.error("Erro ao favoritar produto:", error.message);
    }
  };

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const lista = await produtoService.listarProdutos();
        setProdutos(lista);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err.message);
      }
    }
    carregarProdutos();
  }, []);

  useEffect(() => {
    async function carregarCategorias() {
      try { 
        const lista = await categoriaServices.listarCategorias();
        setCategorias(lista);
      } catch (err) {
        console.error('Erro ao carregar categorias:', err.message);
      }
    }
    carregarCategorias();
  }, []);

  const localizacoes = [...new Set(produtos.map(produto => produto.localizacao))];
  const qualidades = [...new Set(produtos.map(produto => produto.qualidade))];

  const produtosFiltrados = produtos.filter((produto) => {
    const filtraNome = produto.nomeProduto.toLowerCase().includes(busca.toLowerCase());
    const filtraCategoria = categoriaSelecionada === '' || produto.categoria.nome === categoriaSelecionada;
    const filtraLocalizacao = localizacao === '' || produto.localizacao === localizacao;
    const filtraQualidade = qualidade === '' || produto.qualidade === qualidade;

    return filtraNome && filtraCategoria && filtraLocalizacao && filtraQualidade;
  });

  const verDetalhes = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-uppercase">Produtos</h2>

      <form className="row mb-4">
        <div className="col-md-6 mb-3">
          <label htmlFor="busca" className="form-label">Buscar por nome</label>
          <input
            id="busca"
            type="text"
            className="form-control"
            placeholder="Digite o nome do produto"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="col-md-2 mb-3">
          <label htmlFor="categoria" className="form-label">Filtrar por categoria</label>
          <select
            id="categoria"
            className="form-select"
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
            ))}
          </select>
        </div>

        <div className="col-md-2 mb-3">
          <label htmlFor="localizacao" className="form-label">Filtrar por localização</label>
          <select
            id="localizacao"
            className="form-select"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          >
            <option value="">Todas as localizações</option>
            {localizacoes.map((localizacao, index) => (
              <option key={index} value={localizacao}>{localizacao}</option>
            ))}
          </select>
        </div>

        <div className="col-md-2 mb-3">
          <label htmlFor="qualidade" className="form-label">Filtrar por qualidade</label>
          <select
            id="qualidade"
            className="form-select"
            value={qualidade}
            onChange={(e) => setQualidade(e.target.value)}
          >
            <option value="">Todas as qualidades</option>
            {qualidades.map((qualidadeItem, index) => (
              <option key={index} value={qualidadeItem}>{qualidadeItem}</option>
            ))}
          </select>
        </div>
      </form>

      <div className="row g-4">
        {produtosFiltrados.length === 0 ? (
          <div className="text-center mt-5">
            <h5 className="text-muted">Nenhum item encontrado</h5>
          </div>
        ) : (
          produtosFiltrados.map((produto) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={produto.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={produto.imagemProduto}
                  alt={produto.nomeProduto}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{produto.nomeProduto}</h5>
                  <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                    {produto.descricaoProduto}
                  </p>
                  <span className="badge bg-primary mb-2 align-self-start">
                    {produto.categoria.nome}
                  </span>
                  <div className="mb-2 text-warning">★★★★★</div>
                  <Button size="small" onClick={() => verDetalhes(produto.id)}>
                    Ver Detalhes
                  </Button>
                   <button
                      className={`btn-favorito ${favoritos.includes(produto.id) ? 'ativo' : ''}`}
                       onClick={() => toggleFavorito(produto.id)}
                       > {favoritos.includes(produto.id) ? '★' : '☆'}
                      </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Produtos;