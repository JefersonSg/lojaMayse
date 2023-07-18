import React from 'react';
import styles from './Produto.module.css';

const Produto = ({ src, title, price, model, id }) => {
  const url = 'http://localhost:5000/files/products/';
  return (
    <a className={styles.produto} href={`/dashboard/produto/${id}`}>
      <div>
        <img src={`${url}${src}`} alt={title} />
      </div>
      <div className={styles.infos}>
        <span className={styles.title}>{title}</span>
        <span className={styles.price}>R$ {price}</span>
        <span className={styles.model}>{model}</span>
      </div>
    </a>
  );
};

export default Produto;
