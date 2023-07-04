import React from 'react';
import Produtos from './Components/Produtos';
import styles from './Home.module.css';
import Categorias from './Components/Categorias';
import imageHome from '../public/fotoHome.png';

const Home = () => {
  // const imagePath = `${process.env.PUBLIC_URL}/images/imagem.jpg`;
  return (
    <main className={`container`}>
      <img src={imageHome} alt="" />
      <Categorias />
      <Produtos />
    </main>
  );
};

export default Home;
