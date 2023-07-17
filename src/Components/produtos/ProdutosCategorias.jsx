import React from 'react';
import styles from './Produtos.module.css';
import Produto from './Produto';
import useFetch from '../../Hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../../helpers/api';
import PageAtual from './PageAtual';

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
        {categoria && <PageAtual categoriaAtual={categoria.Category} />}
        <h3 className="subtitle">{categoria && categoria.Category}</h3>
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

export default ProdutosCategorias;
