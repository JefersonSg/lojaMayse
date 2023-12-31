import React from 'react';
import styles from './Photo.module.css';
import api from '../../../helpers/api';
import Image from '../../../helpers/Image';

const Photos = ({ imagesAll, image1, previewAll, preview1 }) => {
  const [imagePrincipal, setImagePrincipal] = React.useState(
    image1 || preview1,
  );

  const [images, setImages] = React.useState(imagesAll || previewAll);

  const url = import.meta.env.VITE_APP_IMAGE_URL;

  return (
    <>
      <div>
        <div className={styles.imagens}>
          <div className={styles.miniImages}>
            {images.map((imagem, i) => (
              <div onClick={(e) => setImagePrincipal(imagem)}>
                <Image
                  key={`${imagem + i}`}
                  src={url + imagem}
                  alt=""
                  className={`${
                    imagem === imagePrincipal ? styles.active : ''
                  }`}
                />
              </div>
            ))}
          </div>
          <div className={styles.imagemPrincipal}>
            <Image
              src={
                previewAll
                  ? URL.createObjectURL(imagePrincipal)
                  : `${url}${imagePrincipal}`
              }
              alt=""
            />
          </div>
        </div>
      </div>
      {previewAll && (
        <div>
          <div className={styles.imagens}>
            <div className={styles.miniImages}>
              {previewAll.map((imagem) => (
                <div
                  onClick={(e) => setImagePrincipal(imagem)}
                  key={imagem}
                  className={`${
                    imagem === imagePrincipal ? styles.active : ''
                  }`}
                >
                  <img src={imagem} alt="" />
                </div>
              ))}
            </div>
            <div className={styles.imagemPrincipal}>
              <img src={imagePrincipal} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Photos;
