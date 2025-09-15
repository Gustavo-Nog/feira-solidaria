import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/ContextCart';
import produtoServices from '../../services/produtoService';

import './ItemDetalhe.css';

function ItemDetalhe() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCart();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarItem = async () => {
      const idNumerico = parseInt(itemId, 10);
      if (isNaN(idNumerico)) {
        setLoading(false);
        return;
      }
      
      try {
        const dadosDoItem = await produtoServices.buscarProduto(idNumerico);
        console.log("Dados recebidos da API:", dadosDoItem);
        setItem(dadosDoItem);
      } catch (error) {
        console.error("Erro ao buscar detalhes do item:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarItem();
  }, [itemId]);

  const handleAddToCart = () => {
    if (item) {
      adicionarAoCarrinho(item);
      navigate('/carrinho');
    }
  };

  if (loading) {
    return <div className="container my-5"><h2>A carregar item...</h2></div>;
  }

  if (!item) {
    return <div className="container my-5"><h2>Item não encontrado!</h2></div>;
  }

  const primeiroEndereco = item.pessoa?.enderecos?.[0]?.endereco;
  const localizacao = primeiroEndereco 
    ? `${primeiroEndereco.cidade} - ${primeiroEndereco.uf}` 
    : 'Não informada';

  const primeiroTelefone = item.pessoa?.telefones?.[0];
  const telefone = primeiroTelefone 
    ? primeiroTelefone.numero 
    : 'Não informado';

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <div className="row g-5">
          <div className="col-lg-5">
            <img 
              src={item.imagemUrl || 'https://placehold.co/600x400'} 
              alt={item.nomeProduto} 
              className="img-fluid rounded" 
            />
          </div>

          <div className="col-lg-7 d-flex flex-column">
            <span className="badge bg-success align-self-start mb-2">
              {item.categoria?.nomeCategoria || 'Sem Categoria'}
            </span>
            <h1 className="item-nome mb-3">{item.nomeProduto}</h1>

            <div className="mb-4">
              <h5>Descrição</h5>
              <p className="text-muted">{item.descricao}</p>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <h5>Qualidade</h5>
                <p className="fw-bold">{item.qualidade}</p>
              </div>
              
              <div className="col-md-6">
                <h5>Localização</h5>
                <p>{localizacao}</p>
              </div>
            </div>

            <div className="mb-4">
              <h5>Anunciado por:</h5>
              <p className="mb-1">{item.pessoa?.nome || 'Doador anónimo'} (Nota: 5 ⭐)</p>

              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Contato: {telefone}</p>
            </div>

            <button className="btn btn-lg btn-success mt-auto" onClick={handleAddToCart}>
              Tenho Interesse / Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetalhe;