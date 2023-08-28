import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import useMedia from '../../../Hooks/useMedia';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const mobile = useMedia('(max-width: 64rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [changeHeader, setChangeHeader] = React.useState(true);
  const [singleProduct, setSingleProduct] = React.useState(false);
  const navigate = useNavigate();

  function handleOutsideClick({ target, currentTarget }) {
    if (target === currentTarget) {
      setMobileMenu(false);
    }
  }
  const { pathname } = useLocation();
  React.useEffect(() => {
    return setMobileMenu(false);
  }, [pathname]);

  React.useEffect(() => {
    const link = pathname.split('/');

    if (link.length === 4 && link[2] === 'produtos') {
      setSingleProduct(true);
    } else {
      setSingleProduct(false);
    }
  }, [pathname]);

  return (
    <>
      <header
        className={`${styles.headerMobile}
    ${styles.header2}`}
      >
        <button
          className={`${styles.mobileButton} ${
            mobileMenu ? styles.mobileButtonActive : ''
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
        {singleProduct && (
          <NavLink to={pathname.replace('/dashboard', '')}>
            <h3>Ver na Loja</h3>
          </NavLink>
        )}
        <div
          className={`${mobileMenu ? styles.navContainer : ''}`}
          onClick={handleOutsideClick}
        ></div>
        <nav
          className={`${styles.navMobile} 
        ${mobileMenu ? styles.navMobileActive : ''}
        ${mobileMenu ? 'animeLeft' : ''}`}
        >
          <ul>
            <li className={styles.links} onClick={() => navigate('/dashboard')}>
              PAGINA INICIAL
            </li>
            <li
              className={styles.links}
              onClick={() => navigate('/dashboard/categorias')}
            >
              CATEGORIAS
            </li>
            <li
              className={styles.links}
              onClick={() => navigate('/dashboard/criar')}
            >
              CRIAR PRODUTO
            </li>
            <li className={styles.links}>CONFIGURACOES</li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
