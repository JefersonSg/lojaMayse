import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import api from '../../helpers/api';
import styles from './BreadCrumbs.module.css';

const PageAtual = ({ categoriaAtual, nomeProduto }) => {
  const location = useLocation();
  const { data, loading, error, request } = useFetch();
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const { pathname } = location;
  const params = useParams();
  const [categoria, setCategoria] = React.useState(null);

  React.useEffect(() => {
    async function getCategory() {
      const id = categoriaAtual;

      if (id !== 'lançamentos') {
        const response = await request(`${api.getUri()}categorys/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategoria(response.json);
      }
    }
    getCategory();
  }, [request, token, categoriaAtual]);

  return (
    <div className={styles.breadcrumbs}>
      <nav>
        <ul>
          <li>
            <NavLink to={'/'}>Página Inicial</NavLink> |{' '}
          </li>
          {categoriaAtual === 'lançamentos' && (
            <li className={styles.active}>Lançamentos</li>
          )}
          {categoria && (
            <li className={`${nomeProduto ? '' : styles.active}`}>
              {nomeProduto ? (
                <NavLink to={`/produtos/categoria/${categoria.category._id}`}>
                  {categoria.category.Category}
                </NavLink>
              ) : (
                categoria.category.Category
              )}
            </li>
          )}
          {nomeProduto && <li className={styles.active}>| {nomeProduto}</li>}
        </ul>
      </nav>
    </div>
  );
};

export default PageAtual;
