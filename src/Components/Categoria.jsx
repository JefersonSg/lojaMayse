import React from 'react';
import styles from './Categoria.module.css';

const Categoria = ({ img, title }) => {
  return (
    <li className={styles.selectCategoria}>
      <div className={styles.img}>
        <img src={img} alt={title} />
      </div>
      <p>{title}</p>
    </li>
  );
};

export default Categoria;
