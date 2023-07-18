import React from 'react';
import useAuth from '../Hooks/useAuth';

const Context = React.createContext();

function UserProvider({ children }) {
  const { authenticated, register, logout, login } = useAuth();
  return (
    <Context.Provider value={{ register, authenticated, logout, login }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
