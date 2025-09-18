import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import produtoServices from '../../services/produtoServices';
import favoritoService from '../../services/favoritoServices';
import { toast } from 'react-toastify';

import Button from '../../components/Button/Button';
import './Produto.css';

function Produtos() {
  const navigate = useNavigate();

  const { usuario, loading: authLoading } = useUser();
  console.log('[Produtos.jsx] RENDERIZANDO. Estado atual -> authLoading:', authLoading, '| usuario:', usuario);

  const [produtos, setProdutos] = useState([]);
  const [favoritos, setFavoritos] = useState(new Set());
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [qualidade, setQualidade] = useState('');

  useEffect(() => {
    async function carregarDados() {
      console.log('[Produtos.jsx] useEffect ATIVADO. authLoading:', authLoading);
      if (authLoading) {
        console.log('[Produtos.jsx] useEffect: A aguardar o fim da autenticação...');
        return;
      }

      setLoadingProdutos(true);
      try {
        console.log(`[Produtos.jsx] useEffect: A buscar favoritos para pessoaId: ${usuario?.pessoaId}`);
        const [listaProdutos, listaFavoritos] = await Promise.all([
          produtoServices.listarProdutos(),
          usuario ? favoritoService.listarFavoritos(usuario.id) : Promise.resolve([])
        ]);
        
        setProdutos(listaProdutos);
        if (listaFavoritos) {
          setFavoritos(new Set(listaFavoritos.map(fav => fav.produtoId)));
        }
      } catch (err) {
        console.error('Erro ao carregar dados:', err.message);
      } finally {
        setLoadingProdutos(false);
      }
    }
    carregarDados();
  }, [usuario, authLoading]); // 4. O useEffect agora depende do 'authLoading'

  const toggleFavorito = async (produtoId) => {
    if (!usuario || !usuario.id) {
      toast.warn("Você precisa estar logado para favoritar itens.");
      navigate('/login');
      return;
    }
    const estaFavoritado = favoritos.has(produtoId);
    try {
      if (estaFavoritado) {
        await favoritoService.deletarFavorito(usuario.id, produtoId);
        setFavoritos(prev => {
          const novoSet = new Set(prev);
          novoSet.delete(produtoId);
          return novoSet;
        });
      } else {
        const payload = {
          pessoaId: usuario.id,
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

  // 5. O estado de loading da página agora depende dos dois loadings
  if (authLoading || loadingProdutos) {
    return (
      <div className="container py-5 text-center">
        <h5 className="text-muted">A carregar produtos...</h5>
      </div>
    );
  }

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
                  <div className="d-flex justify-content-between align-items-center mt-auto">
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
    </div>
  );
}

export default Produtos;