import React, { useEffect } from 'react';
import api from '../helpers/api';
import { useLocation, useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = React.useState(true);
  const location = useLocation();
  const [token, setToken] = React.useState(
    window.localStorage.getItem('token') || false,
  );

  useEffect(() => {
    const { pathname } = location;

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      return;
    }

    setAuthenticated(false);
    return;
  }, [location, token]);

  function logout() {
    setAuthenticated(false);
    window.localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;

    navigate('/dashboard/login');
    window.location.reload();
  }

  async function authUser(data) {
    setAuthenticated(true);

    localStorage.setItem('token', data.token);

    window.location.reload();
  }

  async function login(user) {
    try {
      const data = await api.post('/users/login', user).then((response) => {
        return response.data;
      });
      await authUser(data);
    } catch (error) {
      console.log(error);
    }
  }
  return { authenticated, logout, login };
};
export default useAuth;
