import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/ContextCart'; // 1. Importe o hook useCart
import produtos from '../../mocks/produtos';

import './ItemDetalhe.css';

const usuarioLogado = true; 

function ItemDetalhe() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCart();

  const item = produtos.find((produto) => produto.id.toString() === itemId);

  const handleAddToCart = () => {
    if (usuarioLogado) {
      // 3. Use a função do contexto para adicionar o item
      adicionarAoCarrinho(item); 
      // O alerta já é mostrado pela função do contexto, então não precisamos de outro aqui.
      navigate('/carrinho');
    } else {
      alert('Você precisa estar logado para realizar esta ação. Redirecionando...');
      navigate('/login');
    }
  };

  if (!item) {
    return <div className="container my-5"><h2>Item não encontrado!</h2></div>;
  }

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <div className="row g-5">
          {/* Coluna da Imagem */}
          <div className="col-lg-5">
            <img src={item.imagem} alt={item.nome} className="img-fluid rounded" />
          </div>

          {/* Coluna das Informações */}
          <div className="col-lg-7 d-flex flex-column">
            <span className="badge bg-success align-self-start mb-2">{item.categoria}</span>
            <h1 className="item-nome mb-3">{item.nome}</h1>

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
                <p>{item.localizacao}</p>
              </div>
            </div>

            <div className="mb-4">
              <h5>Anunciante por:</h5>
              <p>{item.produtor.nome} (Nota: {item.produtor.nota} ⭐)</p>
            </div>

            {/* O botão agora chama a função que usa o contexto */}
            <button className="btn btn-lg btn-success mt-auto" onClick={handleAddToCart}>
              Tenho Interesse / Fazer Troca
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetalhe;