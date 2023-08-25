import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import useMedia from '../../Hooks/useMedia';

import useFetch from '../../Hooks/useFetch';
import api from '../../helpers/api';
import Bag from './Bag/Bag';
import Logo from './Logo/Logo';
import Favoritos from './Favoritos/Favoritos';
import ButtonMobile from './ButtonMobile/ButtonMobile';

const Header = () => {
  const [categorias, setCategorias] = React.useState('');
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const { data, error, loading, request } = useFetch();

  const [moveLeft, setMoveLeft] = React.useState(false);

  const mobile = useMedia('(max-width: 64rem)');

  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();

  // Get Categories
  React.useEffect(() => {
    async function getCategory() {
      const response = await request(`${api.getUri()}categorys/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorias(response.json.categorys);
    }
    getCategory();
  }, [request, token]);

  function handleOutsideClick({ target, currentTarget }) {
    if (target === currentTarget) {
      setMobileMenu(false);
      setMoveLeft(true);
    }
  }
  React.useEffect(() => {
    return setMobileMenu(false);
  }, [pathname]);

  React.useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenu]);

  const urlPath = pathname.split('/');

  return (
    <header
      className={`${styles.header}
      ${pathname === '/' ? styles.styleHome : styles.noHome}
      ${urlPath[2] && urlPath[2].length > 21 ? styles.productSingle : ''}
      ${mobile ? styles.headerMobile : ''}
      `}
    >
      <>
        <nav className={`${styles.nav} ${mobile ? styles.mobile : ''}`}>
          {mobile && (
            <ButtonMobile
              mobileMenu={mobileMenu}
              setMobileMenu={setMobileMenu}
              setMoveLeft={setMoveLeft}
            />
          )}
          <div className={styles.objetos}>
            <Logo />
            <div className={styles.outros}>
              <Favoritos />
              <Bag />
            </div>
          </div>

          <ul
            className={`${mobile ? styles.navMobile : styles.navComputer} ${
              mobileMenu ? styles.active : ''
            }
          ${mobileMenu ? 'animeLeft' : ''}
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
        </nav>
        {mobile && (
          <div
            className={`${
              mobileMenu ? styles.navContainer : styles.off
            }       ${
              urlPath[2] && urlPath[2].length > 21 ? styles.productSingle : ''
            }`}
            onClick={handleOutsideClick}
          ></div>
        )}
      </>
    </header>
  );
};

export default Header;
