import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

// Helps
import api from '../../../helpers/api';

// Hooks
import useMedia from '../../../Hooks/useMedia';
import useFetch from '../../../Hooks/useFetch';

// Components
import Logo from './Logo/Logo';
import ButtonMobile from './ButtonMobile/ButtonMobile';
import Bag from './Bag/Bag';
import Favoritos from './Favoritos/Favoritos';
import Categorias from './Categorias/Categorias';

const Header = () => {
  const { data, error, loading, request } = useFetch();

  const [moveLeft, setMoveLeft] = React.useState(false);

  const mobile = useMedia('(max-width: 64rem)');

  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();

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
          <Categorias
            mobile={mobile}
            mobileMenu={mobileMenu}
            moveLeft={moveLeft}
          />
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
