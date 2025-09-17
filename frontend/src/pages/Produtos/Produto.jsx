import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import produtoServices from '../../services/produtoServices';
import favoritoService from '../../services/favoritoServices';

import Button from '../../components/Button/Button';
import './Produto.css';

function Produtos() {
  const navigate = useNavigate();
  const { usuario } = useUser();

  const [produtos, setProdutos] = useState([]);
  const [favoritos, setFavoritos] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [qualidade, setQualidade] = useState('');

  useEffect(() => {
    async function carregarDados() {
      try {

        const [listaProdutos, listaFavoritos] = await Promise.all([
          produtoServices.listarProdutos(),
          usuario ? favoritoService.listarFavoritos(usuario.pessoaId) : Promise.resolve([])
        ]);
        
        setProdutos(listaProdutos);
        if (listaFavoritos) {
          setFavoritos(new Set(listaFavoritos.map(fav => fav.produtoId)));
        }
      } catch (err) {
        console.error('Erro ao carregar dados:', err.message);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [usuario]);

  const toggleFavorito = async (produtoId) => {
    if (!usuario) {
      toast.warn("Você precisa estar logado para favoritar itens.");
      navigate('/login');
      return;
    }

    const estaFavoritado = favoritos.has(produtoId);
    
    try {
      if (estaFavoritado) {
        await favoritoService.deletarFavorito(usuario.pessoaId, produtoId);
        
        setFavoritos(prev => {
          const novoSet = new Set(prev);
          novoSet.delete(produtoId);
          return novoSet;
        });
      } else {
        const payload = {
          pessoaId: usuario.pessoaId,
          produtoId: produtoId
        };
        await favoritoService.criarFavorito(payload);
        setFavoritos(prev => new Set(prev).add(produtoId));
      }
    } catch (error) {
      console.error("Erro ao favoritar produto:", error.message);
    }
  };
  
  const categorias = [...new Set(produtos.map(p => p.categoria?.nomeCategoria).filter(Boolean))];
  const qualidades = [...new Set(produtos.map(p => p.qualidade).filter(Boolean))];

  const produtosFiltrados = produtos.filter((produto) => {
    const filtraNome = produto.nomeProduto.toLowerCase().includes(busca.toLowerCase());
    const filtraCategoria = categoriaSelecionada === '' || produto.categoria?.nomeCategoria === categoriaSelecionada;
    const filtraQualidade = qualidade === '' || produto.qualidade === qualidade;
    return filtraNome && filtraCategoria && filtraQualidade;
  });

  const verDetalhes = (id) => navigate(`/item/${id}`);

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

        <div className="col-md-3 mb-3">
          <label htmlFor="categoria" className="form-label">Filtrar por categoria</label>
          <select
            id="categoria"
            className="form-select"
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <label htmlFor="qualidade" className="form-label">Filtrar por qualidade</label>
          <select
            id="qualidade"
            className="form-select"
            value={qualidade}
            onChange={(e) => setQualidade(e.target.value)}
          >
            <option value="">Todas</option>
            {qualidades.map((qual, index) => (
              <option key={index} value={qual}>{qual}</option>
            ))}
          </select>
        </div>
      </form>

      {loading ? (
        <div className="text-center mt-5"><h5 className="text-muted">A carregar produtos...</h5></div>
      ) : (
        <div className="row g-4">
          {produtosFiltrados.length === 0 ? (
            <div className="text-center mt-5">
              <h5 className="text-muted">Nenhum item encontrado.</h5>
            </div>
          ) : (
            produtosFiltrados.map((produto) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={produto.id}>
                <div className="card h-100 shadow-sm position-relative">
                  <button
                    className={`btn-favorito ${favoritos.has(produto.id) ? 'ativo' : ''}`}
                    onClick={() => toggleFavorito(produto.id)}
                    title={favoritos.has(produto.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    {favoritos.has(produto.id) ? '★' : '☆'}
                  </button>
                  <img
                    src={produto.imagemUrl || 'https://placehold.co/400x300'}
                    alt={produto.nomeProduto}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{produto.nomeProduto}</h5>
                    <p className="card-text text-muted small flex-grow-1">{produto.descricao}</p>
                    <span className="badge bg-success mb-2 align-self-start">
                      {produto.categoria?.nomeCategoria || 'Sem Categoria'}
                    </span>
                    <div className="mt-auto">
                      <Button size="small" onClick={() => verDetalhes(produto.id)}>
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Produtos;