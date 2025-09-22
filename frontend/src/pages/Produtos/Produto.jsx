import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import produtoServices from '../../services/produtoServices';
import favoritoService from '../../services/favoritoServices';
import categoriaServices from '../../services/categoriaServices';
import { toast } from 'react-toastify';
import Button from '../../components/Button/Button';
import './Produto.css';

function Produtos() {
  const navigate = useNavigate();
  const { usuario, loading: authLoading } = useUser();

  const [produtos, setProdutos] = useState([]);
  const [favoritos, setFavoritos] = useState(new Set());
  const [categorias, setCategorias] = useState([]);

  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMais, setLoadingMais] = useState(false);

  const [busca, setBusca] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [qualidade, setQualidade] = useState('');

  useEffect(() => {
    const buscarProdutosFiltrados = async () => {
      if (authLoading) return;
      setLoading(true);
      try {
        const filtros = { busca, categoriaId, qualidade };
        const [dadosProdutos, listaFavoritos, listaCategorias] = await Promise.all([
          produtoServices.listarProdutos(1, filtros),
          usuario ? favoritoService.listarFavoritos(usuario.id) : Promise.resolve([]),
          categoriaServices.listarCategorias()
        ]);
        
        setProdutos(dadosProdutos.produtos);
        setPagina(1);
        setTotalPaginas(dadosProdutos.totalPaginas);
        setCategorias(listaCategorias);

        if (listaFavoritos) {
          setFavoritos(new Set(listaFavoritos.map(fav => fav.produtoId)));
        }
      } catch (err) {
        console.error('Erro ao carregar dados:', err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
        buscarProdutosFiltrados();
    }, 500);

    return () => clearTimeout(debounce);

  }, [usuario, authLoading, busca, categoriaId, qualidade]);


  const handleCarregarMais = async () => {
    const proximaPagina = pagina + 1;
    setLoadingMais(true);
    try {
      const filtros = { busca, categoriaId, qualidade };
      const novosDados = await produtoServices.listarProdutos(proximaPagina, filtros);
      setProdutos(prevProdutos => [...prevProdutos, ...novosDados.produtos]);
      setPagina(proximaPagina);
    } catch (err) {
      console.error('Erro ao carregar mais produtos:', err.message);
    } finally {
      setLoadingMais(false);
    }
  };

  const temMaisParaCarregar = pagina < totalPaginas;

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
        const payload = { pessoaId: usuario.id, produtoId: produtoId };
        await favoritoService.criarFavorito(payload);
        setFavoritos(prev => new Set(prev).add(produtoId));
      }
    } catch (error) {
      console.error("Erro ao favoritar produto:", error.message);
    }
  };
  
  const verDetalhes = (id) => navigate(`/item/${id}`);

  if (loading) {
    return <div className="container py-5 text-center"><h5 className="text-muted">A carregar produtos...</h5></div>;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-uppercase">Produtos</h2>
      <form className="row mb-4">
        <div className="col-md-6 mb-3">
          <label htmlFor="busca" className="form-label">Buscar por nome</label>
          <input
            id="busca" type="text" className="form-control"
            placeholder="Digite o nome do produto"
            value={busca} onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="categoria" className="form-label">Filtrar por categoria</label>
          <select
            id="categoria" className="form-select"
            value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nomeCategoria}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="qualidade" className="form-label">Filtrar por qualidade</label>
          <select
            id="qualidade" className="form-select"
            value={qualidade} onChange={(e) => setQualidade(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="NOVO">Novo</option>
            <option value="SEMINOVO">Seminovo</option>
            <option value="USADO">Usado</option>
          </select>
        </div>
      </form>
      
      <div className="row g-4">
        {produtos.length === 0 ? (
          <div className="text-center mt-5">
            <h5 className="text-muted">Nenhum item encontrado com estes filtros.</h5>
          </div>
        ) : (
          produtos.map((produto) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={produto.id}>
              <div className="card h-100 shadow-sm position-relative">
                {usuario && (
                  <button
                    className={`btn-favorito ${favoritos.has(produto.id) ? 'ativo' : ''}`}
                    onClick={() => toggleFavorito(produto.id)}
                    title={favoritos.has(produto.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    {favoritos.has(produto.id) ? '★' : '☆'}
                  </button>
                )}
                <img
                  src={produto.imagemUrl ? `${import.meta.env.VITE_API_URL}${produto.imagemUrl}` : 'https://placehold.co/400x300'}
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

      {temMaisParaCarregar && (
        <div className="text-center mt-5">
          <Button onClick={handleCarregarMais} disabled={loadingMais}>
            {loadingMais ? 'A carregar...' : 'Carregar Mais Produtos'}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Produtos;