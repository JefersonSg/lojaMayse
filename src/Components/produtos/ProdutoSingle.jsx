import React, { useEffect } from 'react';
import useFetch from '../../Hooks/useFetch';
import styles from './ProdutoSingle.module.css';
import Button from '../forms/Button';
import { useParams, useNavigate } from 'react-router-dom';
import Photos from '../photo/Photos';
import api from '../../helpers/api';
import { color } from 'framer-motion';
import BreadCrumbs from './Breadcrumbs';
import Infos from '../Infos';
import Header from '../../Header';

const ProdutoSingle = () => {
  const [product, setProduct] = React.useState('');
  const { data, request, error, loading } = useFetch();
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const [image, setImage] = React.useState('');
  const [images, setImages] = React.useState('');
  const [emFalta, setEmFalta] = React.useState([]);
  const params = useParams();
  const [errorForm, setErrorForm] = React.useState('');
  const [indexColorActive, setIndexColorActive] = React.useState(0);
  const [travarCarrinho, setTravarCarrinho] = React.useState(false);

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setErrorForm(false);
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [errorForm]);

  // Botão de adição
  const [quantidade, setQuantidade] = React.useState(1);
  const [addBag, setAddBag] = React.useState(1);

  const [active, setActive] = React.useState('');

  // Seletor de cores
  const [cores, setCores] = React.useState('');
  const [codes, setCodes] = React.useState('');
  const [corOn, setCorOn] = React.useState([]);

  // FORM BAG
  const [colorSelected, setColorSelected] = React.useState('');

  React.useEffect(() => {
    if (product) {
      if (product.stock.sizeP.amount) {
        setActive('P');
        const amounts = product.stock.sizeP.amount;

        let coresOn = [];
        for (let i = 0; i < amounts.length; i++) {
          const compare = +amounts[i] > 0;
          coresOn[i] = compare;
        }
        setCorOn(coresOn);
        return;
      }

      if (product.stock.sizeM.amount) {
        setActive('M');

        const amounts = product.stock.sizeM.amount;

        let coresOn = [];
        for (let i = 0; i < amounts.length; i++) {
          const compare = +amounts[i] > 0;
          coresOn[i] = compare;
        }
        setCorOn(coresOn);

        return;
      }
      if (product.stock.sizeG.amount) {
        setActive('G');
        const amounts = product.stock.sizeG.amount;

        let coresOn = [];
        for (let i = 0; i < amounts.length; i++) {
          const compare = +amounts[i] > 0;
          coresOn[i] = compare;
        }
        setCorOn(coresOn);
        return;
      }
      if (product.stock.sizeGG.amount) {
        setActive('GG');
        const amounts = product.stock.sizeGG.amount;

        let coresOn = [];
        for (let i = 0; i < amounts.length; i++) {
          const compare = +amounts[i] > 0;
          coresOn[i] = compare;
        }
        setCorOn(coresOn);

        return;
      } else {
        setActive('');
        setCores('');
        return;
      }
    }
  }, [product]);
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
      setTravarCarrinho(false);
    }
    setCorOn(coresOn);
  }

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
      setErrorForm('A cor selecionada está indisponivel no tamanho P');
      setTravarCarrinho(true);
    } else if (active === 'M' && emFaltaM) {
      setErrorForm('A cor selecionada está indisponivel no tamanho M');
      setTravarCarrinho(true);
    } else if (active === 'G' && emFaltaG) {
      setErrorForm('A cor selecionada está indisponivel no tamanho G');
      setTravarCarrinho(true);
    } else if (active === 'GG' && emFaltaGG) {
      setErrorForm('A cor selecionada está indisponivel no tamanho GG');
      setTravarCarrinho(true);
    } else {
      setErrorForm('');
      setTravarCarrinho(false);
      setAddBag({
        size: active,
        color: colorSelected,
        id_product: params['id'],
      });
    }
    setEmFalta(verify);
  }
  return (
    <>
      <div className="containerSingle">
        {product && (
          <BreadCrumbs
            categoriaAtual={product.category}
            nomeProduto={product.name}
          />
        )}
        {product.images && (
          <main className={styles.ProductView_container}>
            <section className={styles.ProductView_images}>
              <Photos image1={image} imagesAll={images} />
            </section>
            <section className={styles.ProductView_details}>
              <span className={styles.brand}>{product.brand}</span>
              <p className={styles.name}>{product.name}</p>
              <span className={styles.price}>
                R${product.price.toLocaleString('pt-Br')}
              </span>

              <div className={styles.colors}>
                <span className={styles.spanCor}>cores:</span>
                <div className={styles.form_radio_container}>
                  {cores &&
                    cores.map((cor, i) => (
                      <div key={i} className={`${styles.colorInput}`}>
                        <label
                          onClick={(e) => {
                            handleCheckColor(e, i);
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
                <h3 className="subtitle">Tamanhos</h3>
                <div
                  onClick={(e) => {
                    handleCores(e);
                  }}
                  className={`${styles.sizes} ${
                    product.stock.sizeP.amount[0] ? '' : styles.emFalta
                  } ${!emFalta[0] && active === 'P' ? styles.active : ''}
                  ${emFalta[0] ? styles.emFalta : ''}
                  
                  `}
                >
                  <h4>P</h4>
                </div>
                <div
                  onClick={handleCores}
                  className={`${styles.sizes} ${
                    product.stock.sizeM.amount[0] ? '' : styles.emFalta
                  }${active === 'M' ? styles.active : ''}`}
                >
                  <h4>M</h4>
                </div>
                <div
                  onClick={handleCores}
                  className={`${styles.sizes} ${
                    product.stock.sizeG.amount[0] ? '' : styles.emFalta
                  }${active === 'G' ? styles.active : ''}`}
                >
                  <h4>G</h4>
                </div>
                <div
                  onClick={handleCores}
                  className={`${styles.sizes} ${
                    product.stock.sizeGG.amount[0] ? '' : styles.emFalta
                  }${active === 'GG' ? styles.active : ''}`}
                >
                  <h4>GG</h4>
                </div>
              </div>
              <div className={styles.adicionar}>
                <button
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
        {errorForm && <span className={`error animeRight`}>{errorForm}</span>}
      </div>
    </>
  );
};

export default ProdutoSingle;
