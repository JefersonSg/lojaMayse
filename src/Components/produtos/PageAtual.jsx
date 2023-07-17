import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import api from '../../helpers/api';

const PageAtual = ({ categoriaAtual }) => {
  const location = useLocation();
  const { data, loading, error, request } = useFetch();
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const { pathname } = location;
  const params = useParams();
  const [categoria, setCategoria] = React.useState(null);

  const page = pathname.split('/');
  console.log(page.length);

  React.useEffect(() => {
    async function getCategory() {
      const id = categoriaAtual;
      const response = await request(`${api.getUri()}categorys/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategoria(response.json);
    }
    getCategory();
  }, [request, token, categoriaAtual]);

  return (
    <div>
      <NavLink to={'/'}>Página Inicial</NavLink> |{' '}
      {categoria && categoria.category.Category}
    </div>
  );
};

export default PageAtual;
