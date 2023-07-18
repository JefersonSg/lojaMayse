import React, { useEffect } from 'react';
import useFetch from '../../Hooks/useFetch';
import styles from './ProdutoSingle.module.css';
import Button from '../forms/Button';
import { useParams, useNavigate } from 'react-router-dom';
import Photos from '../photo/Photos';
import api from '../../helpers/api';
import { color } from 'framer-motion';
import BreadCrumbs from './Breadcrumbs';
import Infos from '../dashboard/Infos';
import Header from '../../Header';

const ProdutoSingle = () => {
  const [product, setProduct] = React.useState('');
  const { data, request, error, loading } = useFetch();
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const [image, setImage] = React.useState('');
  const [images, setImages] = React.useState('');
  const params = useParams();

  // Botão de adição
  const [quantidade, setQuantidade] = React.useState(1);
  const [addBag, setAddBag] = React.useState(1);

  const [active, setActive] = React.useState('');

  // Seletor de cores
  const [cores, setCores] = React.useState('');
  const [codes, setCodes] = React.useState('');
  const [corOn, setCorOn] = React.useState([]);
  const [colorActive, setColorActive] = React.useState('');

  // FORM BAG
  const [colorSelected, setColorSelected] = React.useState(null);

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
    setActive(letra);
    const amounts = product.stock[tamanho].amount;

    let coresOn = [];
    for (let i = 0; i < amounts.length; i++) {
      const compare = +amounts[i] > 0;
      coresOn[i] = compare;
    }
    setCorOn(coresOn);
  }

  function selectColor(e) {
    const color = e.target.getAttribute('value');
    setColorActive(color);
    setColorSelected(e.target.value);
  }
  return (
    <>
      <Infos />
      <Header />
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
                      <div key={i} className={styles.colorInput}>
                        <label
                          className={colorSelected === cor ? styles.active : ''}
                        >
                          {cor}
                          <span
                            className={styles.spanColor}
                            style={{ backgroundColor: `${codes[i]}` }}
                          ></span>
                          <input
                            type="radio"
                            name="selectColor"
                            value={cor}
                            id={`cor${i}`}
                            onChange={selectColor}
                            className={`${styles.cores} ${styles.formRadio} ${
                              colorActive === cor && corOn[i]
                                ? styles.active
                                : ''
                            } ${!corOn[i] ? styles.corOff : ''}`}
                            key={cor + i}
                          />
                        </label>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.estoque}>
                <h3>Tamanhos</h3>
                <div
                  onClick={handleCores}
                  className={`${styles.sizes} ${
                    product.stock.sizeP.amount[0] ? '' : styles.emFalta
                  } ${active === 'P' ? styles.active : ''}`}
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
                <button className={styles.addBag}>ADICIONAR AO CARRINHO</button>
              </div>
              <div className={styles.descricao}>
                <p>DESCRICAO</p>
                <span className={styles.descricaoTexto}>{product.model}</span>
              </div>
            </section>
          </main>
        )}
      </div>
    </>
  );
};

export default ProdutoSingle;
