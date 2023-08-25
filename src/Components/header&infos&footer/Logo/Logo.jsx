import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Logo.module.css';

// SVG
import { ReactComponent as LogoWhite } from '../../../assets/svg/svgHeader/logoWhite.svg';
import { ReactComponent as LogoBlack } from '../../../assets/svg/svgHeader/logo2.svg';

const Logo = () => {
  const { pathname } = useLocation();

  return (
    <div className={`${styles.logo}`}>
      <NavLink to="/" end>
        {pathname === '/' ? <LogoWhite /> : <LogoBlack />}
      </NavLink>
    </div>
  );
};

export default Logo;
