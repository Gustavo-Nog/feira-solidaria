// src/pages/Carrinho/Carrinho.jsx

import React from 'react';
import { useCart } from '../../context/ContextCart';
import { Link } from 'react-router-dom';
import './Carrinho.css';

function Carrinho() {
  const { cartItems, removerDoCarrinho } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container text-center my-5">
        <h2>Seu carrinho está vazio.</h2>
        <p>Explore nossos produtos e encontre algo que te interesse!</p>
        <Link to="/" className="btn btn-success">Voltar para o Início</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Meu Carrinho</h2>
      <ul className="list-group shadow-sm">
        {cartItems.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src={item.imagem} alt={item.nome} className="carrinho-item-img" />
              <div className="ms-3">
                <h5 className="mb-0">{item.nome}</h5>
                <small className="text-muted">{item.produtor.nome}</small>
              </div>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => removerDoCarrinho(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div className="text-end mt-4">
        <button className="btn btn-lg btn-success">Finalizar Troca</button>
      </div>
    </div>
  );
}

export default Carrinho;