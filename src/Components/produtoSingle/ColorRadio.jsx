import React from 'react';
import styles from './ColorRadio.module.css';

const ColorRadio = ({
  i,
  handleCheckColor,
  setCodeColorActive,
  colorSelected,
  cor,
  codes,
  selectColor,
}) => {
  return (
    <>
      <div key={i} className={`${styles.colorInput}`}>
        <label
          onClick={(e) => {
            handleCheckColor(e, i);
            setCodeColorActive(codes[i]);
          }}
          className={colorSelected === cor ? styles.active : ''}
        >
          {cor}
          {colorSelected}
          <span
            className={`${styles.spanColor}
                            `}
            style={{ backgroundColor: `${codes[i]}` }}
          ></span>
          <input
            type="radio"
            name="selectColor"
            value={cor}
            id={`cor${i}`}
            onChange={selectColor}
            checked={colorSelected === cor}
            className={`${styles.cores} ${styles.formRadio} `}
            key={cor + i}
          />
        </label>
      </div>
    </>
  );
};

export default ColorRadio;
