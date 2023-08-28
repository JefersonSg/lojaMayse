import React from 'react';
import Photos from '../loja/photo/Photos';
import styles from './ImageContainer.module.css';

const ImageContainer = ({ image, images, setFullSlide }) => {
  const [top, setTop] = React.useState(0);

  // Scroll
  React.useEffect(() => {
    function scrollFoto() {
      const scroll = Math.floor(window.scrollY);
      // HOME
      if (scroll) {
        console.log(top);
        return setTop((-scroll - 60) * 0.22);
      }
      return setTop(0);
    }
    scrollFoto();

    window.addEventListener('scroll', scrollFoto);
    return () => {
      window.removeEventListener('scroll', scrollFoto);
    };
  }, []);

  return (
    <section className={styles.ProductView_images} style={{ top: top }}>
      <Photos image1={image} imagesAll={images} setFullSlide={setFullSlide} />
    </section>
  );
};

export default ImageContainer;
