import React, { createContext, useState, useContext, useEffect } from 'react';
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
        console.error("Nenhuma sessão ativa encontrada ou token inválido:", error.message);
      } finally {
        setLoading(false);
      }
    } 
    carregarSessao();
  }, []);

  const login = (dadosDaResposta) => {
    setUsuario(dadosDaResposta.usuario);
    setIsAuthenticated(true);
  };
  
  const logout = async () => {
    try {
      await authServices.logout();
    } catch (error) {
      console.error("Erro ao tentar fazer logout:", error.message);
    } finally {
      setUsuario(null);
      setIsAuthenticated(false);
    }
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