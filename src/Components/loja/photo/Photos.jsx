import React, { useEffect } from 'react';
import styles from './Photo.module.css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Virtual, A11y, Thumbs } from 'swiper/modules';

import './swiperPhotos.css';
import SwiperCore from 'swiper';

// Helps
import ImageSingle from '../../../helpers/ImageSingle';

const Photos = ({ imagesAll, image1, setFullSlide }) => {
  const [imagePrincipal, setImagePrincipal] = React.useState(image1);
  const [mobile, setMobile] = React.useState(false);

  const [images, setImages] = React.useState(imagesAll);
  const [slideAtual, setSlideAtual] = React.useState(1);
  const [totalSlides, setTotalSlides] = React.useState(0);
  SwiperCore.use([Pagination]);
  const [larguraJanela, setLarguraJanela] = React.useState(
    document.documentElement.scrollWidth,
  );
  const swiperRef = React.useRef(null);

  const url = import.meta.env.VITE_APP_IMAGE_URL;

  React.useState(() => {
    function handleResize() {
      if (window.innerWidth <= 700) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const slides = swiperRef.current
      ? swiperRef.current.querySelectorAll('.swiper-slide')
      : [1];

    setTotalSlides(slides.length);
  }, []);

  // resize
  useEffect(() => {
    let medidaAnterior = document.documentElement.scrollWidth;
    const handleResize = () => {
      let medidaAtual = document.documentElement.scrollWidth;
      if (medidaAnterior > medidaAtual) {
        return setLarguraJanela(document.documentElement.scrollWidth - 1);
      }
      return setLarguraJanela(document.documentElement.scrollWidth);
    };

    window.addEventListener('resize', handleResize);

    // Remover o event listener quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSlideChange = (swiper) => {
    setSlideAtual(`${swiper.realIndex + 1}`);
    setTotalSlides(swiper.slides.length);
    setImagePrincipal(imagesAll[swiper.realIndex]);
  };

  return (
    <>
      {mobile ? (
        <>
          <Swiper
            className="swiperPhotos"
            modules={[Navigation, Pagination, A11y, Virtual, Thumbs]}
            ref={swiperRef}
            slidesPerView={1}
            spaceBetween={50}
            loop={true}
            style={{ width: larguraJanela }}
            watchSlidesProgress
            onSlideChange={handleSlideChange}
            onClick={() => {
              setFullSlide(imagePrincipal);
            }}
          >
            {imagesAll &&
              imagesAll.map((imagem, index) => (
                <SwiperSlide key={imagem} virtualIndex={index}>
                  <div className={styles.slides}>
                    <ImageSingle
                      src={`${url}${imagem}`}
                      alt={'Fotos do produto'}
                    />
                  </div>
                </SwiperSlide>
              ))}
            {slideAtual ? (
              <span className={styles.totalSlides}>
                {slideAtual}/{swiperRef.current ? totalSlides : 0}
              </span>
            ) : (
              <></>
            )}
          </Swiper>
        </>
      ) : (
        <>
          <div className={styles.imagens}>
            <div className={styles.miniImages}>
              {images.map((imagem, i) => (
                <div
                  onClick={(e) => setImagePrincipal(imagem)}
                  key={imagem + i}
                  className={`${
                    imagem === imagePrincipal ? styles.active : ''
                  } ${styles.miniImagensDiv}`}
                >
                  <ImageSingle
                    key={`${imagem + i}2`}
                    src={url + imagem}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div
              className={styles.imagemPrincipal}
              onClick={() => {
                setFullSlide(imagePrincipal);
              }}
            >
              <ImageSingle src={url + imagePrincipal} alt="" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Photos;
