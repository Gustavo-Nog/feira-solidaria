import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({
    id: 5,
    nomeUsuario: 'bruno_receptor',
    email: 'bruno.receptor@email.com',
    pessoaId: 5
  });

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);