import React, { useEffect, useState } from 'react';
import Categoria from './Categoria';
import styles from './Categorias.module.css';
import Calcinha from '../../public/paginaInicial/Calcinhas.jpg';
import Sutiãns from '../../public/paginaInicial/sutians.jpg';
import CalcinhasBasicas from '../../public/paginaInicial/Calcinhas basicas.jpg';
import CalcinhasRenda from '../../public/paginaInicial/CalcinhasRenda.jpg';
import Acessorios from '../../public/paginaInicial/acessorios.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import './slides.css';

const Categorias = () => {
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

  return (
    <>
      <div className={`${styles.nav}`}>
        <h3 className="subtitle">Veja por categorias</h3>

        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={0}
          ref={slide}
          pagination={{ clickable: true }}
          width={width}
          style={{
            padding: '0 20px 30px 20px',
            boxSizing: 'border-box',
            zIndex: 0,
          }}
          navigation={navigate}
          className={styles.mySwaper}
        >
          <SwiperSlide className="swipers">
            <Categoria img={Calcinha} title="Calcinhas" />
          </SwiperSlide>
          <SwiperSlide>
            <Categoria img={Sutiãns} title="Sutiãns" />
          </SwiperSlide>
          <SwiperSlide>
            <Categoria img={CalcinhasBasicas} title="Calcinhas basicas" />
          </SwiperSlide>
          <SwiperSlide>
            <Categoria img={CalcinhasRenda} title="Calcinhas de renda" />
          </SwiperSlide>
          <SwiperSlide>
            <Categoria img={Acessorios} title="Acessorios" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Categorias;
