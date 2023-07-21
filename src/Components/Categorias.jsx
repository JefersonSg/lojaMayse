import React, { useEffect, useState } from 'react';
import Categoria from './Categoria';
import styles from './Categorias.module.css';
import useFetch from '../Hooks/useFetch';
import api from '../helpers/api';
import './slides.css';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Virtual, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

const Categorias = () => {
  const [categorias, setCategorias] = React.useState('');
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  const swiper = useSwiper();
  const [navigation, setNavigate] = React.useState(true);
  const [between, setBetween] = React.useState(150);

  // ajusta os itens
  useEffect(() => {
    function handleResize() {
      console.log(slides);
      if (window.innerWidth <= 800) {
        setNavigate(false);
        setBetween(50);
      } else {
        setNavigate(true);
        setBetween(100);
      }
    }
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  let slides;

  if (categorias) {
    slides = categorias.map((categoria, index) => categoria);
  }

  const url = `${api.getUri()}files/category/`;
  return (
    <>
      <div className={`${styles.nav}`}>
        <h3 className="subtitle">Veja por categorias</h3>

        <Swiper
          modules={[Navigation, Pagination, A11y, Virtual]}
          slidesPerView={3}
          spaceBetween={between}
          pagination={{ clickable: true }}
          navigation={navigation}
          virtual
        >
          {slides &&
            slides.map((categoria, index) => (
              <SwiperSlide
                onClick={() => navigate(`/produtos/categoria/${categoria._id}`)}
                key={categoria._id}
                virtualIndex={index}
              >
                <div className={styles.slides}>
                  <img src={`${url}${categoria.image}`} alt={categoria.image} />
                  <h3>{categoria.Category}</h3>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default Categorias;
