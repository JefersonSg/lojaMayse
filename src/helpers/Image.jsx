import React from 'react';
import styles from './Image.module.css';

const Image = ({ alt, src, src2 }) => {
  const [skeleton, setSkeleton] = React.useState(true);
  const [img2, setImg2] = React.useState(src2 && !src2.includes('undefined'));

  function handleLoad({ target }) {
    target.style.opacity = 1;
    setSkeleton(false);
  }

  return (
    <div className={`${styles.wrapperImg} ${img2 && styles.imgHover}`}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img} alt={alt} src={src} />
      {img2 ? (
        <img className={styles.imagem2} alt={alt} src={src2} />
      ) : (
        <img className={styles.imagem2} alt={alt} src={src} />
      )}
    </div>
  );
};

export default Image;
