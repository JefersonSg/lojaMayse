import React from 'react';
import styles from './Produto.module.css';
import api from '../../helpers/api';
import { NavLink } from 'react-router-dom';
import Image from '../../helpers/Image';
import { ReactComponent as AddBag } from '../../assets/svg/svgCarrinho/add_shopping_cart.svg';
import Like from '../lottie/Like';

const Produto = ({ img, title, price, model, id, img2 }) => {
  const url = import.meta.env.VITE_APP_IMAGE_URL;

  return (
    <NavLink className={styles.produto} to={`/produtos/${id}`}>
      <Like id={id} />
      <div className={styles.divImage}>
        <Image alt={title} src={url + img} src2={url + img2} />
      </div>
      <div className={styles.infos}>
        <span className={styles.price}>R$ {price}</span>
        <span className={styles.title}>{title}</span>
        <div className={styles.bag}>
          <AddBag />
        </div>
      </div>
    </NavLink>
  );
};

export default Produto;
