import React from 'react';
import styles from './ImageCategory.module.css';

const ImageCategory = ({ alt, ...props }) => {
  const [skeleton, setSkeleton] = React.useState(true);

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
    <div className={styles.wrapperImg}>
      {skeleton && <div className={styles.skeleton}></div>}
      {call && (
        <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
      )}
    </div>
  );
};

export default ImageCategory;
