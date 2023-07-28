import React from 'react';
import styles from './Produto.module.css';
import api from '../../helpers/api';
import { NavLink } from 'react-router-dom';
import Image from '../../helpers/Image';

const Produto = ({ src, title, price, model, id }) => {
  const url = import.meta.env.VITE_APP_IMAGE_URL;

  return (
    <NavLink className={styles.produto} to={`/produtos/${id}`}>
      <div className={styles.divImage}>
        <Image alt={title} src={url + src} />
      </div>
      <div className={styles.infos}>
        <span className={styles.title}>{title}</span>
        <span className={styles.price}>R$ {price}</span>
        <span className={styles.model}>{model}</span>
      </div>
    </NavLink>
  );
};

export default Produto;
