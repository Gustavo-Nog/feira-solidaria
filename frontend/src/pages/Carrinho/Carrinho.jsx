// Em: src/pages/Carrinho/Carrinho.jsx

import React from 'react';
import { useCart } from '../../context/ContextCart';
// import { useAuth } from '../../context/AuthContext'; // 1. Import do AuthContext removido
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Carrinho.css';

// 2. Adicionada a verificação simulada com uma variável
const usuarioLogado = true; // Mude para 'false' para testar o comportamento de deslogado

function Carrinho() {
  const { cartItems, removerDoCarrinho } = useCart();
  // const { isAutenticado } = useAuth(); // 3. Linha do AuthContext removida
  const navigate = useNavigate();

  const handleFinalizarTroca = () => {
    // 4. A verificação agora usa a variável 'usuarioLogado'
    if (usuarioLogado) {
      toast.success('Sucesso! Próximo passo: confirmação da troca.');
      // Futuramente, você pode navegar para uma página de checkout
      // navigate('/checkout');
    } else {
      toast.warn('Você precisa fazer o login para finalizar a troca.');
      navigate('/login');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container text-center my-5">
        <h2>Seu carrinho está vazio.</h2>
        <p>Explore nossos produtos e encontre algo que te interesse!</p>
        <Link to="/produtos" className="btn btn-success">Ver Produtos</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Meu Carrinho</h2>
      <ul className="list-group shadow-sm">
        {cartItems.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <Link to={`/item/${item.id}`} className="carrinho-item-link d-flex align-items-center">
              <img src={item.imagem} alt={item.nome} className="carrinho-item-img" />
              <div className="ms-3">
                <h5 className="mb-0">{item.nome}</h5>
                <small className="text-muted">{item.produtor.nome}</small>
              </div>
            </Link>
            <div className="d-flex align-items-center mt-2 mt-md-0">
              {/* Controles de quantidade aqui, se implementados */}
              <button className="btn btn-danger btn-sm ms-4" onClick={() => removerDoCarrinho(item.id)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-end mt-4">
        <button className="btn btn-lg btn-success" onClick={handleFinalizarTroca}>
          Finalizar Troca
        </button>
      </div>
    </div>
  );
}

export default Carrinho;
