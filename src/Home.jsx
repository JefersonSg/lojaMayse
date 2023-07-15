import React from 'react';
import Produtos from './Components/Produtos/ProdutosAll';
import styles from './Home.module.css';
import Categorias from './Components/Categorias';
import imageHome from '../public/fotoHome.png';

const Home = () => {
  return (
    <main className={`HomeContainer`}>
      <img src={imageHome} alt="" />
      <Categorias />
      <Produtos />
    </main>
  );
};

export default Home;
