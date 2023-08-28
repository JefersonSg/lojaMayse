import React from 'react';
import styles from './AddItem.module.css';

const add = ({ buttonOf, adicionarItem }) => {
  return (
    <button
      className={`${buttonOf ? styles.disabled : ''} ${styles.add}`}
      onClick={adicionarItem}
    >
      {'>'}
    </button>
  );
};

export default add;
