import Categoria from './Categoria';
import styles from './Categorias.module.css';
import Calcinha from '../../public/paginaInicial/Calcinhas.jpg';
import Sutiãns from '../../public/paginaInicial/sutians.jpg';
import CalcinhasBasicas from '../../public/paginaInicial/Calcinhas basicas.jpg';
import CalcinhasRenda from '../../public/paginaInicial/CalcinhasRenda.jpg';
import Acessorios from '../../public/paginaInicial/acessorios.png';

const Categorias = () => {
  return (
    <div className={`${styles.nav}`}>
      <h3 className="subtitle">Veja por categorias</h3>
      <nav className={styles.slide}>
        <ul>
          <Categoria img={Calcinha} title="Calcinhas" />

          <Categoria img={Sutiãns} title="Sutiãns" />
          <Categoria img={CalcinhasBasicas} title="Calcinhas basicas" />
          <Categoria img={CalcinhasRenda} title="Calcinhas de renda" />
          <Categoria img={Acessorios} title="Acessorios" />
        </ul>
      </nav>
    </div>
  );
};

export default Categorias;
