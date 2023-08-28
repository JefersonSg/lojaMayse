import React from 'react';
import styles from './Descricao.module.css';
const Descricao = ({ description }) => {
  return (
    <div className={styles.descricao}>
      <p>DESCRICAO</p>
      <span className={styles.descricaoTexto}>{description}</span>
    </div>
  );
};

export default Descricao;
