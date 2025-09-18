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
      try {
        const { usuario: dadosDoUsuario } = await authServices.verificarToken();

        setUsuario(dadosDoUsuario);
        setIsAuthenticated(true);

      } catch (error) {

        setIsAuthenticated(false);
        setUsuario(null);
      } finally {
        setLoading(false);
      }
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

  if (loading) {
    return <div>A verificar sessão...</div>;
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);