import React, { useEffect } from 'react';
import useFetch from '../../../Hooks/useFetch';
import styles from './ProdutoSingle.module.css';
import { useParams, useNavigate } from 'react-router-dom';

// Helps
import api from '../../../helpers/api';

// Hooks

// Components
import Photos from '../photo/Photos';
import Size from '../../produtoSingle/Size';
import ColorRadio from '../../produtoSingle/ColorRadio';
import Button from '../forms/Button';
import Descricao from '../../produtoSingle/Descricao';

const ProdutoSingle = () => {
  const [product, setProduct] = React.useState('');
  const [modalDelete, setModalDelete] = React.useState(false);
  const { data, request, error, loading } = useFetch();
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const [image, setImage] = React.useState('');
  const [images, setImages] = React.useState('');
  const [emFalta, setEmFalta] = React.useState([]);
  const [travarCarrinho, setTravarCarrinho] = React.useState(false);

  const params = useParams();

  // Cores
  const [active, setActive] = React.useState('');
  const [colorSelected, setColorSelected] = React.useState('');

  // Seletor de cores
  const [indexColorActive, setIndexColorActive] = React.useState(0);
  const [cores, setCores] = React.useState('');
  const [codeColorActive, setCodeColorActive] = React.useState('');
  const [codes, setCodes] = React.useState('');
  const [corOn, setCorOn] = React.useState([]);
  const [colorActive, setColorActive] = React.useState('');

  // Full Screen
  const [fullSlide, setFullSlide] = React.useState(undefined);

  // Error
  const [errorForm, setErrorForm] = React.useState('');

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
      setImage(data.json.product.images[0]);
      setImages(data.json.product.images);
      setCodes(data.json.product.codeColors);
      setCores(data.json.product.colors);
      setCodeColorActive(data.json.product.codeColors[0]);
      setColorSelected(data.json.product.colors[0]);
    }
    produtoId();
  }, [params, request, token]);

  const navigate = useNavigate();

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

  // Seleção da cor inicial
  React.useEffect(() => {
    if (product) {
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
      setErrorForm(false);
    }
    setEmFalta(verify);
  }

  function handleDelete() {
    const data = api
      .delete(`/products/${product._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate('/dashboard');
        return response.json;
      })
      .catch((err) => console.log(err));
  }

  function selectColor(e) {
    const color = e.target.getAttribute('value');
    setColorSelected(color);
  }

  // Error
  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setErrorForm(false);
    }, 7000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [errorForm]);

  const url = import.meta.env.VITE_APP_IMAGE_URL;

  return (
    <>
      <div className="container">
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
        <h1>Produto: {product.name ? product.name : 'Não encontrado'}</h1>
        {product.images && (
          <div>
            <div className={styles.ProductView_container}>
              <section
                className={styles.ProductView_images}
                style={{ top: top }}
              >
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
                  <h3 className="subtitle">Selecione o tamanho</h3>

                  {emFalta && (
                    <>
                      <Size
                        size={'P'}
                        index={0}
                        handleCores={handleCores}
                        emFalta={emFalta}
                        active={active}
                      />
                      <Size
                        size={'M'}
                        index={1}
                        handleCores={handleCores}
                        emFalta={emFalta}
                        active={active}
                      />
                      <Size
                        size={'G'}
                        index={2}
                        handleCores={handleCores}
                        emFalta={emFalta}
                        active={active}
                      />
                      <Size
                        size={'GG'}
                        index={3}
                        handleCores={handleCores}
                        emFalta={emFalta}
                        active={active}
                      />
                    </>
                  )}
                </div>

                <Descricao description={product.description} />
              </section>
            </div>

            <div className={styles.botoes}>
              <Button
                onClick={() => navigate(`/dashboard/edit/${params['id']}`)}
              >
                EDITAR
              </Button>
              <Button onClick={() => setModalDelete(true)}>DELETAR</Button>
            </div>
          </div>
        )}
        {modalDelete && (
          <div className={styles.deletar}>
            <p>Deseja mesmo deletar este produto?</p>
            <div>
              <button onClick={handleDelete}>SIM</button>{' '}
              <button onClick={() => setModalDelete(false)}>NÂO</button>
            </div>
          </div>
        )}
      </div>
      {errorForm && <span className={`error animeLeftRight`}>{errorForm}</span>}
    </>
  );
};

export default ProdutoSingle;
