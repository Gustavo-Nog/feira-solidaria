import React from 'react';
import { useCart } from '../../context/ContextCart';
import { useUser } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import doacaoServices from '../../services/doacaoService';

import './Carrinho.css';

function Carrinho() {
  const { cartItems, removerDoCarrinho, atualizarQuantidade, limparCarrinho } = useCart();
  const { usuario } = useUser();
  const navigate = useNavigate();

  const handleFinalizarTroca = async () => {
    if (!usuario || !usuario.pessoaId) {
      toast.warn('Você precisa fazer o login para finalizar a doação.');
      navigate('/login');
      return;
    }

    try {
      const promessasDeDoacao = cartItems.map(item => {
        const payload = {
          receptorId: usuario.pessoaId,
          produtoId: item.id,
        };
        return doacaoServices.solicitarDoacao(payload);
      });

      await Promise.all(promessasDeDoacao);

      toast.success('Solicitações de troca enviadas com sucesso!');
      limparCarrinho();
      navigate('/perfil');

    } catch (error) {
      console.error("Erro ao finalizar a troca:", error);
      toast.error('Ocorreu um erro ao enviar as solicitações. Tente novamente.');
    }
  };

  const handleDiminuir = (item) => {
    atualizarQuantidade(item.id, item.quantity - 1);
  };

  const handleAumentar = (item) => {
    atualizarQuantidade(item.id, item.quantity + 1);
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
          <li
            key={item.id}
            className="list-group-item d-flex flex-column align-items-start d-md-flex flex-md-row align-items-md-center justify-content-md-between p-3"
          >
            <Link to={`/item/${item.id}`} className="carrinho-item-link d-flex align-items-center mb-3 mb-md-0">
              <img src={item.imagem} alt={item.nome} className="carrinho-item-img" />
              <div className="ms-3">
                <h5 className="mb-0">{item.nome}</h5>
                <small className="text-muted">{item.produtor?.nome || 'Doador'}</small>
              </div>
            </Link>

            <div className="d-flex align-items-center mt-3 mt-md-0 w-100 w-md-auto justify-content-between justify-content-md-end">
              <div className="quantity-controls">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleDiminuir(item)}>-</button>
                <span className="quantity-text">{item.quantity}</span>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleAumentar(item)}>+</button>
              </div>
              <button className="btn btn-danger btn-sm ms-auto ms-md-4" onClick={() => removerDoCarrinho(item.id)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-end mt-4">
        <button className="btn btn-lg btn-success" onClick={handleFinalizarTroca}>
          Finalizar Doação
        </button>
      </div>
    </div>
  );
}

export default Carrinho;