import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import useMedia from './Hooks/useMedia';
import { ReactComponent as Logo } from './assets/svg/svgHeader/logoWhite.svg';

const Header = () => {
  const mobile = useMedia('(max-width: 64rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);

  function handleOutsideClick({ target, currentTarget }) {
    if (target === currentTarget) {
      setMobileMenu(false);
    }
  }
  const { pathname } = useLocation();
  React.useEffect(() => {
    return setMobileMenu(false);
  }, [pathname]);

  return (
    <header className={`${mobile ? styles.headerMobile : styles.header}`}>
      <Logo />

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
      >
        <nav
          className={`${mobile ? styles.navMobile : styles.nav} 
        ${mobileMenu ? styles.navMobileActive : ''}
        ${mobileMenu ? 'animeLeft' : ''}`}
        >
          <ul>
            <li>LINGERIE</li>
            <li>SUTIÃNS</li>
            <li>CALCINHAS BASICAS</li>
            <li>CALCINHAS DE RENDA</li>
            <li>ACESSÓRIOS</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
