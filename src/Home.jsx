import React from 'react';
import Produtos from './Components/Produtos';
import styles from './Home.module.css';
import Categorias from './Components/Categorias';

const Home = () => {
  return (
    <main className="container">
      <img
        src="../public/images/artem-labunsky-NV4yuniRcyw-unsplash 1.png"
        alt="Modelo do site"
      />
      <Categorias />
      <Produtos />
    </main>
  );
};

export default Home;
