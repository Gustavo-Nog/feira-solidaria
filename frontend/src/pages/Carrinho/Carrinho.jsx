import React from 'react';
import { useCart } from '../../context/ContextCart';
import { useUser } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import doacaoServices from '../../services/doacaoServices';
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

  const totalItens = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="carrinho-fundo">
      <div className="carrinho-container">
        <div className="carrinho-coluna-principal">
          <h2 className="carrinho-titulo">Meu Carrinho</h2>
          <div className="carrinho-lista">
            {cartItems.map((item) => (
              <div key={item.id} className="carrinho-item">
                <div className="carrinho-item-info">
                  <Link to={`/item/${item.id}`}>
                    <img src={item.imagemUrl || 'https://placehold.co/80x80'} alt={item.nomeProduto} className="carrinho-item-img" />
                  </Link>
                  <div className="carrinho-item-detalhes">
                    <Link to={`/item/${item.id}`} className="carrinho-item-link">
                      <h5 className="item-nome">{item.nomeProduto}</h5>
                    </Link>
                    <small className="item-doador">Doador: {item.pessoa?.nome || 'Anónimo'}</small>
                  </div>
                </div>

                <div className="carrinho-item-acoes">
                  <div className="quantity-controls">
                    <button onClick={() => handleDiminuir(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleAumentar(item)}>+</button>
                  </div>
                  <button className="btn-remover" onClick={() => removerDoCarrinho(item.id)}>
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carrinho-coluna-sumario">
          <div className="carrinho-sumario">
            <h3>Resumo da Troca</h3>
            <div className="sumario-linha">
              <span>Total de Itens</span>
              <span>{totalItens}</span>
            </div>
            <hr />
            <button className="btn-finalizar" onClick={handleFinalizarTroca}>
              Finalizar Doação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;