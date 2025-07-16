// src/context/CartContext.js

import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const adicionarAoCarrinho = (item) => {
    // Verifica se o item já existe no carrinho para não duplicar
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find(cartItem => cartItem.id === item.id);
      if (isItemInCart) {
        // Se já existe, não faz nada (ou poderia aumentar a quantidade)
        alert(`"${item.nome}" já está no seu carrinho.`);
        return prevItems;
      }
      // Se não existe, adiciona o novo item à lista
      alert(`"${item.nome}" foi adicionado ao seu carrinho!`);
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removerDoCarrinho = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  const value = {
    cartItems,
    adicionarAoCarrinho,
    removerDoCarrinho,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook customizado para facilitar o uso
export function useCart() {
  return useContext(CartContext);
}