import React, { useState } from 'react';
import api from '../../../helpers/api';
import { Navigate } from 'react-router-dom';

const User = () => {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');

  React.useEffect(() => {
    if (token) {
      api
        .get('/users/checkuser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, [token]);

  return (
    <div>
      {' '}
      <h1 className="title">Seja bem vinda {user.name}</h1>
    </div>
  );
};

export default User;
