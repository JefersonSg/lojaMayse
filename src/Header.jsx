import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import useMedia from './Hooks/useMedia';
import { ReactComponent as Logo } from './assets/svg/svgHeader/logoWhite.svg';
import { ReactComponent as Bag } from './assets/svg/svgHeader/bag.svg';
import { ReactComponent as LogoMobile2 } from './assets/svg/svgHeader/logo2.svg';

const Header = () => {
  const mobile = useMedia('(max-width: 64rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [changeHeader, setChangeHeader] = React.useState(true);

  React.useEffect(() => {
    function infiniteScroll() {
      const scroll = window.scrollY;
      const heigth = document.body.offsetHeight - window.innerHeight;

      if (scroll > heigth * 0.75) {
        console.log('true');
        console.log(scroll, heigth);

        setChangeHeader(false);
      } else {
        console.log('false');

        setChangeHeader(true);
      }
    }

    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [changeHeader]);
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
    <header
      className={`${mobile ? styles.headerMobile : styles.header}
    ${!changeHeader && styles.header2}`}
    >
      {changeHeader && (
        <div className={styles.logo}>
          <Logo />
        </div>
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
        <ul>
          <li className={styles.links}>LINGERIE</li>
          <li className={styles.links}>SUTIÃNS</li>
          <li className={styles.links}>CALCINHAS BASICAS</li>
          <li className={styles.links}>CALCINHAS DE RENDA</li>
          <li className={styles.links}>ACESSÓRIOS</li>
        </ul>
      </nav>
      {!changeHeader && (
        <div className={`${styles.logo2}`}>
          <LogoMobile2 />
        </div>
      )}
      {!changeHeader && (
        <div className={`${styles.bag}`}>
          <Bag />
        </div>
      )}
    </header>
  );
};

export default Header;
