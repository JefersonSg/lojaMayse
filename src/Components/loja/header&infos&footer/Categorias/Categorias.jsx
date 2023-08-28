import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Categorias.module.css';

// Hooks
import useFetch from '../../../../Hooks/useFetch';
import api from '../../../../helpers/api';

const Categorias = ({ mobile, mobileMenu, moveLeft }) => {
  const [categorias, setCategorias] = React.useState(
    localStorage.getItem('categorias')
      ? JSON.parse(localStorage.getItem('categorias'))
      : '',
  );
  const { data, error, loading, request } = useFetch();
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const { pathname } = useLocation();

  const checkCategories = React.useCallback(
    (response) => {
      for (let i = 0; i < response.json.categorys.length; i++) {
        const element = response.json.categorys[i].Category;
        if (categorias[i]) {
          if (element === categorias[i].Category) {
            return;
          }
          setCategorias(response.json.categorys);
          localStorage.setItem(
            'categorias',
            JSON.stringify(response.json.categorys),
          );
          return;
        } else {
          setCategorias(response.json.categorys);
          localStorage.setItem(
            'categorias',
            JSON.stringify(response.json.categorys),
          );
        }
      }
    },
    [categorias],
  );
  // Get Categories
  React.useEffect(() => {
    async function getCategory() {
      const response = await request(`${api.getUri()}categorys/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.json.categorys) {
        checkCategories(response);
      }
    }
    getCategory();
  }, [request, token, checkCategories]);
  return (
    <ul
      className={`${mobile ? styles.navMobile : styles.navComputer} ${
        mobileMenu ? styles.active : ''
      }
  ${mobileMenu ? 'animeLeft' : ''}
  ${pathname === '/' ? styles.styleHome : ''}
  ${moveLeft ? styles.animeLeftBack : ''}`}
    >
      <li>
        {' '}
        <NavLink className={styles.links} to={`/produtos/lancamentos`}>
          LANÇAMENTOS
        </NavLink>
      </li>
      {categorias &&
        categorias.map((categoria) => (
          <li key={categoria._id}>
            <NavLink
              className={styles.links}
              to={`/produtos/categoria/${categoria._id}`}
              key={categoria._id}
            >
              {categoria.Category.toUpperCase()}
            </NavLink>
          </li>
        ))}
    </ul>
  );
};

export default Categorias;
