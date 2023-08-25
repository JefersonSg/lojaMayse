import React, { useEffect, useState } from 'react';
import Categoria from './Categoria';
import styles from './Categorias.module.css';
import useFetch from '../../Hooks/useFetch';
import api from '../../helpers/api';
import './../slides.css';

import { useNavigate } from 'react-router-dom';
import ImageCategory from '../../helpers/ImageCategory';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Virtual, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Categorias = () => {
  const [categorias, setCategorias] = React.useState('');
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  const [navigation, setNavigate] = React.useState(true);
  const [between, setBetween] = React.useState(150);
  const [slidesPerView, setSlidesPerView] = React.useState(5);

  // ajusta os itens
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 800 && data && data.categorys.length > 5) {
        setNavigate(true);
        setBetween(32);
        setSlidesPerView(5);
      } else if (window.innerWidth <= 800 && window.innerWidth >= 561) {
        setNavigate(false);
        setBetween(120);
        setSlidesPerView(3);
      } else if (window.innerWidth < 561) {
        setNavigate(false);
        setBetween(50);
        setSlidesPerView(3);
      } else {
        setNavigate(false);
        setBetween(32);
        setSlidesPerView(5);
      }
    }
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

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

  return (
    <>
      <div className={`${styles.nav}`}>
        <h3 className="subtitle">Veja por categorias</h3>

        <Swiper
          className="swiperCategory"
          modules={[Navigation, Pagination, A11y, Virtual]}
          slidesPerView={slidesPerView}
          spaceBetween={between}
          pagination={{ clickable: true }}
          navigation={navigation}
        >
          {categorias &&
            categorias.map((categoria, index) => (
              <SwiperSlide
                className="swiperSlide-category"
                onClick={() => navigate(`/produtos/categoria/${categoria._id}`)}
                key={categoria._id}
              >
                <div className={styles.slides}>
                  <ImageCategory
                    src={`${url}${categoria.image}`}
                    alt={categoria.image}
                  />
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
