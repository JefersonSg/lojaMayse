import React from 'react';
import { Context } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { authenticated } = React.useContext(Context);

  if (authenticated === true) {
    return children;
  } else if (authenticated === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default ProtectedRoute;
