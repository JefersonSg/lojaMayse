import React from 'react';
import styles from './Photo.module.css';
import api from '../../helpers/api';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Virtual, A11y, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiperPhotos.css';
import ImageSingle from '../../helpers/ImageSingle';

const Photos = ({ imagesAll, image1 }) => {
  const [imagePrincipal, setImagePrincipal] = React.useState(image1);
  const [mobile, setMobile] = React.useState(false);

  const [images, setImages] = React.useState(imagesAll);
  const [slideAtual, setSlideAtual] = React.useState(1);
  const [totalSlides, setTotalSlides] = React.useState(0);

  const url = import.meta.env.VITE_APP_IMAGE_URL;
  React.useEffect(() => {
    if (window.innerWidth >= 560) {
      setMobile(false);
      return;
    }
    return setMobile(true);
  }, []);

  React.useState(() => {
    function handleResize() {
      if (window.innerWidth <= 560) {
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
  const handleSlideChange = (swiper) => {
    setSlideAtual(`${swiper.realIndex + 1}`);
    setTotalSlides(swiper.slides.length);
  };

  return (
    <>
      {mobile ? (
        <>
          <Swiper
            className="swiperPhotos"
            modules={[Navigation, Pagination, A11y, Virtual, Thumbs]}
            slidesPerView={1}
            loop={true}
            thumbs={true}
            watchSlidesProgress
            onSlideChange={handleSlideChange}
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
                {slideAtual}/{totalSlides}
              </span>
            ) : (
              <></>
            )}
          </Swiper>
        </>
      ) : (
        <div>
          <div className={styles.imagens}>
            <div className={styles.miniImages}>
              {images.map((imagem, i) => (
                <div
                  onClick={(e) => setImagePrincipal(imagem)}
                  key={imagem + i}
                  className={`${
                    imagem === imagePrincipal ? styles.active : ''
                  }`}
                >
                  <ImageSingle
                    key={`${imagem + i}2`}
                    src={url + imagem}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className={styles.imagemPrincipal}>
              <ImageSingle src={url + imagePrincipal} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Photos;
