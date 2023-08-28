import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Logo.module.css';

// SVG
import { ReactComponent as LogoWhite } from '../../../../assets/svg/svgHeader/LogoMayse2.svg';
import { ReactComponent as LogoBlack } from '../../../../assets/svg/svgHeader/LogoMayseBlack.svg';

const Logo = () => {
  const { pathname } = useLocation();

  return (
    <NavLink to="/" end className={`${styles.logo}`}>
      {pathname === '/' ? <LogoWhite /> : <LogoBlack />}
    </NavLink>
  );
};

export default Logo;
