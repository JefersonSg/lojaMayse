import React from 'react';
import styles from './Carrinho.module.css';
import api from '../../../helpers/api';
import useFetch from '../../../Hooks/useFetch';
import BagItens from './BagItens';
import GiftBox from '../lottie/GiftBox';
import OpenBox from '../lottie/OpenBox';
import Porcentagem from './Porcentagem';
import InfosPresente from './InfosPresente';

const Carrinho = () => {
  const { data, error, loading, request } = useFetch();
  const [itensCarrinho, setItensCarrinho] = React.useState(null);
  const [valorCarrinho, setValorCarrinho] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [restante, setRestante] = React.useState(0);
  const [openBox, setOpenBox] = React.useState(false);
  const [infosPresente, setInfosPresente] = React.useState(false);

  const [itens, setItens] = React.useState(
    localStorage.getItem('bag')
      ? JSON.parse(localStorage.getItem('bag'))
      : false,
  );
  const preco = valorCarrinho.toLocaleString('pt-BR').split(',');

  const [errorForm, setErrorForm] = React.useState('');

  // Fetch Api
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

      // eslint-disable-next-line no-undef
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
        return setItensCarrinho(cleanProducts);
      }
      return;
    };
    fetchBag();
  }, [itens, request]);

  // Hoocks da animação
  const [pause, setPause] = React.useState(false);
  const [stop, setStop] = React.useState(false);

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setErrorForm(false);
    }, 7000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [errorForm]);

  // Timeout para stop da animação
  React.useEffect(() => {
    const temporizador = setTimeout(() => {
      setStop(true);
    }, 2000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [stop]);

  // Esconder Overflow ao abrir a animação
  React.useEffect(() => {
    if (openBox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openBox]);

  // Valor do carrinho
  React.useEffect(() => {
    let valorInicial = 0;
    if (itensCarrinho) {
      itens.forEach((item, i) => {
        if (itensCarrinho[i]) {
          if (+item.amount > 0) {
            valorInicial += +itensCarrinho[i].price * +item.amount;
          }
        }
      });
      setValorCarrinho(valorInicial);
    }
  }, [itens, itensCarrinho]);

  // Porcentagem da barra
  React.useEffect(() => {
    const porcentagem = (valorCarrinho / 249.9) * 100;
    const resto = Number((249.9 - valorCarrinho).toFixed(2));

    setWidth(porcentagem);
    setRestante(resto);
  }, [valorCarrinho]);

  function finalizarCompra() {
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

    let mensagem = `Olá, eu selecionei os seguintes itens no site :%0A%0A${itensPagamento
      .map((item) => {
        return `Nome: *${item.name.trim()}* %0ACor: *${item.color.trim()}* %0ATamanho: *${
          item.size
        }*%0AQuantidade: *${item.amount}* %0Acodigo: ${item.id}%0A%0A`;
      })
      .join('')} 
Valor Total: *R$ ${preco[0] ? preco[0] : '0'},${
      preco[1] ? (preco[1].length === 2 ? preco[1] : `${preco[1]}0`) : '00'
    }*`;

    const urlWhatsapp = `https://wa.me/22992339289?text=${mensagem}`;
    window.open(urlWhatsapp, '_blank');
  }

  const url = import.meta.env.VITE_APP_IMAGE_URL;
  return (
    <>
      <div
        className={styles.bagItens}
        onClick={(e) => {
          if (infosPresente) {
            if (
              e.target.parentElement.classList[0] &&
              e.target.parentElement.classList[0].includes('informacoes')
            ) {
              return;
            }
            setInfosPresente(false);
          }
        }}
      >
        <h2 className="subtitle">Seus itens no carrinho</h2>
        <div className={styles.containerPorcent}>
          <Porcentagem restante={restante} />
          <div className={styles.porcentagemContainer}>
            <span
              className={styles.porcentagemDoPresente}
              style={{ width: `${width}%` }}
            ></span>
            <div
              className={`${styles.giftBox} ${
                restante <= 0 ? styles.ativo : ''
              }`}
              onClick={() => {
                if (restante <= 0) {
                  setOpenBox(true);
                } else {
                  setInfosPresente(!infosPresente);
                  console.log(infosPresente);
                }
              }}
            >
              <GiftBox pause={pause} stop={stop} valor={restante} />
            </div>
            {infosPresente && <InfosPresente />}
          </div>
        </div>

        {openBox && <OpenBox setOpenBox={setOpenBox} />}
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
                  setPause={setPause}
                  setStop={setStop}
                  setErrorForm={setErrorForm}
                  stop={stop}
                  pause={pause}
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
          <div className={styles.containerCheck}>
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
            <button className="" onClick={finalizarCompra}>
              FINALIZAR
            </button>
          </div>
        </section>
        {errorForm && (
          <span className={`error animeLeftRight`}>{errorForm}</span>
        )}
      </div>
    </>
  );
};

export default Carrinho;
