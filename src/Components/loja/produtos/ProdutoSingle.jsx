import React, { useEffect } from 'react';
import styles from './ProdutoSingle.module.css';
import { useParams, useNavigate } from 'react-router-dom';

// Helps
import api from '../../../helpers/api';

// Hooks
import useFetch from '../../../Hooks/useFetch';
import useMedia from '../../../Hooks/useMedia';

// Components
import BreadCrumbs from './Breadcrumbs';
import ColorRadio from '../../produtoSingle/ColorRadio';
import Size from '../../produtoSingle/Size';
import Descricao from '../../produtoSingle/Descricao';
import ImageContainer from '../../produtoSingle/ImageContainer';
import AddBagButton from '../../produtoSingle/AddBagButton';

const ProdutoSingle = () => {
  const [product, setProduct] = React.useState('');
  const [temStock, setTemStock] = React.useState(false);

  const { data, request, error, loading } = useFetch();
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const [image, setImage] = React.useState('');
  const [images, setImages] = React.useState('');
  const [emFalta, setEmFalta] = React.useState([]);
  const params = useParams();

  const [travarCarrinho, setTravarCarrinho] = React.useState(false);
  const mobile = useMedia('(max-width: 43.75rem)');
  const navigate = useNavigate();

  // Error
  const [errorForm, setErrorForm] = React.useState('');

  // Botão de adição
  const [addBag, setAddBag] = React.useState(1);
  const [storageBag, setStorageBag] = React.useState(
    localStorage.getItem('bag') && JSON.parse(localStorage.getItem('bag')),
  );

  const [sizeActive, setSizeActive] = React.useState('');

  console.log(sizeActive);
  // Seletor de cores
  const [indexColorActive, setIndexColorActive] = React.useState(0);
  const [cores, setCores] = React.useState('');
  const [codeColorActive, setCodeColorActive] = React.useState('');
  const [codes, setCodes] = React.useState('');
  const [corOn, setCorOn] = React.useState([]);

  // Full Screen
  const [fullSlide, setFullSlide] = React.useState(undefined);

  // FORM BAG
  const [colorSelected, setColorSelected] = React.useState('');

  // Fetch
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
      if (+product.stock.sizeP.amount[0]) {
        setSizeActive('P');

        return;
      } else if (+product.stock.sizeM.amount[0]) {
        setSizeActive('M');
        return;
      } else if (+product.stock.sizeG.amount[0]) {
        setSizeActive('G');

        return;
      } else if (+product.stock.sizeGG.amount[0]) {
        setSizeActive('GG');

        return;
      } else {
        setSizeActive('');
        setTravarCarrinho(true);
        return;
      }
    }
  }, [product]);

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

  // Error
  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setErrorForm(false);
    }, 7000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [errorForm]);

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
      setSizeActive(letra);
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

    if (sizeActive === 'P' && emFaltaP) {
      setErrorForm(`A cor escolhida não está disponivel no tamanho P`);
      setTravarCarrinho(true);
    } else if (sizeActive === 'M' && emFaltaM) {
      setErrorForm('A cor escolhida não está disponivel no tamanho M');
      setTravarCarrinho(true);
    } else if (sizeActive === 'G' && emFaltaG) {
      setErrorForm('A cor escolhida não está disponivel no tamanho G');
      setTravarCarrinho(true);
    } else if (sizeActive === 'GG' && emFaltaGG) {
      setErrorForm('A cor escolhida não está disponivel no tamanho GG');
      setTravarCarrinho(true);
    } else {
      setErrorForm(false);
      setAddBag({
        size: sizeActive,
        color: colorSelected,
        id_product: params['id'],
      });
    }
    setEmFalta(verify);
  }

  const url = import.meta.env.VITE_APP_IMAGE_URL;

  return (
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
          <ImageContainer
            image={image}
            images={images}
            setFullSlide={setFullSlide}
          />
          <section className={styles.ProductView_details}>
            <span className={styles.brand}>{product.brand}</span>
            <p className={styles.name}>{product.name}</p>
            <span className={styles.price}>
              R$ {product.price.toLocaleString('pt-Br')}
            </span>

            <div className={styles.colors}>
              <span className={styles.spanCor}>
                cores: {<span>{colorSelected}</span>}
              </span>
              <div className={styles.form_radio_container}>
                {cores &&
                  cores.map((cor, i) => (
                    <ColorRadio
                      key={i}
                      i={i}
                      handleCheckColor={handleCheckColor}
                      setCodeColorActive={setCodeColorActive}
                      colorSelected={colorSelected}
                      cor={cor}
                      codes={codes}
                      selectColor={selectColor}
                    />
                  ))}
              </div>
            </div>
            <div className={styles.estoque}>
              <h3 className={`${'subtitle'} ${styles.sizes}`}>
                Selecione o tamanho: <span>{sizeActive}</span>
              </h3>

              {emFalta && (
                <>
                  <Size
                    size={'P'}
                    index={0}
                    handleCores={handleCores}
                    emFalta={emFalta}
                    active={sizeActive}
                  />
                  <Size
                    size={'M'}
                    index={1}
                    handleCores={handleCores}
                    emFalta={emFalta}
                    active={sizeActive}
                  />
                  <Size
                    size={'G'}
                    index={2}
                    handleCores={handleCores}
                    emFalta={emFalta}
                    active={sizeActive}
                  />
                  <Size
                    size={'GG'}
                    index={3}
                    handleCores={handleCores}
                    emFalta={emFalta}
                    active={sizeActive}
                  />
                </>
              )}
            </div>
            <AddBagButton
              storageBag={storageBag}
              travarCarrinho={travarCarrinho}
              sizeActive={sizeActive}
              colorSelected={colorSelected}
              params={params}
              codeColorActive={codeColorActive}
            />
            <Descricao description={product.description} />
          </section>
        </main>
      )}

      {errorForm && <span className={`error animeLeftRight`}>{errorForm}</span>}
    </div>
  );
};

export default ProdutoSingle;
