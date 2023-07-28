import React from 'react';
import styles from './ImageSingle.module.css';

const ImageSingle = ({ alt, ...props }) => {
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad({ target }) {
    target.style.opacity = 1;
    setSkeleton(false);
  }
  return (
    <div className={styles.wrapperImg}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
    </div>
  );
};

export default ImageSingle;
