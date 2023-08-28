import React from 'react';
import styles from './Produtos.module.css';
import { useNavigate } from 'react-router-dom';

// Helps
import api from '../../../helpers/api';

// Hooks
import useFetch from '../../../Hooks/useFetch';

// Components
import Produto from './Produto';

const Produtos = () => {
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const [itens, setItens] = React.useState(null);
  const [totalItens, setTotalItens] = React.useState(8);

  // Scrolls
  React.useEffect(() => {
    function infiniteScroll() {
      const scroll = Math.floor(window.scrollY);
      const heigth = document.body.offsetHeight - window.innerHeight;
      const scrollagem = scroll > heigth * 0.6;

      if (itens && scrollagem && totalItens < itens.products.length) {
        setTotalItens(totalItens + 8);
      }
    }
    infiniteScroll();

    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [itens, totalItens]);

  const { request, error, loading, data } = useFetch();

  React.useEffect(() => {
    request(`${api.getUri()}products/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => setData(response.json))
      .catch((err) => console.log(err));
  }, [request, token]);

  function setData(infos) {
    setItens(infos);
  }

  return (
    <section className={styles.produtosContainer}>
      <h3 className="subtitle">Lançamentos</h3>
      <div className={styles.produtos}>
        {data &&
          data.products.map(
            (
              { _id, name, price, brand, description, images, colors, stock },
              index,
            ) => {
              let emStockColor;

              for (let i = 0; i < colors.length; i++) {
                const elementP = +stock.sizeP.amount[i];
                const elementM = +stock.sizeM.amount[i];
                const elementG = +stock.sizeG.amount[i];
                const elementGG = +stock.sizeGG.amount[i];

                if (elementP || elementM || elementG || elementGG) {
                  emStockColor = true;
                }
              }

              if (emStockColor && index < totalItens) {
                return (
                  <Produto
                    key={_id}
                    img={images[0]}
                    img2={images[1]}
                    title={name}
                    price={price}
                    brand={brand}
                    model={description}
                    id={_id}
                  />
                );
              }

              return null;
            },
          )}
      </div>
    </section>
  );
};

export default Produtos;
