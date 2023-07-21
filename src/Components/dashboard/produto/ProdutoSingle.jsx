import React, { useEffect } from 'react';
import useFetch from '../../../Hooks/useFetch';
import styles from './ProdutoSingle.module.css';
import Button from '../forms/Button';
import { useParams, useNavigate } from 'react-router-dom';
import Photos from '../photo/Photos';
import api from '../../../helpers/api';

const ProdutoSingle = () => {
  const [product, setProduct] = React.useState('');
  const [modalDelete, setModalDelete] = React.useState(false);
  const { data, request, error, loading } = useFetch();
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const [image, setImage] = React.useState('');
  const [images, setImages] = React.useState('');
  const params = useParams();
  const [active, setActive] = React.useState('');
  const [cores, setCores] = React.useState('');
  const [corOn, setCorOn] = React.useState([]);
  const [codes, setCodes] = React.useState('');
  const [colorActive, setColorActive] = React.useState('');

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
    }
    produtoId();
  }, [params, request, token]);

  // React.useEffect(() => {
  //   if (product) {
  //     if (product.stock.sizeP.amount) {
  //       setActive('P');
  //       setCores(product.stock.sizeP.color);
  //       setCodes(product.stock.sizeP.codes);
  //       return;
  //     }

  //     if (product.stock.sizeM.amount) {
  //       setActive('M');
  //       setCores(product.stock.sizeM.color);
  //       setCodes(product.stock.sizeM.codes);
  //       return;
  //     }
  //     if (product.stock.sizeG.amount) {
  //       setActive('G');
  //       setCores(product.stock.sizeG.color);
  //       setCodes(product.stock.sizeG.codes);
  //       return;
  //     }
  //     if (product.stock.sizeGG.amount) {
  //       setActive('GG');
  //       setCores(product.stock.sizeGG.color);
  //       setCodes(product.stock.sizeGG.codes);
  //       return;
  //     } else {
  //       setActive('');
  //       return setCores('');
  //     }
  //   }
  // }, [product]);

  const navigate = useNavigate();

  function handleCores(e) {
    const tamanho = 'size' + e.target.innerText;
    const letra = e.target.innerText;
    setActive(letra);
    const amounts = product.stock[tamanho].amount;

    let coresOn = [];
    amounts.forEach((amount, i) => {
      const compare = +amount > 0;
      coresOn[i] = compare;
    });
    console.log(coresOn);
    setCorOn(coresOn);
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
    setColorActive(color);
  }
  return (
    <>
      <div className="container">
        <h1>Produto: {product.name ? product.name : 'Não encontrado'}</h1>
        <div className={styles.informacoes}>
          {product.images && (
            <div>
              <div className={styles.gridPhoto}>
                <Photos image1={image} imagesAll={images} />
                <div className={styles.infos}>
                  <span className={styles.brand}>{product.brand}</span>
                  <p className={styles.name}>{product.name}</p>
                  <span className={styles.price}>
                    R$ {product.price.toLocaleString('pt-Br')}
                  </span>

                  <div className={styles.colors}>
                    <span>cores:</span>
                    <div className={styles.coresDiv}>
                      {cores &&
                        cores.map((cor, i) => (
                          <div
                            value={cor}
                            id={`cor${i}`}
                            onClick={selectColor}
                            style={{ background: `${codes[i]}` }}
                            className={`${styles.cores} ${
                              colorActive === cor && corOn[i]
                                ? styles.active
                                : ''
                            } ${!corOn[i] ? styles.corOff : ''}`}
                            key={cor + i}
                          ></div>
                        ))}
                    </div>
                  </div>
                  <div className={styles.estoque}>
                    <h3>Tamanhos</h3>
                    <div
                      onClick={handleCores}
                      className={`${styles.sizes} ${
                        product.stock && product.stock.sizeP.amount[0]
                          ? ''
                          : styles.emFalta
                      } ${active === 'P' ? styles.active : ''}`}
                    >
                      <h4>P</h4>
                    </div>
                    <div
                      onClick={handleCores}
                      className={`${styles.sizes} ${
                        product.stock && product.stock.sizeM.amount[0]
                          ? ''
                          : styles.emFalta
                      }${active === 'M' ? styles.active : ''}`}
                    >
                      <h4>M</h4>
                    </div>
                    <div
                      onClick={handleCores}
                      className={`${styles.sizes} ${
                        product.stock && product.stock.sizeG.amount[0]
                          ? ''
                          : styles.emFalta
                      }${active === 'G' ? styles.active : ''}`}
                    >
                      <h4>G</h4>
                    </div>
                    <div
                      onClick={handleCores}
                      className={`${styles.sizes} ${
                        product.stock && product.stock.sizeGG.amount[0]
                          ? ''
                          : styles.emFalta
                      }${active === 'GG' ? styles.active : ''}`}
                    >
                      <h4>GG</h4>
                    </div>
                  </div>

                  <div className={styles.descricao}>
                    <p>DESCRIÇÃO</p>
                    <span className={styles.descricaoTexto}>
                      {product.description}
                    </span>
                  </div>
                </div>
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
      </div>
    </>
  );
};

export default ProdutoSingle;
