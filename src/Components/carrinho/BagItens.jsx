import React from 'react';
import api from '../../helpers/api';
import { color } from 'framer-motion';
import styles from './BagItens.module.css';

const BagItens = ({
  name,
  image,
  brand,
  colors,
  description,
  price,
  stock,
  sizeSelected,
  colorSelected,
  amountSelected,
  index,
}) => {
  const [amounts, setAmounts] = React.useState([]);
  const url = `${api.getUri()}files/products/`;

  return (
    <div className={styles.bagItem}>
      <div
        style={{ backgroundImage: `url('${url}${image}')` }}
        className={styles.image}
      ></div>
      <div className={styles.infos}>
        <h2 className={styles.name}>{name}</h2>
        <span className={styles.price}>
          {price.toLocaleString('pt-BR').includes(',')
            ? `R$ ${price.toLocaleString('pt-BR')}`
            : `R$ ${price},00`}
        </span>
        <span className={styles.description}>{description}</span>
        <div className={styles.addAmount}>
          <button
            onClick={() => {
              let quantidade = [...amounts];
              quantidade[index] = amounts[index] + 1 || 1 + 1;
              setAmounts(quantidade);
            }}
          >
            +
          </button>
          <span className={styles.amount}>{amounts[index] || 1}</span>
          <button
            onClick={() => {
              let quantidade = [...amounts];
              quantidade[index] = amounts[index] > 1 ? amounts[index] - 1 : 1;
              setAmounts(quantidade);
            }}
          >
            -
          </button>
        </div>
        <span className={styles.color}>{colorSelected}</span>
      </div>
    </div>
  );
};

export default BagItens;
