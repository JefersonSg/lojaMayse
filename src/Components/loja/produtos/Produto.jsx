import React from 'react';
import styles from './Produto.module.css';
import { NavLink } from 'react-router-dom';

// Helps
import api from '../../../helpers/api';
import Image from '../../../helpers/Image';

// Hooks

// Components
import Favorito from '../lottie/Like';
import { ReactComponent as AddBag } from '../../../assets/svg/svgCarrinho/add_shopping_cart.svg';

const Produto = ({ img, title, price, model, id, img2 }) => {
  const url = import.meta.env.VITE_APP_IMAGE_URL;
  const [carregou, setCarregou] = React.useState(false);

  return (
    <NavLink className={styles.produto} to={`/produtos/${id}`}>
      {carregou && <Favorito id={id} />}
      <div className={styles.divImage}>
        <Image
          alt={title}
          src={url + img}
          src2={url + img2}
          setCarregou={setCarregou}
        />
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
