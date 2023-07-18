import React from 'react';
import styles from './Produtos.module.css';
import Produto from './Produto';
import useFetch from '../../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

import api from '../../../helpers/api';

const Produtos = () => {
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const navigate = useNavigate();

  const { request, error, loading, data } = useFetch();

  React.useEffect(() => {
    request(`${api.getUri()}products/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [request, token]);
  return (
    <>
      <p className={'ButtonCriar'} onClick={() => navigate('/dashboard/criar')}>
        Crie um novo produto
      </p>
      <section className={styles.produtosContainer}>
        <div className={styles.produtos}>
          {data &&
            data.products.map(
              ({ _id, name, price, brand, model, images, stock }) => (
                <Produto
                  key={_id}
                  src={images[0]}
                  title={name}
                  price={price}
                  brand={brand}
                  model={model}
                  id={_id}
                />
              ),
            )}
        </div>
      </section>
    </>
  );
};

export default Produtos;
