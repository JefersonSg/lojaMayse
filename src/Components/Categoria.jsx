import React from 'react';
import styles from './Categoria.module.css';

const Categoria = ({ img, title }) => {
  return (
    <div className={styles.selectCategoria}>
      <div className={styles.img}>
        <img src={img} alt={title} />
      </div>
      <p>{title}</p>
    </div>
  );
};

export default Categoria;
