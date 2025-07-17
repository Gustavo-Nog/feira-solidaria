import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/ContextCart'; // Importa o hook do carrinho
import produtos from '../../mocks/produtos';

import './ItemDetalhe.css';

function ItemDetalhe() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCart();

  const item = produtos.find((produto) => produto.id.toString() === itemId);

  const handleAddToCart = () => {
    adicionarAoCarrinho(item);
    navigate('/carrinho');
  };

  if (!item) {
    return <div className="container my-5"><h2>Item não encontrado!</h2></div>;
  }

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <div className="row g-5">
          <div className="col-lg-5">
            <img src={item.imagem} alt={item.nome} className="img-fluid rounded" />
          </div>

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