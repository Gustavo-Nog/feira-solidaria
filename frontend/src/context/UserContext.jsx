import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import authServices from '../services/authServices';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarSessao() {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {

          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          const { usuario: dadosDoUsuario } = await authServices.verificarToken();

          setUsuario(dadosDoUsuario);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Sessão inválida, limpando token:", error);
          localStorage.removeItem('accessToken');
        }
      }
      setLoading(false);
    }
    
    carregarSessao();
  }, []);

  const login = (dadosDaResposta) => {
    localStorage.setItem('accessToken', dadosDaResposta.tokenDeAcesso);
    api.defaults.headers.common['Authorization'] = `Bearer ${dadosDaResposta.tokenDeAcesso}`;
    setUsuario(dadosDaResposta.usuario);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem('accessToken');
    delete api.defaults.headers.common['Authorization'];
    setUsuario(null);
    setIsAuthenticated(false);
  };

  const value = { usuario, isAuthenticated, login, logout, loading };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);