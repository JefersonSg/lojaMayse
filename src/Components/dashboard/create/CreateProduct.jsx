import React from 'react';
import Input from '../forms/Input';
import Button from '../forms/Button';
import useForm from '../../../Hooks/useForm';
import styles from './CreateProduct.module.css';
import useFetch from '../../../Hooks/useFetch';
import api from '../../../helpers/api';
import { useNavigate } from 'react-router-dom';

const CreateProduct = ({ productData }) => {
  const { data, error, loading, request } = useFetch();

  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const [errorForm, setErrorForm] = React.useState('');

  const navigate = useNavigate();
  const [images, setImages] = React.useState('');
  const [preview, setPreview] = React.useState([]);
  const [imagesProducts, setImagesProducts] = React.useState(
    productData || false,
  );

  const [coresInputs, setCoresInputs] = React.useState([1]);
  const [colorProduct, setColorProduct] = React.useState([1]);
  const [codeColor, setCodeColor] = React.useState([]);

  const [formP, setFormP] = React.useState(false);
  const [colorP, setColorP] = React.useState([]);
  const [amountP, setAmountP] = React.useState([]);

  const [formM, setFormM] = React.useState(false);
  const [colorM, setColorM] = React.useState([]);
  const [amountM, setAmountM] = React.useState([]);

  const [formG, setFormG] = React.useState(false);
  const [colorG, setColorG] = React.useState([]);
  const [amountG, setAmountG] = React.useState([]);

  const [formGG, setFormGG] = React.useState(false);
  const [colorGG, setColorGG] = React.useState([]);
  const [amountGG, setAmountGG] = React.useState([]);

  const [categorias, setCategorias] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');

  const name = useForm();
  const price = useForm();
  const brand = useForm();
  const sizeP = useForm();
  const sizeM = useForm();
  const sizeG = useForm();
  const sizeGG = useForm();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations
    if (!name.value) {
      setErrorForm('digite o nome do produto');
      return;
    }

    if (!price.value) {
      setErrorForm('digite o preço');
      return;
    }
    if (!brand.value) {
      setErrorForm('digite a marca');
      return;
    }
    if (!category) {
      setErrorForm('Selecione a categoria do Produto');
      return;
    }
    if (!description) {
      setErrorForm('digite a descricao do produto');
      return;
    }

    if (!sizeP.value && !sizeM.value && !sizeG.value && !sizeGG.value) {
      setErrorForm('informe os tamanhos disponiveis');
      return;
    }
    if (!colorProduct) {
      setErrorForm('informe as cores disponiveis');
      return;
    }
    if (
      !amountP.length &&
      !amountM.value &&
      !amountG.value &&
      !amountGG.value
    ) {
      setErrorForm(
        'informe a quantidade disponivel, seguindo a ordem de cores',
      );
      return;
    }
    if (!imagesProducts.images) {
      setErrorForm('Envie as imagens do produto');
      return;
    }

    // form Data
    const formData = new FormData();

    const productData = {
      name: name.value,
      price: price.value,
      brand: brand.value,
      category: category,
      description: description,

      colors: colorProduct,
      codeColors: codeColor,

      sizeP: sizeP.value,
      amountP: amountP,

      sizeM: sizeM.value,
      amountM: amountM,

      sizeG: sizeG.value,
      amountG: amountG,

      sizeGG: sizeGG.value,
      amountGG: amountGG,
    };

    await Object.keys(productData).forEach((key) =>
      formData.append(key, productData[key]),
    );
    if (imagesProducts.images) {
      imagesProducts.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    for (let i = 0; i < imagesProducts.images.length; i++) {
      const imagemAtual = imagesProducts.images[i].type;
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

    await request(`${api.getUri()}products/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Defina o corpo da solicitação como o objeto FormData
    })
      .then((response) => response.json)
      .then((json) => navigate(`/dashboard/produto/${json.newProduct._id}`));
  };

  function handleCLick(e) {
    const itemClicado = e.target.innerText;
    switch (itemClicado) {
      case 'P':
        setFormP(!formP);
        if (!formP) {
          sizeP.setValue('P');
        } else {
          sizeP.setValue('');
        }

        break;
      case 'M':
        setFormM(!formM);
        if (!formM) {
          sizeM.setValue('M');
        } else {
          sizeM.setValue('');
        }

        break;
      case 'G':
        setFormG(!formG);
        if (!formG) {
          sizeG.setValue('G');
        } else {
          sizeG.setValue('');
        }

        break;
      case 'GG':
        setFormGG(!formGG);
        if (!formGG) {
          sizeGG.setValue('GG');
        } else {
          sizeGG.setValue('');
        }

        break;

      default:
        break;
    }
  }

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setErrorForm(false);
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [errorForm]);

  function onFileChange(e) {
    setPreview(Array.from(e.target.files));
    setImagesProducts({ images: [...e.target.files] });
    setImages(e.target.files);
  }

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: 'center' }} className="title">
          Adicione seu produto
        </h1>

        <form
          className={'form'}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {error ? <p>{error}</p> : ''}
          <Input label="Nome do Produto" name="name" type="text" {...name} />
          <Input
            label="Preço"
            name="price"
            type="number"
            {...price}
            placeholder="ex: 49.90"
          />
          <Input
            label="Marca"
            name="brand"
            type="text"
            {...brand}
            placeholder="ex: Adidas"
          />
          <label htmlFor="categoria">Categoria</label>
          <select
            name="Categoria"
            id="categoria"
            value={category}
            onChange={({ target }) => setCategory(target.value)}
          >
            <option value="" style={{ display: 'none' }}>
              Escolha a categoria
            </option>
            {categorias &&
              categorias.map((categoria) => (
                <option value={categoria._id} key={categoria._id}>
                  {categoria.Category}
                </option>
              ))}
          </select>
          <label htmlFor="description">Descrição</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={styles.divColors}>
            <label htmlFor="">Cores Disponiveis</label>
            {coresInputs.map((i) => (
              <div key={i}>
                <Input
                  label={`cor ${i}`}
                  key={i}
                  type="text"
                  name="color"
                  placeholder="ex: azul..."
                  onChange={(e) => {
                    const newColors = [...colorProduct];
                    newColors[i - 1] = [e.target.value];
                    setColorProduct(newColors);
                  }}
                />
                <input
                  type="color"
                  name="cor"
                  onChange={(e) => {
                    e.preventDefault();
                    const codigoCoresP = [...codeColor];
                    codigoCoresP[i - 1] = [e.target.value];
                    setCodeColor(codigoCoresP);
                  }}
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
            <div className={styles.stocks}>
              <Input label="Tamanho P" type="hidden" name="size" {...sizeP} />
              <p>Digite a quantidade disponivel para cada cor </p>
              {coresInputs.map((cor, i) => (
                <div key={cor}>
                  <Input
                    label={`cor ${colorProduct[cor - 1]}`}
                    type="text"
                    name="colorAmountP"
                    onChange={(e) => {
                      const newAmountP = [...amountP];
                      newAmountP[cor - 1] = e.target.value;
                      setAmountP(newAmountP);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          {formM && (
            <div className={styles.stocks}>
              <Input label="Tamanho M" type="hidden" name="size" {...sizeM} />
              {coresInputs.map((cor) => (
                <div key={cor}>
                  <Input
                    label={`cor ${colorProduct[cor - 1]}`}
                    type="text"
                    name="colorAmountM"
                    onChange={(e) => {
                      const newAmountM = [...amountM];
                      newAmountM[cor - 1] = e.target.value;
                      setAmountM(newAmountM);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          {formG && (
            <div className={styles.stocks}>
              <Input label="Tamanho G" type="hidden" name="size" {...sizeG} />
              {coresInputs.map((cor) => (
                <div key={cor}>
                  <Input
                    label={`cor ${colorProduct[cor - 1]}`}
                    type="text"
                    name="colorAmountG"
                    onChange={(e) => {
                      const newAmountG = [...amountG];
                      newAmountG[cor - 1] = e.target.value;
                      setAmountG(newAmountG);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          {formGG && (
            <div className={styles.stocks}>
              <Input label="Tamanho GG" type="hidden" name="size" {...sizeGG} />
              {coresInputs.map((cor) => (
                <div key={cor}>
                  <Input
                    label={`cor ${colorProduct[cor - 1]}`}
                    type="text"
                    name="colorAmountGG"
                    onChange={(e) => {
                      const newAmountGG = [...amountGG];
                      newAmountGG[cor - 1] = e.target.value;
                      setAmountGG(newAmountGG);
                    }}
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
            <Button disabled>ENVIANDO...</Button>
          ) : (
            <Button>CRIAR</Button>
          )}{' '}
        </form>
        {errorForm && <span className={`error animeRight`}>{errorForm}</span>}
      </div>
    </>
  );
};

export default CreateProduct;
