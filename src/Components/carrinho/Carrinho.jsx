import React from 'react';
import styles from './Carrinho.module.css';
import api from '../../helpers/api';
import useFetch from '../../Hooks/useFetch';
import BagItens from './BagItens';

const Carrinho = () => {
  const { data, error, loading, request } = useFetch();
  const [itensCarrinho, setItensCarrinho] = React.useState(null);
  const [valorCarrinho, setValorCarrinho] = React.useState(0);

  const [itens, setItens] = React.useState(
    localStorage.getItem('bag')
      ? JSON.parse(localStorage.getItem('bag'))
      : false,
  );

  const preco = valorCarrinho.toLocaleString('pt-BR').split(',');

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

      if (products[0]) {
        return setItensCarrinho(products);
      }
      return;
    };
    fetchBag();
  }, [itens, request]);

  React.useEffect(() => {
    let valorInicial = 0;
    if (itensCarrinho) {
      itens.forEach((item, i) => {
        valorInicial += +itensCarrinho[i].price * +item.amount;
      });
      setValorCarrinho(valorInicial);
    }
  }, [itens, itensCarrinho]);

  const url = import.meta.env.VITE_APP_IMAGE_URL;
  return (
    <div className={styles.bagItens}>
      <h2 className="subtitle">Seus itens no carrinho</h2>
      {itensCarrinho ? (
        itensCarrinho.map(
          (
            {
              name,
              images,
              brand,
              colors,
              description,
              price,
              stock,
              codeColors,
            },
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
                codes={codeColors}
                sizeSelected={itens[index].size}
                colorSelected={itens[index].color}
                amountSelected={itens[index].amount}
                index={index}
                itens={itens}
                valorCarrinho={valorCarrinho}
                setValorCarrinho={setValorCarrinho}
              />
            </div>
          ),
        )
      ) : (
        <h3 className={`${styles.nada} subtitle`}>
          Nenhum item foi encontrado no carrinho
        </h3>
      )}
      <section className={styles.checkCompra}>
        <p className={styles.total}>
          <span>R$</span> {preco[0] ? preco[0] : '0'},
          <span>
            {preco[1]
              ? preco[1].length === 2
                ? preco[1]
                : `${preco[1]}0`
              : '00'}
          </span>
        </p>
        <button
          className=""
          onClick={() => {
            const itensPayment = localStorage.getItem('bag')
              ? JSON.parse(localStorage.getItem('bag'))
              : '';

            const itensPagamento = itensPayment.map(
              ({ size, color, amount, id }, index) => ({
                name: itensCarrinho[index].name,
                size,
                color,
                amount,
                id,
              }),
            );

            let mensagem = `Olá, eu selecionei os seguintes itens no site :%0A${itensPagamento.map(
              (item) => {
                return `*${item.name}* %0ACor: *${item.color}* %0ATamanho: *${item.size}*%0AQuantidade: *${item.amount}*,%0Acodigo: ${item.id}%0A%0A`;
              },
            )} 
            Valor Total: *R$ ${preco[0] ? preco[0] : '0'},${
              preco[1]
                ? preco[1].length === 2
                  ? preco[1]
                  : `${preco[1]}0`
                : '00'
            }*`;

            const urlWhatsapp = `https://wa.me/22992339289?text=${mensagem}`;
            window.open(urlWhatsapp, '_blank');
          }}
        >
          FINALIZAR
        </button>
      </section>
    </div>
  );
};

export default Carrinho;
