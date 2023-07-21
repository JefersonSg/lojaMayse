import React from 'react';
import useFetch from '../../../Hooks/useFetch';
import api from '../../../helpers/api';
import Input from '../forms/Input';
import useForm from '../../../Hooks/useForm';
import Button from '../forms/Button';
import { useNavigate } from 'react-router-dom';
import styles from './CreateCategory.module.css';

const CreateCategory = () => {
  const [categorias, setCategorias] = React.useState('');
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const { data, error, loading, request } = useFetch();
  const [formOn, setformOn] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const [image, setImage] = React.useState(false);
  const [errorForm, setErrorForm] = React.useState('');

  const category = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setErrorForm(false);
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [errorForm]);

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

  function onFileChange(e) {
    setPreview(Array.from(e.target.files));
    setImage({ image: [...e.target.files] });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Category', category.value);
    console.log(category);
    if (!category.value) {
      setErrorForm('Informe o nome da categoria');
      return;
    }
    if (!image.image) {
      setErrorForm('Envie a imagem da categoria');
      return;
    }

    if (
      image.image[0].type !== 'image/jpeg' &&
      image.image[0].type !== 'image/jpg' &&
      image.image[0].type !== 'image/png'
    ) {
      setErrorForm(
        'Envie apenas arquivos de imagens no formato PNG, JPG ou JPEG',
      );
      return;
    }
    formData.append('image', image.image[0]);

    setformOn(!formOn);
    category.setValue('');
    setImage('');
    setPreview('');
    const response = await request('http://localhost:5000/categorys/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Defina o corpo da solicitação como o objeto FormData
    }).then((response) => response.json);

    async function getCategory() {
      const response = await request(`${api.getUri()}categorys/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorias(response.json.categorys);
    }
    getCategory();
  }
  const url = `${api.getUri()}files/category/`;

  return (
    <section className="container">
      <p className="ButtonCriar" onClick={() => setformOn(!formOn)}>
        {formOn ? 'Cancelar' : 'Criar nova Categoria'}
      </p>

      {formOn && (
        <>
          {preview && (
            <div className={styles.category}>
              <img src={URL.createObjectURL(preview[0])} />
              <h2>{category.value}</h2>
            </div>
          )}
          <form onSubmit={handleSubmit} className="form">
            <Input
              label="Categoria"
              name="category"
              type="text"
              {...category}
            />
            <input
              type="file"
              name="image"
              id="image"
              onChange={onFileChange}
            />
            <Button>Criar</Button>
          </form>
        </>
      )}
      <div className={styles.categorias}>
        {categorias &&
          categorias.map((categoria, i) => (
            <div key={i}>
              <div className={styles.categorys}>
                <img src={`${url}${categoria.image}`} alt="" />
              </div>
              <h3>{categoria.Category}</h3>
              <div className={styles.botoes}>
                <Button
                  onClick={async (e) => {
                    e.preventDefault();

                    await api.delete(`/categorys/${categoria._id}`, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });

                    async function getCategory() {
                      const response = await request(
                        `${api.getUri()}categorys/`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        },
                      );
                      setCategorias(response.json.categorys);
                    }
                    getCategory();
                  }}
                >
                  Deletar
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/dashboard/categorias/${categoria._id}`);
                  }}
                >
                  Editar
                </Button>
              </div>
            </div>
          ))}
      </div>
      {errorForm && <span className={`error animeRight`}>{errorForm}</span>}
    </section>
  );
};

export default CreateCategory;
