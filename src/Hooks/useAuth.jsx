import React, { useEffect } from 'react';
import api from '../helpers/api';
import { useLocation, useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = React.useState(true);
  const location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    const token = window.localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      return;
    } else {
      setAuthenticated(false);
      return;
    }
  }, [location]);

  function logout() {
    setAuthenticated(false);
    window.localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;

    navigate('/dashboard/login');
  }

  async function authUser(data) {
    setAuthenticated(true);

    localStorage.setItem('token', data.token);

    navigate('/dashboard');
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
