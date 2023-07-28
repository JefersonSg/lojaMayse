import React from 'react';
import { Context } from '../context/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { authenticated } = React.useContext(Context);
  const { pathname } = useLocation();

  if (authenticated === true && pathname === '/dashboard/login') {
    return <Navigate to="/dashboard" />;
  }
  if (authenticated === false && pathname === '/dashboard/login') {
    return children;
  }

  if (authenticated === true) {
    return children;
  } else if (authenticated === false) {
    return <Navigate to="/dashboard/login" />;
  }
};

export default ProtectedRoute;
