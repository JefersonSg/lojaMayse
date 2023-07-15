import React from 'react';
import { useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import useMedia from './Hooks/useMedia';
import { ReactComponent as Logo } from './assets/svg/svgHeader/logoWhite.svg';
import { ReactComponent as Bag } from './assets/svg/svgHeader/bag.svg';
import { ReactComponent as LogoMobile2 } from './assets/svg/svgHeader/logo2.svg';
import useFetch from './Hooks/useFetch';
import api from './helpers/api';

const Header = () => {
  const [categorias, setCategorias] = React.useState('');
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const { data, error, loading, request } = useFetch();

  const mobile = useMedia('(max-width: 64rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [changeHeader, setChangeHeader] = React.useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

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

  React.useEffect(() => {
    function infiniteScroll() {
      const scroll = window.scrollY;
      const heigth = document.body.offsetHeight - window.innerHeight;
      setChangeHeader(false);

      if (pathname === '/' && scroll) {
        setChangeHeader(true);
      } else if (pathname === '/' && !scroll) {
        setChangeHeader(false);
      } else {
        setChangeHeader(true);
      }
    }
    infiniteScroll();

    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [changeHeader, pathname]);
  function handleOutsideClick({ target, currentTarget }) {
    if (target === currentTarget) {
      setMobileMenu(false);
    }
  }
  React.useEffect(() => {
    return setMobileMenu(false);
  }, [pathname]);

  return (
    <header
      className={`${mobile ? styles.headerMobile : styles.header}
    ${changeHeader && styles.header2}`}
    >
      {!changeHeader && (
        <NavLink to="/" end className={styles.logo}>
          <Logo />
        </NavLink>
      )}
      {changeHeader && !mobile && (
        <NavLink to="/" end className={`${styles.logoHeader2}`}>
          <LogoMobile2 />
        </NavLink>
      )}

      {mobile && (
        <button
          className={`${styles.mobileButton} ${
            mobileMenu ? styles.mobileButtonActive : ''
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <div
        className={`${mobileMenu ? styles.navContainer : ''}`}
        onClick={handleOutsideClick}
      ></div>
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} 
        ${mobileMenu ? styles.navMobileActive : ''}
        ${mobileMenu ? 'animeLeft' : ''}`}
      >
        {categorias &&
          categorias.map((categoria) => (
            <NavLink
              className={styles.links}
              to={`/produto/categorias/${categoria._id}`}
              key={categoria._id}
            >
              {categoria.Category.toUpperCase()}
            </NavLink>
          ))}
      </nav>

      {changeHeader && mobile && (
        <div className={`${styles.logo2} ${styles.mobileLogo}`}>
          <LogoMobile2 />
        </div>
      )}
      {changeHeader && (
        <div className={`${styles.bag}`}>
          <Bag />
        </div>
      )}
    </header>
  );
};

export default Header;
