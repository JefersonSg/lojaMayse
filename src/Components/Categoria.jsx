import React from 'react';
import styles from './Categoria.module.css';
import api from '../helpers/api';
import { useNavigate } from 'react-router-dom';

const Categoria = ({ img, title, link }) => {
  const url = `${api.getUri()}files/category/`;
  const navigate = useNavigate();

  return (
    <div
      className={styles.selectCategoria}
      onClick={() => navigate(`/produto/categorias/${link}`)}
    >
      <div className={styles.img}>
        <img src={`${url}${img}`} alt={title} />
      </div>
      <p>{title}</p>
    </div>
  );
};

export default Categoria;
