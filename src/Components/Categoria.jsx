import React from 'react';
import styles from './Categoria.module.css';

const Categoria = ({ src, title }) => {
  return (
    <li className={styles.selectCategoria}>
      <div className={styles.img}>
        <img src={src} alt={title} />
      </div>
      <p>{title}</p>
    </li>
  );
};

export default Categoria;
