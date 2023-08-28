import React from 'react';
import styles from './AddBagButton.module.css';

const AddBagButton = ({
  storageBag,
  travarCarrinho,
  sizeActive,
  colorSelected,
  params,
  codeColorActive,
}) => {
  function addBag() {
    const infos = storageBag ? [...storageBag] : [];
    if (!travarCarrinho) {
      const bag = {
        size: sizeActive,
        color: colorSelected,
        id: params['id'],
        codeColor: codeColorActive,
        amount: 1,
      };
      infos.push(bag);

      localStorage.setItem('bag', JSON.stringify(infos));
      window.location.reload();
    }
  }

  return (
    <div className={styles.adicionar}>
      <button
        onClick={addBag}
        className={`${styles.addBag} ${travarCarrinho ? styles.bagOff : ''}`}
      >
        ADICIONAR AO CARRINHO
      </button>
    </div>
  );
};

export default AddBagButton;
