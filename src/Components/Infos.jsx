import styles from './Infos.module.css';
import { useLocation } from 'react-router-dom';

const Infos = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === '/' ? (
        <div className={styles.infos}>
          <p>
            FRETE GRÁTIS <span>acima de R$249,90</span>
          </p>
        </div>
      ) : (
        <div className={styles.infos2}>
          <p>
            FRETE GRÁTIS <span>acima de R$249,90</span>
          </p>
        </div>
      )}
    </>
  );
};

export default Infos;
