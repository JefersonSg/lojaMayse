import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Bag.module.css';

// SVGS
import { ReactComponent as BagBlack } from '../../../../assets/svg/svgHeader/bag.svg';
import { ReactComponent as BagWhite } from '../../../../assets/svg/svgHeader/bagWhite.svg';

const Bag = () => {
  const itensBag = React.useState(
    JSON.parse(localStorage.getItem('bag')) || false,
  );
  const { pathname } = useLocation();

  return (
    <NavLink to={'/checkout'} className={`${styles.bag}`}>
      {itensBag[0] ? (
        <span className={styles.itensBag}>{itensBag[0].length}</span>
      ) : (
        ''
      )}
      {pathname === '/' ? <BagWhite /> : <BagBlack />}
    </NavLink>
  );
};

export default Bag;
