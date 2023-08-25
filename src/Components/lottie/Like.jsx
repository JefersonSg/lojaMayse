import React from 'react';
import Lottie from 'react-lottie';
import Likes from '../../assets/lottie/Like.json';
import styles from './Likes.module.css';

const Like = () => {
  const [favoritos, setNewFavorito] = React.useState(
    localStorage.getItem('favoritos')
      ? JSON.parse(localStorage.getItem('favoritos'))
      : false,
  );

  const animation = Likes;
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animation,
  };

  return (
    <div
      className={styles.like}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Lottie
        options={defaultOptions}
        width={35}
        height={35}
        isPaused={true}
        isStopped={true}
        onClick
      />
    </div>
  );
};

export default Like;
