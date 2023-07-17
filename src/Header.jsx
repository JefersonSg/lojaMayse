import React from 'react';
import { useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
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

  const mobile = useMedia('(max-width: 64rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [scroll1, setScroll1] = React.useState(false);
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

  // Scrolls
  React.useEffect(() => {
    function infiniteScroll() {
      const scroll = Math.floor(window.scrollY);
      const heigth = document.body.offsetHeight - window.innerHeight;
      const scrollagem = scroll < heigth * 0.5;
      // HOME
      setScroll1(false);

      //Home Computer

      if (!scroll) {
        setScroll1(false);
      } else {
        setScroll1(true);
      }
    }
    infiniteScroll();

    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [pathname]);

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
      className={`${styles.header}
      ${pathname === '/' ? styles.styleHome : styles.noHome}
      ${scroll1 ? styles.style2 : ''}
      `}
    >
      <nav className={`${styles.nav} ${mobile ? styles.mobile : ''}`}>
        {/* HOME PAGE SEM SCROLL */}
        <div className={`${scroll1 ? styles.logo2 : styles.logo}`}>
          <NavLink to="/" end>
            {pathname === '/' && !scroll1 ? <Logo /> : <LogoBlack />}
          </NavLink>
        </div>

        <ul
          className={`${mobile ? styles.navMobile : styles.navComputer} ${
            mobileMenu ? styles.active : ''
          }
          ${mobileMenu ? 'animeLeft' : ''}`}
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
        <div className={styles.objetos}>
          <div className={`${styles.bag}`}>
            {pathname === '/' && !scroll1 ? <BagWhite /> : <Bag />}
          </div>
          {mobile && (
            <button
              className={`${styles.mobileButton} ${
                pathname === '/' && !scroll1 && styles.buttonWhite
              } ${mobileMenu ? styles.mobileButtonActive : ''}`}
              onClick={() => setMobileMenu(!mobileMenu)}
            ></button>
          )}
        </div>
      </nav>
      <div
        className={`${mobileMenu ? styles.navContainer : styles.off}`}
        onClick={handleOutsideClick}
      ></div>
    </header>
  );
};

export default Header;
