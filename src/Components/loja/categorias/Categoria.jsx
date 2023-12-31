import React from 'react';
import styles from './Categoria.module.css';
import { useNavigate } from 'react-router-dom';

const Categoria = ({ img, title, link }) => {
  const url = import.meta.env.VITE_APP_IMAGE_URL;

  const navigate = useNavigate();

  return (
    <>
      <div
        className={styles.selectCategoria}
        onClick={() => navigate(`/produtos/categoria/${link}`)}
      >
        <div className={styles.img}>
          <img src={`${url}${img}`} alt={title} />
        </div>
        <p>{title}</p>
      </div>
    </>
  );
};

export default Categoria;
