import React from 'react';
import Produtos from './produto/ProdutosAll';
import styles from './Home.module.css';
import User from './user/User';

const Home = () => {
  return (
    <>
      <div className={styles.home}>
        <User />
        <h3 className={styles.subtitle}>
          Veja os seus ultimos produtos criados
        </h3>
        <Produtos />
      </div>
    </>
  );
};

export default Home;
