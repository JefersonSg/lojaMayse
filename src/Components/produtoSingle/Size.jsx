import React from 'react';
import styles from './Size.module.css';

const Sizes = ({ size, index, handleCores, emFalta, active }) => {
  return (
    <div
      onClick={(e) => {
        handleCores(e);
      }}
      className={`${styles.sizes} ${
        !emFalta[index] && active === size ? styles.active : ''
      }
${emFalta[index] ? styles.emFalta : ''}

`}
    >
      <h4>{size}</h4>
    </div>
  );
};

export default Sizes;
