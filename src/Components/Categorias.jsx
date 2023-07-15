import React, { useEffect, useState } from 'react';
import Categoria from './Categoria';
import styles from './Categorias.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import './slides.css';
import useFetch from '../Hooks/useFetch';
import api from '../helpers/api';

const Categorias = () => {
  const [categorias, setCategorias] = React.useState('');
  const [token] = React.useState(window.localStorage.getItem('token') || '');
  const { data, error, loading, request } = useFetch();

  const [slidesPerView, setSlidePerView] = useState(2);
  const [width, setWidth] = useState(600);
  const [navigate, setNavigate] = useState(true);
  const slide = React.useRef();

  // ajusta os itens
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800 && window.innerWidth > 600) {
        setNavigate(true);
        setSlidePerView(3);
        setWidth(500);
      } else if (window.innerWidth <= 600 && window.innerWidth > 380) {
        setNavigate(false);
        setSlidePerView(3);
        setWidth(340);
      } else if (window.innerWidth <= 380) {
        setNavigate(false);
        setSlidePerView(3);
        setWidth(300);
      } else {
        setNavigate(true);
        setSlidePerView(3);
        setWidth(800);
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

  return (
    <>
      <div className={`${styles.nav}`}>
        <h3 className="subtitle">Veja por categorias</h3>

        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={0}
          ref={slide}
          pagination={{ clickable: true }}
          width={600}
          style={{
            padding: '0 20px 30px 20px',
            boxSizing: 'border-box',
            zIndex: 0,
          }}
          navigation={navigate}
          className={styles.mySwaper}
        >
          {categorias &&
            categorias.map((categoria) => (
              <SwiperSlide key={categoria._id}>
                <Categoria
                  img={categoria.image}
                  link={categoria._id}
                  title={categoria.Category}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default Categorias;
