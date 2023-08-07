import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import useMedia from './Hooks/useMedia';
import { ReactComponent as Logo } from './assets/svg/svgHeader/logoWhite.svg';
import { ReactComponent as Bag } from './assets/svg/svgHeader/bag.svg';
import { ReactComponent as BagWhite } from './assets/svg/svgHeader/bagWhite.svg';
import { ReactComponent as LogoBlack } from './assets/svg/svgHeader/logo2.svg';
import useFetch from './Hooks/useFetch';
import api from './helpers/api';

const Header = () => {
  const [categorias, setCategorias] = React.useState('');
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const { data, error, loading, request } = useFetch();

  const [moveLeft, setMoveLeft] = React.useState(false);

  const mobile = useMedia('(max-width: 64rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const itensBag = React.useState(
    JSON.parse(localStorage.getItem('bag')) || false,
  );

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

  // Scrolls
  // React.useEffect(() => {
  //   function infiniteScroll() {
  //     const scroll = Math.floor(window.scrollY);
  //     const heigth = document.body.offsetHeight - window.innerHeight;
  //     const scrollagem = scroll < heigth * 0.5;
  //     // HOME
  //     setScroll1(false);

  //     //Home Computer

  //     if (!scroll) {
  //       setScroll1(false);
  //     } else {
  //       setScroll1(true);
  //     }
  //   }
  //   infiniteScroll();

  //   window.addEventListener('scroll', infiniteScroll);
  //   return () => {
  //     window.removeEventListener('scroll', infiniteScroll);
  //   };
  // }, [pathname]);

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
          {/* HOME PAGE SEM SCROLL */}
          {mobile && (
            <button
              className={`${styles.mobileButton} ${
                pathname === '/' && styles.buttonWhite
              } ${mobileMenu ? styles.mobileButtonActive : ''}`}
              onClick={() => {
                setMobileMenu(!mobileMenu);
                setMoveLeft(mobileMenu);
              }}
            ></button>
          )}
          <div className={styles.logo}>
            <NavLink to="/" end>
              {pathname === '/' ? <Logo /> : <LogoBlack />}
            </NavLink>
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

          <NavLink to={'/checkout'} className={`${styles.bag}`}>
            {itensBag[0] ? (
              <span className={styles.itensBag}>{itensBag[0].length}</span>
            ) : (
              ''
            )}
            {pathname === '/' ? <BagWhite /> : <Bag />}
          </NavLink>
        </nav>
        {mobile && (
          <div
            className={`${mobileMenu ? styles.navContainer : styles.off}`}
            onClick={handleOutsideClick}
          ></div>
        )}
      </>
    </header>
  );
};

export default Header;
