import React from 'react';
import { Link } from 'react-router-dom';

const CarrinhoItem = ({ item, onDecrease, onIncrease, onRemove }) => {
  return (
    <div className="carrinho-item">
      <div className="carrinho-item-info">
        <Link to={`/item/${item.id}`}>
          <img
            src={item.imagemUrl || 'https://placehold.co/80x80'}
            alt={item.nomeProduto}
            className="carrinho-item-img"
          />
        </Link>
        <div className="carrinho-item-detalhes">
          <Link to={`/item/${item.id}`} className="carrinho-item-link">
            <h5 className="item-nome">{item.nomeProduto}</h5>
          </Link>
          <small className="item-doador">
            Doador: {item.pessoa?.nome || 'Anónimo'}
          </small>
        </div>
      </div>

      <div className="carrinho-item-acoes">
        <div className="quantity-controls">
          <button onClick={() => onDecrease(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrease(item.id, item.quantity + 1)}>+</button>
        </div>
        <button className="btn-remover" onClick={() => onRemove(item.id)}>
          Remover
        </button>
      </div>
    </div>
  );
};

export default CarrinhoItem;
