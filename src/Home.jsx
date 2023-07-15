import React from 'react';
import Produtos from './Components/Produtos/ProdutosAll';
import styles from './Home.module.css';
import Categorias from './Components/Categorias';
import imageHome from '../public/fotoHome.png';

const Home = () => {
  return (
    <main className={`HomeContainer`}>
      <div className={styles.fotoHome}>
        <img src={imageHome} alt="" />
      </div>
      <Categorias />
      <Produtos />
    </main>
  );
};

export default Home;
