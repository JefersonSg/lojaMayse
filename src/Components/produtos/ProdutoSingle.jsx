import React, { useEffect } from 'react';
import useFetch from '../../Hooks/useFetch';
import styles from './ProdutoSingle.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import Photos from '../photo/Photos';
import api from '../../helpers/api';
import BreadCrumbs from './Breadcrumbs';
import useMedia from '../../Hooks/useMedia';

const ProdutoSingle = () => {
  const [product, setProduct] = React.useState('');
  const [temStock, setTemStock] = React.useState(false);

  const { data, request, error, loading } = useFetch();
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const [image, setImage] = React.useState('');
  const [images, setImages] = React.useState('');
  const [emFalta, setEmFalta] = React.useState([]);
  const params = useParams();
  const [errorForm, setErrorForm] = React.useState('');
  const [indexColorActive, setIndexColorActive] = React.useState(0);
  const [travarCarrinho, setTravarCarrinho] = React.useState(false);
  const mobile = useMedia('(max-width: 43.75rem)');
  const navigate = useNavigate();

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setErrorForm(false);
    }, 7000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [errorForm]);

  // Botão de adição
  const [addBag, setAddBag] = React.useState(1);
  const [storageBag, setStorageBag] = React.useState(
    localStorage.getItem('bag') && JSON.parse(localStorage.getItem('bag')),
  );

  const [active, setActive] = React.useState('');
  const [top, setTop] = React.useState(0);

  // Seletor de cores
  const [cores, setCores] = React.useState('');
  const [codeColorActive, setCodeColorActive] = React.useState('');
  const [codes, setCodes] = React.useState('');
  const [corOn, setCorOn] = React.useState([]);

  // Full Screen
  const [fullSlide, setFullSlide] = React.useState(undefined);

  // FORM BAG
  const [colorSelected, setColorSelected] = React.useState('');

  React.useEffect(() => {
    async function produtoId() {
      const data = await request(`${api.getUri()}products/${params['id']}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(data.json.product);
      setImages(data.json.product.images);
      setImage(data.json.product.images[0]);
      setCodes(data.json.product.codeColors);
      setCores(data.json.product.colors);
      setCodeColorActive(data.json.product.codeColors[0]);
      setColorSelected(data.json.product.colors[0]);
    }
    produtoId();
  }, [params, request, token]);

  // Seleção da cor inicial
  React.useEffect(() => {
    if (product) {
      if (product.colors) {
        let coresOn = [];
        for (let i = 0; i < product.colors; i++) {
          const compare = +product.colors[i] ? true : false;
          coresOn[i] = compare;
        }
        setCorOn(coresOn);
      }

      if (+product.stock.sizeP.amount[0]) {
        setActive('P');

        return;
      } else if (+product.stock.sizeM.amount[0]) {
        setActive('M');

        return;
      } else if (+product.stock.sizeG.amount[0]) {
        setActive('G');

        return;
      } else if (+product.stock.sizeGG.amount[0]) {
        setActive('GG');

        return;
      } else {
        setActive('');
        setTravarCarrinho(true);
        return;
      }
    }
  }, [product]);

  // Scroll
  React.useEffect(() => {
    function infiniteScroll() {
      const scroll = Math.floor(window.scrollY);

      // HOME
      if (scroll) {
        return setTop((-scroll - 60) * 0.22);
      }
      return setTop(0);
    }
    infiniteScroll();

    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, []);

  // FullSize
  useEffect(() => {
    if (fullSlide) {
      document.body.style.overflow = 'hidden';

      navigate();

      const disableBackButton = () => {
        window.onpopstate = (e) => {
          setFullSlide(false);
        };
      };

      disableBackButton();

      return () => {
        setFullSlide(false);
        window.onpopstate = null; // Limpar o manipulador quando o componente for desmontado
        document.body.style.overflow = 'auto';
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [fullSlide, navigate]);

  function handleCores(e) {
    const tamanho = 'size' + e.target.innerText;
    const letra = e.target.innerText;

    const amounts = product.stock[tamanho].amount;

    let coresOn = [];
    for (let i = 0; i < amounts.length; i++) {
      const compare = +amounts[i] > 0;
      coresOn[i] = compare;
    }

    if (coresOn[indexColorActive]) {
      setActive(letra);
      setTravarCarrinho(false);
    }
    setCorOn(coresOn);
  }

  // Seta os tamanhos em falta no primeiro carregamento
  useEffect(() => {
    async function handleCheckColor() {
      // verify amount
      let verify = [];

      if (data) {
        const emFaltaP = +data.product.stock.sizeP.amount[0]
          ? (verify[0] = false)
          : (verify[0] = true);
        const emFaltaM = +data.product.stock.sizeM.amount[0]
          ? (verify[1] = false)
          : (verify[1] = true);
        const emFaltaG = +data.product.stock.sizeG.amount[0]
          ? (verify[2] = false)
          : (verify[2] = true);
        const emFaltaGG = +data.product.stock.sizeGG.amount[0]
          ? (verify[3] = false)
          : (verify[3] = true);

        setEmFalta(verify);
      }
    }

    handleCheckColor();
  }, [data]);

  function selectColor(e) {
    const color = e.target.getAttribute('value');
    setColorSelected(color);
  }

  async function handleCheckColor(e, i) {
    // verify amount
    setIndexColorActive(i);
    let verify = [...emFalta];

    const emFaltaP = +product.stock.sizeP.amount[i]
      ? (verify[0] = false)
      : (verify[0] = true);
    const emFaltaM = +product.stock.sizeM.amount[i]
      ? (verify[1] = false)
      : (verify[1] = true);
    const emFaltaG = +product.stock.sizeG.amount[i]
      ? (verify[2] = false)
      : (verify[2] = true);
    const emFaltaGG = +product.stock.sizeGG.amount[i]
      ? (verify[3] = false)
      : (verify[3] = true);

    if (active === 'P' && emFaltaP) {
      setErrorForm(`A cor escolhida não está disponivel no tamanho P`);
      setTravarCarrinho(true);
    } else if (active === 'M' && emFaltaM) {
      setErrorForm('A cor escolhida não está disponivel no tamanho M');
      setTravarCarrinho(true);
    } else if (active === 'G' && emFaltaG) {
      setErrorForm('A cor escolhida não está disponivel no tamanho G');
      setTravarCarrinho(true);
    } else if (active === 'GG' && emFaltaGG) {
      setErrorForm('A cor escolhida não está disponivel no tamanho GG');
      setTravarCarrinho(true);
    } else {
      setErrorForm('');
      setAddBag({
        size: active,
        color: colorSelected,
        id_product: params['id'],
      });
    }
    setEmFalta(verify);
  }

  const url = import.meta.env.VITE_APP_IMAGE_URL;

  return (
    <>
      <div className="containerSingle">
        {fullSlide && (
          <div
            className={`${styles.containerFullScrenn}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setFullSlide(false);
              }
            }}
          >
            <span
              className={styles.fechar}
              onClick={() => {
                setFullSlide(false);
              }}
            >
              X
            </span>
            <div className={`${styles.imageFullScren} ${'animeTop'}`}>
              <img src={url + fullSlide} alt="" />
            </div>
          </div>
        )}
        {product && !mobile && (
          <BreadCrumbs
            categoriaAtual={product.category}
            nomeProduto={product.name}
          />
        )}
        {product.images && (
          <main className={styles.ProductView_container}>
            <section className={styles.ProductView_images} style={{ top: top }}>
              <Photos
                image1={image}
                imagesAll={images}
                setFullSlide={setFullSlide}
              />
            </section>
            <section className={styles.ProductView_details}>
              <span className={styles.brand}>{product.brand}</span>
              <p className={styles.name}>{product.name}</p>
              <span className={styles.price}>
                R${product.price.toLocaleString('pt-Br')}
              </span>

              <div className={styles.colors}>
                <span className={styles.spanCor}>
                  cores: {<span>{colorSelected}</span>}
                </span>
                <div className={styles.form_radio_container}>
                  {cores &&
                    cores.map((cor, i) => (
                      <div key={i} className={`${styles.colorInput}`}>
                        <label
                          onClick={(e) => {
                            handleCheckColor(e, i);
                            setCodeColorActive(codes[i]);
                          }}
                          className={colorSelected === cor ? styles.active : ''}
                        >
                          {cor}
                          {colorSelected}
                          <span
                            className={`${styles.spanColor}
                            `}
                            style={{ backgroundColor: `${codes[i]}` }}
                          ></span>
                          <input
                            type="radio"
                            name="selectColor"
                            value={cor}
                            id={`cor${i}`}
                            onChange={selectColor}
                            checked={colorSelected === cor}
                            className={`${styles.cores} ${styles.formRadio} `}
                            key={cor + i}
                          />
                        </label>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.estoque}>
                <h3 className="subtitle">Selecione o tamanho</h3>
                <div
                  onClick={(e) => {
                    handleCores(e);
                  }}
                  className={`${styles.sizes} ${
                    !emFalta[0] && active === 'P' ? styles.active : ''
                  }
                  ${emFalta[0] ? styles.emFalta : ''}
                  
                  `}
                >
                  <h4>P</h4>
                </div>
                <div
                  onClick={handleCores}
                  className={`${styles.sizes} ${
                    !emFalta[1] && active === 'M' ? styles.active : ''
                  }
                  ${emFalta[1] ? styles.emFalta : ''}`}
                >
                  <h4>M</h4>
                </div>
                <div
                  onClick={handleCores}
                  className={`${styles.sizes} ${
                    product.stock.sizeG.amount[0] ? '' : styles.emFalta
                  }${!emFalta[2] && active === 'G' ? styles.active : ''}
                  ${emFalta[2] ? styles.emFalta : ''}`}
                >
                  <h4>G</h4>
                </div>
                <div
                  onClick={handleCores}
                  className={`${styles.sizes} ${
                    !emFalta[3] && active === 'GG' ? styles.active : ''
                  }
                  ${emFalta[3] ? styles.emFalta : ''}`}
                >
                  <h4>GG</h4>
                </div>
              </div>
              <div className={styles.adicionar}>
                <button
                  onClick={(e) => {
                    const infos = storageBag ? [...storageBag] : [];
                    if (!travarCarrinho) {
                      const bag = {
                        size: active,
                        color: colorSelected,
                        id: params['id'],
                        codeColor: codeColorActive,
                        amount: 1,
                      };
                      infos.push(bag);

                      localStorage.setItem('bag', JSON.stringify(infos));
                      window.location.reload();
                    }
                  }}
                  className={`${styles.addBag} ${
                    travarCarrinho ? styles.bagOff : ''
                  }`}
                >
                  ADICIONAR AO CARRINHO
                </button>
              </div>
              <div className={styles.descricao}>
                <p>DESCRICAO</p>
                <span className={styles.descricaoTexto}>
                  {product.description}
                </span>
              </div>
            </section>
          </main>
        )}
        {errorForm && (
          <span className={`error animeLeftRight`}>{errorForm}</span>
        )}
      </div>
    </>
  );
};

export default ProdutoSingle;
