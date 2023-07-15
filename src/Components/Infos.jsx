import styles from './Infos.module.css';
import { useLocation } from 'react-router-dom';

const Infos = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === '/' ? (
        <div className={styles.infos}>
          Frete Grátis <span>acima de R$249,90</span>
        </div>
      ) : (
        <div className={styles.infos2}>
          Frete Grátis <span>acima de R$249,90</span>
        </div>
      )}
    </>
  );
};

export default Infos;
