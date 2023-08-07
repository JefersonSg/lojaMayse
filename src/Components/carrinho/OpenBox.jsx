import React from 'react';
import GiftBoxOpen from './GiftBoxOpen';
import styles from './OpenBox.module.css';

const OpenBox = ({ setOpenBox }) => {
  const [pause, setPause] = React.useState(false);
  const [stop, setStop] = React.useState(false);

  React.useEffect(() => {
    const temporizador = setTimeout(() => {
      setPause(true);
    }, 2200);

    return () => {
      clearTimeout(temporizador);
    };
  }, [stop]);

  return (
    <div
      className={styles.containerOpenBox}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpenBox(false);
        }
      }}
    >
      <div className={`${styles.divOpen} ${styles.moveCenter}`}>
        <GiftBoxOpen pause={pause} stop={stop} />
        {pause && (
          <div className={styles.infos}>
            <p>
              Você desbloqueou o Frete Grátis e um{' '}
              <span>PRESENTE SURPRESA</span>
            </p>
            <button
              onClick={() => {
                setOpenBox(false);
              }}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenBox;
