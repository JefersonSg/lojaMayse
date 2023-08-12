import React from 'react';
import styles from './Produtos.module.css';
import Produto from './Produto';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

import api from '../../helpers/api';

const Produtos = () => {
  const [token] = React.useState(window.localStorage.getItem('token') || '');

  // const [emStock, setEmStock] = React.useState(true);
  const navigate = useNavigate();

  const { request, error, loading, data } = useFetch();

  let emStock;

  React.useEffect(() => {
    request(`${api.getUri()}products/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [request, token]);

  return (
    <>
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

                const emStock = colors.every((cor, i) => {
                  return (
                    +stock.sizeP.amount[i] ||
                    +stock.sizeM.amount[i] ||
                    +stock.sizeG.amount[i] ||
                    +stock.sizeGG.amount[i]
                  );
                });

                if (emStockColor) {
                  return (
                    <Produto
                      key={_id}
                      src={images[0]}
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
    </>
  );
};

export default Produtos;
