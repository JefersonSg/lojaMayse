import React from 'react';
import styles from './Favoritos.module.css';
import api from '../../helpers/api';
import useFetch from '../../Hooks/useFetch';
import Produto from '../produtos/Produto';

const Favoritos = () => {
  const [itens, setItens] = React.useState(
    localStorage.getItem('favoritos')
      ? JSON.parse(localStorage.getItem('favoritos'))
      : false,
  );
  const [itensFavoritos, setItensFavoritos] = React.useState(null);
  const { data, error, loading, request } = useFetch();

  const [totalItens, setTotalItens] = React.useState(8);

  React.useEffect(() => {
    const fetchBag = async () => {
      const bagItens = itens.map((id) => {
        return request(`${api.getUri()}products/${id}`, {
          headers: {},
        })
          .then((response) => response.json.product)
          .catch((error) =>
            console.error(`Erro ao buscar Produto ${id}:`, error),
          );
      });
      const products = await Promise.all(bagItens);

      const cleanProducts = await products.filter(
        (product) => product !== undefined,
      );

      function limparItensExcluidos() {
        let itensRemove = [...itens];

        products.forEach((item, index) => {
          if (item === undefined) {
            itensRemove.splice(index, 1);
          }

          localStorage.setItem('bag', JSON.stringify(itensRemove));
        });
      }

      if (products.length !== cleanProducts.length) {
        limparItensExcluidos();
      }

      if (cleanProducts[0]) {
        return setItensFavoritos(cleanProducts);
      }
      return;
    };
    fetchBag();
  }, [itens, request]);

  // Scrolls
  React.useEffect(() => {
    function infiniteScroll() {
      const scroll = Math.floor(window.scrollY);
      const heigth = document.body.offsetHeight - window.innerHeight;
      const scrollagem = scroll > heigth * 0.6;
      if (itensFavoritos && scrollagem && totalItens < itensFavoritos.length) {
        setTotalItens(totalItens + 8);
      }
    }
    infiniteScroll();

    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [itensFavoritos, totalItens]);

  return (
    <main className={styles.favoritosContainer}>
      <h2 className="subtitle">Seus Favoritos</h2>

      <div className={styles.produtos}>
        {itensFavoritos &&
          itensFavoritos.map(
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
    </main>
  );
};

export default Favoritos;
