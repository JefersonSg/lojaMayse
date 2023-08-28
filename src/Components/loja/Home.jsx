import React from 'react';
import styles from './Home.module.css';
import { NavLink } from 'react-router-dom';

// Helps

// Hooks

// Components
import Header from './header&infos&footer/Header';
import Infos from './header&infos&footer/Infos';
import Categorias from './categorias/Categorias';
import Produtos from './produtos/Produtosall';

// Images
import imageHome from '../../assets/fotoHome.png';

// SVGS
import { ReactComponent as Whatsapp } from '../../assets/svg/svgFooter/whatsapp.svg';

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
        <div
          onClick={() => {
            const urlWhatsapp = `https://wa.me/22992339289?text=Olá, gostaria de tirar uma duvida`;
            window.open(urlWhatsapp, '_blank');
          }}
          className="btnZap"
        >
          <Whatsapp />
        </div>
      </main>
    </>
  );
};

export default Home;
