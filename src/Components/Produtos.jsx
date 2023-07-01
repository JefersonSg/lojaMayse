import React from 'react';
import styles from './Produtos.module.css';
import Produto from './Produto';

const Produtos = () => {
  const [images, setImages] = React.useState([]);

  return (
    <>
      <section className={styles.produtosContainer}>
        <h3 className="subtitle">Mais Vendidos</h3>
        <div className={styles.produtos}>
          <Produto
            src="../../public/images/produtos/Rectangle 7-1.png"
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src="../../public/images/produtos/Rectangle 7.png"
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src="../../public/images/produtos/Rectangle 7-1.png"
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src="../../public/images/produtos/Rectangle 7-2.png"
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src="../../public/images/produtos/Rectangle 7-3.png"
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src="../../public/images/produtos/Rectangle 7-4.png"
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src="../../public/images/produtos/Rectangle 7-5.png"
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src="../../public/images/produtos/Rectangle 7-6.png"
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src="../../public/images/produtos/Rectangle 8-1.png"
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
        </div>
      </section>
    </>
  );
};

export default Produtos;
