// Em: src/context/ContextCart.jsx

import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify'; // 1. Importe a função toast

const ContextCart = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const adicionarAoCarrinho = (item) => {
    setCartItems((prevItems) => {
      const itemExistente = prevItems.find(cartItem => cartItem.id === item.id);

      if (itemExistente) {
        // 2. Substitua o alert por uma notificação de informação
        toast.info(`Mais um "${item.nome}" foi adicionado ao carrinho!`);
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // 3. Substitua o alert por uma notificação de sucesso
        toast.success(`"${item.nome}" foi adicionado ao seu carrinho!`);
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removerDoCarrinho = (itemId) => {
    setCartItems((prevItems) => {
      const itemRemovido = prevItems.find(item => item.id === itemId);
      if (itemRemovido) {
        // 4. (Opcional) Adicione uma notificação de erro/aviso ao remover
        toast.error(`"${itemRemovido.nome}" foi removido do carrinho.`);
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  const atualizarQuantidade = (itemId, novaQuantidade) => {
    setCartItems((prevItems) => {
      if (novaQuantidade <= 0) {
        return prevItems.filter(item => item.id !== itemId);
      }
      return prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: novaQuantidade } : item
      );
    });
  };

  const value = {
    cartItems,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidade,
  };

  return (
    <ContextCart.Provider value={value}>
      {children}
    </ContextCart.Provider>
  );
}

export function useCart() {
  return useContext(ContextCart);
}
