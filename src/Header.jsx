import React from 'react';
import styles from './Header.module.css';
import { ReactComponent as Logo } from './assets/svgHeader/logoWhite.svg';

const Header = () => {
  return (
    <header className={`${styles.header}`}>
      <Logo />
      <nav className={styles.nav}>
        <ul>
          <li>LINGERIE</li>
          <li>SUTIÃNS</li>
          <li>CALCINHAS BASICAS</li>
          <li>CALCINHAS DE RENDA</li>
          <li>ACESSÓRIOS</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
