import React from 'react';
import Lottie from 'react-lottie';
import styles from './Likes.module.css';

// Arquivos Lottie
import Likes from '../../../assets/lottie/Like.json';

const Like = ({ id }) => {
  const [favoritos, setNewFavorito] = React.useState(
    localStorage.getItem('favoritos')
      ? JSON.parse(localStorage.getItem('favoritos'))
      : false,
  );

  const [paused, setPaused] = React.useState(true);
  const [stoped, setStoped] = React.useState(true);

  const animation = Likes;
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animation,
  };

  function addNewFavorite() {
    const infos = localStorage.getItem('favoritos')
      ? JSON.parse(localStorage.getItem('favoritos'))
      : [];
    const igual = infos.filter((info, index) => info === id);
    console.log(igual);
    if (igual[0]) {
      const novoInfo = infos.filter((info) => info !== id);
      return localStorage.setItem('favoritos', JSON.stringify(novoInfo));
    }
    infos.push(id);

    return localStorage.setItem('favoritos', JSON.stringify(infos));
  }

  // se Ja tiver no favorito, fica vermelho
  React.useEffect(() => {
    const infos = localStorage.getItem('favoritos')
      ? JSON.parse(localStorage.getItem('favoritos'))
      : false;
    if (infos) {
      const igual = infos.filter((info) => info === id);
      if (igual[0]) {
        setPaused(false);
        setStoped(false);
      }
    }
  }, [id]);

  return (
    <div
      className={styles.like}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addNewFavorite();
        if (paused && stoped) {
          setPaused(false);
          setStoped(false);
        } else {
          setPaused(true);
          setStoped(true);
        }
      }}
    >
      <Lottie
        options={defaultOptions}
        width={35}
        height={35}
        isPaused={paused}
        isStopped={stoped}
        onClick
      />
    </div>
  );
};

export default Like;
