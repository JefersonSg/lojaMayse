import React from 'react';
import Produtos from './Components/produtos/Produtosall';
import styles from './Home.module.css';
import Categorias from './Components/Categorias';
import imageHome from '../public/fotoHome.png';
import { NavLink } from 'react-router-dom';
import Infos from './Components/Infos';
import Header from './Header';

const Home = () => {
  return (
    <>
      <Infos />
      <Header />
      <main className={styles.homeContainer}>
        <div className={styles.homeInit}>
          <img className={styles.fotoHome} src={imageHome} alt="" />
          <div className={styles.wrapInit}>
            <NavLink to={'/produtos/lancamentos'}>
              <button className={styles.buttonInit}>Veja a nova coleção</button>
            </NavLink>
          </div>
        </div>
        <Categorias />
        <Produtos />
      </main>
    </>
  );
};

export default Home;
