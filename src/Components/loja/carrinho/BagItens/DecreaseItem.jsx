import React from 'react';
import styles from './DecreaseItem.module.css';

const DecreaseItem = ({ buttonMenosOf, removerItem }) => {
  return (
    <button
      className={`${buttonMenosOf ? styles.disabled : ''} ${styles.decrease}`}
      onClick={removerItem}
    >
      {'<'}
    </button>
  );
};

export default DecreaseItem;
