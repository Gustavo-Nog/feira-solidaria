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
         console.log('[UserContext] A iniciar verificação de sessão...');
        const { usuario: dadosDoUsuario } = await authServices.verificarToken();

        console.log('[UserContext] SESSÃO VÁLIDA. Utilizador definido:', dadosDoUsuario);
        setUsuario(dadosDoUsuario);
        setIsAuthenticated(true);

      } catch (error) {

        console.error("Nenhuma sessão ativa encontrada ou token inválido:", error.message);
        setIsAuthenticated(false);
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    }
    
    carregarSessao();
  }, []);

  const login = (dadosDaResposta) => {
    console.log('[UserContext] Função LOGIN chamada com:', dadosDaResposta);
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