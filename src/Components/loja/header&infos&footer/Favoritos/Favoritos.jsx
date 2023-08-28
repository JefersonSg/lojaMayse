import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Favoritos.module.css';

// SVGS
import { ReactComponent as Favorito } from '../../../../assets/svg/svgHeader/favoritos500.svg';

const Favoritos = () => {
  const { pathname } = useLocation();

  return (
    <NavLink
      to={'/favoritos'}
      className={`${styles.favorito} ${pathname === '/' ? styles.home : ''}`}
    >
      {pathname === '/' ? <Favorito /> : <Favorito />}
    </NavLink>
  );
};

export default Favoritos;
