import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({
    nome: 'Nome do Usuário',
    email: 'usuario@email.com',
    foto: 'https://ppgquimica.propg.ufabc.edu.br/wp-content/uploads/2016/05/sem-imagem-avatar.png',
  });

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
