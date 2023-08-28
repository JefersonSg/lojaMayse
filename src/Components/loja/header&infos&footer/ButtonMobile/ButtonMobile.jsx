import React from 'react';
import styles from './ButtonMobile.module.css';
import { useLocation } from 'react-router-dom';

const ButtonMobile = ({ mobileMenu, setMobileMenu, setMoveLeft }) => {
  const { pathname } = useLocation();

  return (
    <button
      className={`${styles.mobileButton} ${
        pathname === '/' && styles.buttonWhite
      } ${mobileMenu ? styles.mobileButtonActive : ''}`}
      onClick={() => {
        setMobileMenu(!mobileMenu);
        setMoveLeft(mobileMenu);
      }}
    ></button>
  );
};

export default ButtonMobile;
