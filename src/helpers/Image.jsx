import React from 'react';
import styles from './Image.module.css';

const Image = ({ alt, src, src2 }) => {
  const [skeleton, setSkeleton] = React.useState(true);
  const [img2, setImg2] = React.useState(src2 && !src2.includes('undefined'));
  const [loadImg2, setLoadImg2] = React.useState(false);

  function handleLoad({ target }) {
    target.style.opacity = 1;
    setSkeleton(false);
  }

  const [call, setCall] = React.useState(false);

  const tempo = Math.floor(Math.random() * 500 + 5);

  setTimeout(() => {
    setCall(true);
  }, tempo);

  return (
    <div
      className={`${styles.wrapperImg} ${loadImg2 && img2 && styles.imgHover}`}
    >
      {skeleton && <div className={styles.skeleton}></div>}
      {call && (
        <img onLoad={handleLoad} className={styles.img} alt={alt} src={src} />
      )}
      {img2 && img2 ? (
        <img
          onLoad={() => {
            setLoadImg2(true);
          }}
          className={styles.imagem2}
          alt={alt}
          src={src2}
        />
      ) : (
        <img className={styles.imagem2} alt={alt} src={src} />
      )}
    </div>
  );
};

export default Image;
