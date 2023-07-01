import React from 'react';
import styles from './Produto.module.css';

const Produto = ({ src, title, price, model }) => {
  return (
    <a className={styles.produto} href={`/produto/${model}`}>
      <div>
        <img src={src} alt={title} />
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
