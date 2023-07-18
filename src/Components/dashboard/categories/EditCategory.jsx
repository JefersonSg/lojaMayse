import React from 'react';
import useFetch from '../../../Hooks/useFetch';
import api from '../../../helpers/api';
import Input from '../forms/Input';
import useForm from '../../../Hooks/useForm';
import Button from '../forms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CreateCategory.module.css';

const CreateCategory = () => {
  const [categorias, setCategorias] = React.useState('');
  const { data, error, loading, request } = useFetch();
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const [formOn, setformOn] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const [image, setImage] = React.useState(false);
  const category = useForm();
  const navigate = useNavigate();

  const params = useParams();

  React.useEffect(() => {
    async function getCategory() {
      const id = params['id'];
      const response = await request(`${api.getUri()}categorys/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorias(response.json.category);
      setPreview(false);
      setImage(response.json.category.image);
    }
    getCategory();
  }, [request, token, params]);
  function onFileChange(e) {
    setPreview(Array.from(e.target.files));
    setImage({ image: [...e.target.files] });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Category', categorias.Category);
    if (image.image) {
      formData.append('image', image.image[0]);
    }

    await api
      .patch(`http://localhost:5000/categorys/${params['id']}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => navigate('/dashboard/categorias'));
  }
  const url = 'http://localhost:5000/files/category/';
  return (
    <section className="container">
      <>
        {image && !preview && (
          <div className={styles.category}>
            <img src={`${url}${image}`} />
            <h2>{categorias.Category}</h2>
          </div>
        )}{' '}
        {preview && (
          <div className={styles.category}>
            <img src={URL.createObjectURL(preview[0])} />
            <h2>{categorias.Category}</h2>
          </div>
        )}
        <form onSubmit={handleSubmit} className="form">
          <Input
            label="Categoria"
            name="Category"
            type="text"
            value={categorias.Category || ''}
            onChange={(e) => {
              setCategorias({ ...categorias, [e.target.id]: e.target.value });
            }}
          />
          <input type="file" name="image" id="image" onChange={onFileChange} />
          <Button onClick={(e) => navigate('/dashboard/categorias')}>
            Voltar
          </Button>
          <button className="ButtonCriar">Concluir Edição</button>
        </form>
      </>
    </section>
  );
};

export default CreateCategory;
