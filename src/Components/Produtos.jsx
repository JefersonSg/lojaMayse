import React from 'react';
import styles from './Produtos.module.css';
import Produto from './Produto';

import Produto1 from '../../public/produtos/Rectangle 7-1.png';
import Produto2 from '../../public/produtos/Rectangle 7.png';
import Produto3 from '../../public/produtos/Rectangle 7-1.png';
import Produto4 from '../../public/produtos/Rectangle 7-2.png';
import Produto5 from '../../public/produtos/Rectangle 7-3.png';
import Produto6 from '../../public/produtos/Rectangle 7-4.png';
import Produto7 from '../../public/produtos/Rectangle 7-5.png';
import Produto8 from '../../public/produtos/Rectangle 7-6.png';
import Produto9 from '../../public/produtos/Rectangle 7-2.png';

const Produtos = () => {
  const [images, setImages] = React.useState([]);

  return (
    <>
      <section className={styles.produtosContainer}>
        <h3 className="subtitle">Mais Vendidos</h3>
        <div className={styles.produtos}>
          <Produto
            src={Produto1}
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src={Produto2}
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src={Produto3}
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src={Produto4}
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src={Produto5}
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src={Produto6}
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src={Produto7}
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src={Produto8}
            title="Liberty"
            price="49,90"
            model="trikini in Black with Soutache"
          />
          <Produto
            src={Produto9}
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
