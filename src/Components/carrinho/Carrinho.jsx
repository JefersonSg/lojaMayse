import React from 'react';
import styles from './Carrinho.module.css';
import api from '../../helpers/api';
import useFetch from '../../Hooks/useFetch';
import BagItens from './BagItens';

const Carrinho = () => {
  const { data, error, loading, request } = useFetch();
  const [itensCarrinho, setItensCarrinho] = React.useState(null);
  const [itens, setItens] = React.useState(
    localStorage.getItem('bag')
      ? JSON.parse(localStorage.getItem('bag'))
      : false,
  );
  console.log(itens);

  React.useEffect(() => {
    const fetchBag = async () => {
      const bagItens = itens.map(({ id }) => {
        return request(`${api.getUri()}products/${id}`, {
          headers: {},
        })
          .then((response) => response.json.product)
          .catch((error) =>
            console.error(`Erro ao buscar Produto ${id}:`, error),
          );
      });
      const products = await Promise.all(bagItens);
      return setItensCarrinho(products);
    };
    fetchBag();
  }, [itens, request]);
  const url = `${api.getUri()}files/products/`;

  return (
    <div className={styles.bagItens}>
      <h2 className="subtitle">Seus itens no carrinho</h2>
      {itensCarrinho &&
        itensCarrinho.map(
          (
            { name, images, brand, colors, description, price, stock },
            index,
          ) => (
            <div key={index}>
              <BagItens
                name={name}
                image={images[0]}
                brand={brand}
                colors={colors}
                description={description}
                price={price}
                stock={stock}
                sizeSelected={itens[index].size}
                colorSelected={itens[index].color}
                amountSelected={itens[index].amount}
                index={index}
              />
            </div>
          ),
        )}
      <button className="ButtonCriar">Concluir Compra</button>
    </div>
  );
};

export default Carrinho;
