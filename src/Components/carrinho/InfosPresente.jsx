import React from 'react';
import styles from './InfosPresente.module.css';

const InfosPresente = () => {
  return (
    <div className={styles.informacoes}>
      <p>
        Ao Atingir o valor de compra de 249,90 você DESBLOQUEARA o{' '}
        <span>FRETE GRÁTIS</span> e um <span>PRESENTE SURPRESA</span> 🎁🥳🎉
      </p>
    </div>
  );
};

export default InfosPresente;
