import React from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
  placeholder,
  ...props
}) => {
  return (
    <>
      <div className={styles.divInput}>
        <label htmlFor={name}>{label}</label>

        <input
          id={name}
          className={styles.input}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          onBlur={onBlur}
          multiple={props}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
};

export default Input;
