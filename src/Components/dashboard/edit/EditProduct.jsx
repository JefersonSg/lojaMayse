import React from 'react';
import styles from './EditProduct.module.css';
import Input from '../forms/Input';
import Button from '../forms/Button';
import useFetch from '../../../Hooks/useFetch';
import useForm from '../../../Hooks/useForm';
import { useParams, useNavigate } from 'react-router-dom';
import Photos from '../photo/Photos';
import api from '../../../helpers/api';

const EditProduct = () => {
  const [product, setProduct] = React.useState('');
  const { data, error, loading, request } = useFetch();
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const [errorForm, setErrorForm] = React.useState('');
  const navigate = useNavigate();
  0;
  const [imagesProducts, setImagesProducts] = React.useState(null);
  const [imagePrincipal, setImagePrincipal] = React.useState(null);
  const params = useParams();

  const [coresInputs, setCoresInputs] = React.useState([1]);

  const [formP, setFormP] = React.useState(false);
  const [formM, setFormM] = React.useState(false);
  const [formG, setFormG] = React.useState(false);
  const [formGG, setFormGG] = React.useState(false);

  const [categorias, setCategorias] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');

  const sizeP = useForm();
  const sizeM = useForm();
  const sizeG = useForm();
  const sizeGG = useForm();

  function setForms({ json }) {
    setTimeout(() => {
      if (json) {
        setFormP(json.product.stock.sizeP.amount[0] ? true : false);

        setFormM(json.product.stock.sizeM.amount[0] ? true : false);

        setFormG(json.product.stock.sizeG.amount[0] ? true : false);

        setFormGG(json.product.stock.sizeGG.amount[0] ? true : false);
        setCoresInputs(json.product.colors);
      }
    }, 200);
  }
  React.useEffect(() => {
    async function produtoId() {
      const data = await request(`${api.getUri()}products/${params['id']}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(data.json.product);
      setImagePrincipal(data.json.product.images[0]);
      await setForms(data);
    }
    produtoId();
  }, [request, token, params]);

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setErrorForm(false);
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [errorForm]);

  function handleCLick(e) {
    const itemClicado = e.target.innerText;
    switch (itemClicado) {
      case 'P':
        setFormP(!formP);

        break;
      case 'M':
        setFormM(!formM);

        break;
      case 'G':
        setFormG(!formG);

        break;
      case 'GG':
        setFormGG(!formGG);

        break;

      default:
        break;
    }
  }

  function handleChange(e) {
    setProduct({ ...product, [e.target.id]: e.target.value });
  }
  function handleStockChange(e, index) {
    let size;
    const produto = { ...product };
    if (e.target.type === 'text') {
      produto.colors[index] = e.target.value;
      setProduct(produto);
    } else if (e.target.type === 'number') {
      let itemAtivo =
        e.target.parentElement.parentElement.parentElement.className.split(
          ' ',
        )[1];
      produto.stock[itemAtivo].amount[index] = e.target.value;
      setProduct(produto);
    } else {
      produto.codeColors[index] = e.target.value;
      setProduct(produto);
    }
  }
  function onFileChange(e) {
    setProduct({ ...product, ['images']: e.target.files });
    setImagesProducts(Array.from(e.target.files));
    // setImagePrincipal(imagesProducts);
    setImagePrincipal(e.target.files[0]);
    window.scrollTo(0, 0);
  }
  // console.log(imagePrincipal);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations
    if (!product.name) {
      setErrorForm('digite o nome do produto');
      return;
    }

    if (!product.price) {
      setErrorForm('digite o preço');
      return;
    }
    if (!product.brand) {
      setErrorForm('digite a marca');
      return;
    }
    if (!product.category) {
      setErrorForm('selecione a categoria do produto');
      return;
    }
    if (!product.description) {
      setErrorForm('digite a descrição do produto');
      return;
    }

    if (!product.colors) {
      setErrorForm('informe todas as cores disponiveis neste tamanho');
      return;
    }
    if (
      !product.stock.sizeP.amount &&
      !product.stock.sizeP.amount &&
      !product.stock.sizeP.amount &&
      !product.stock.sizeP.amount
    ) {
      setErrorForm(
        'informe a quantidade disponivel, seguindo a ordem de cores',
      );
      return;
    }
    if (!imagesProducts && !product.images) {
      setErrorForm('Envie as imagens do produto');
      return;
    }

    // form Data
    const formData = new FormData();

    const productData = {
      name: product.name,
      price: product.price,
      brand: product.brand,
      category: product.category,
      description: product.description,
      colors: product.colors,
      codeColors: product.codeColors,

      amountP: [product.stock.sizeP.amount],

      amountM: [product.stock.sizeM.amount],

      amountG: [product.stock.sizeG.amount],

      amountGG: [product.stock.sizeGG.amount],
    };

    await Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });
    if (imagesProducts) {
      for (let i = 0; i < imagesProducts.length; i++) {
        const imagemAtual = imagesProducts[i].type;
        if (
          imagemAtual !== 'image/jpeg' &&
          imagemAtual !== 'image/jpg' &&
          imagemAtual !== 'image/png'
        ) {
          setErrorForm(
            'Envie apenas arquivos de imagens no formato PNG, JPG ou JPEG',
          );
          return;
        }
      }
    }

    const data = await api
      .patch(`products/edit/${product._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        navigate(`/dashboard/produto/${product._id}`);
        return response.data;
      })
      .catch((err) => {
        setErrorForm('Ocorreu algum erro no envio');
        console.log(err.response.data);
      });
  };
  React.useEffect(() => {
    async function getCategory() {
      const response = await request(`${api.getUri()}categorys/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorias(response.json.categorys);
    }
    getCategory();
  }, [request, token]);
  const url = import.meta.env.VITE_APP_IMAGE_URL;

  console.log(url);

  return (
    <div className="container">
      <h1>Edite o produto</h1>
      {product && !imagesProducts && (
        <div>
          <div className={styles.imagens}>
            <div className={styles.miniImages}>
              {product.images.map((imagem, i) => (
                <div
                  onClick={(e) => setImagePrincipal(imagem)}
                  key={imagem + i}
                  className={`${
                    imagem === imagePrincipal ? styles.active : ''
                  }`}
                >
                  <img key={`${imagem + i}2`} src={`${url}${imagem}`} alt="" />
                </div>
              ))}
            </div>
            <div className={styles.imagemPrincipal}>
              <img src={`${url}${imagePrincipal}`} alt="" />
            </div>
          </div>
        </div>
      )}
      {imagesProducts && (
        <div>
          <div className={styles.imagens}>
            <div className={styles.miniImages}>
              {imagesProducts.map((imagem, i) => (
                <div
                  onClick={(e) => {
                    setImagePrincipal(imagem);
                  }}
                  key={imagem + i}
                  className={`${
                    imagem === imagePrincipal ? styles.active : ''
                  }`}
                >
                  <img
                    key={`${imagem + i}2`}
                    src={imagesProducts ? URL.createObjectURL(imagem) : ''}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className={styles.imagemPrincipal}>
              <img
                src={imagePrincipal ? URL.createObjectURL(imagePrincipal) : ''}
                alt=""
              />
            </div>
          </div>
        </div>
      )}

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {error ? <p>{error}</p> : ''}
        <Input
          label="Nome do Produto"
          name="name"
          type="text"
          value={product ? product.name : ''}
          onChange={handleChange}
        />

        <Input
          label="Preço"
          name="price"
          type="number"
          value={product.price || ''}
          onChange={handleChange}
          placeholder="ex: 49.90"
        />
        <Input
          label="Marca"
          name="brand"
          type="text"
          onChange={handleChange}
          value={product.brand || ''}
          placeholder="ex: Adidas"
        />
        <label htmlFor="categoria">Categoria</label>

        <select
          name="Categoria"
          id="category"
          value={product.category}
          onChange={({ target }) =>
            setProduct({ ...product, [target.id]: target.value })
          }
        >
          <option
            value=""
            selected
            disabled
            style={{ display: 'none' }}
          ></option>
          {categorias &&
            categorias.map((categoria) => (
              <option value={categoria._id} key={categoria._id}>
                {categoria.Category}
              </option>
            ))}
        </select>

        <div className={styles.divColors}>
          <label htmlFor="">Cores Disponiveis</label>
          {product.colors &&
            coresInputs.map((cor, i) => (
              <div key={i}>
                <Input
                  label={`cor ${i + 1}`}
                  type="text"
                  name="color"
                  placeholder="ex: azul..."
                  value={product.colors ? product.colors[i] : ''}
                  onChange={(e) => handleStockChange(e, i)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      e.preventDefault();
                    }
                  }}
                />
                <input
                  type="color"
                  name="codes"
                  id="codes"
                  value={product.codeColors ? product.codeColors[i] : ''}
                  onChange={(e) => handleStockChange(e, i)}
                />
              </div>
            ))}
          <div className={styles.botoes}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCoresInputs([...coresInputs, coresInputs.length + 1]);
              }}
            >
              Nova Cor
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                if (coresInputs.length > 1) {
                  const removecor = coresInputs.filter(
                    (index) => index != coresInputs.length,
                  );
                  setCoresInputs(removecor);
                }
              }}
            >
              Remover cor
            </button>
          </div>
        </div>

        <label htmlFor="description">Descrição</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="4"
          value={product.description || ''}
          onChange={handleChange}
        />
        <label htmlFor="Estoque">Informações de Estoque</label>
        <div className={styles.radios}>
          <ul className={styles.checks}>
            <li
              onClick={handleCLick}
              className={`${formP ? styles.active : ''}`}
            >
              P
            </li>
            <li
              onClick={handleCLick}
              className={`${formM ? styles.active : ''}`}
            >
              M
            </li>
            <li
              onClick={handleCLick}
              className={`${formG ? styles.active : ''}`}
            >
              G
            </li>
            <li
              onClick={handleCLick}
              className={`${formGG ? styles.active : ''}`}
            >
              GG
            </li>
          </ul>
        </div>
        {formP && (
          <div className={`${styles.stocks} sizeP`}>
            <Input label="Tamanho P" type="hidden" name="size" {...sizeP} />
            <p>Digite a quantidade disponivel para cada cor </p>
            {coresInputs.map((cor, i) => (
              <div key={cor}>
                <Input
                  label={`cor ${product.colors[i]}`}
                  type="number"
                  name="colorAmountP"
                  value={product.stock.sizeP.amount[i]}
                  onChange={(e) => handleStockChange(e, i)}
                />
              </div>
            ))}
          </div>
        )}
        {formM && (
          <div className={`${styles.stocks} sizeM`}>
            <Input label="Tamanho M" type="hidden" name="size" {...sizeM} />
            <p>Digite a quantidade disponivel para cada cor </p>
            {coresInputs.map((cor, i) => (
              <div key={cor}>
                <Input
                  label={`cor ${product.colors[i]}`}
                  type="number"
                  name="colorAmountM"
                  value={product.stock.sizeM.amount[i]}
                  onChange={(e) => handleStockChange(e, i)}
                />
              </div>
            ))}
          </div>
        )}
        {formG && (
          <div className={`${styles.stocks} sizeG`}>
            <Input label="Tamanho G" type="hidden" name="size" {...sizeG} />
            <p>Digite a quantidade disponivel para cada cor </p>
            {coresInputs.map((cor, i) => (
              <div key={cor}>
                <Input
                  label={`cor ${product.colors[i]}`}
                  type="number"
                  name="colorAmountG"
                  value={product.stock.sizeG.amount[i]}
                  onChange={(e) => handleStockChange(e, i)}
                />
              </div>
            ))}
          </div>
        )}
        {formGG && (
          <div className={`${styles.stocks} sizeGG`}>
            <Input label="Tamanho GG" type="hidden" name="size" {...sizeGG} />
            <p>Digite a quantidade disponivel para cada cor </p>
            {coresInputs.map((cor, i) => (
              <div key={cor}>
                <Input
                  label={`cor ${product.colors[i]}`}
                  type="number"
                  name="colorAmountGG"
                  value={product.stock.sizeGG.amount[i]}
                  onChange={(e) => handleStockChange(e, i)}
                />
              </div>
            ))}
          </div>
        )}
        <Input
          type="file"
          name="images"
          label="envie sua imagem"
          miltiple
          onChange={onFileChange}
        />
        {loading ? (
          <div className={styles.botoes}>
            <Button disabled>ENVIANDO...</Button>
            <Button disabled>VOLTAR...</Button>
          </div>
        ) : (
          <div className={styles.botoes}>
            <Button>CONFIRMAR</Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/produto/${product._id}`);
              }}
            >
              VOLTAR
            </Button>
          </div>
        )}
      </form>
      {errorForm && <span className={`error animeRight`}>{errorForm}</span>}
    </div>
  );
};

export default EditProduct;
