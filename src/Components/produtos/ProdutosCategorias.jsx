import React from 'react';
import styles from './Produtos.module.css';
import Produto from './Produto';
import useFetch from '../../Hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../../helpers/api';
import BreadCrumbs from './Breadcrumbs';

const ProdutosCategorias = () => {
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const [categoria, setCategoria] = React.useState('');
  const navigate = useNavigate();
  const params = useParams();

  const { request, error, loading, data } = useFetch();

  React.useEffect(() => {
    request(`${api.getUri()}products/categories/${params['id']}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [request, token, params]);

  React.useEffect(() => {
    async function getCategory() {
      const categoria = await api
        .get(`categorys/${params['id']}`)
        .then((response) => setCategoria(response.data.category));
    }
    getCategory();
  }, [request, token, params]);

  return (
    <>
      <section className={styles.produtosContainer}>
        {categoria && <BreadCrumbs categoriaAtual={categoria._id} />}
        <h3 className={`subtitle ${styles.subtitleProduct}`}>
          {categoria && categoria.Category}
        </h3>
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

                if (emStockColor) {
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
    </>
  );
};

export default ProdutosCategorias;
