import React from 'react';
import styles from './Produto.module.css';
import api from '../../helpers/api';

const Produto = ({ src, title, price, model, id }) => {
  const url = `${api.getUri()}files/products/`;
  return (
    <a className={styles.produto} href={`/produto/${id}`}>
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
