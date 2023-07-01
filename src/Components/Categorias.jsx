import Categoria from './Categoria';
import styles from './Categorias.module.css';

const Categorias = () => {
  return (
    <div className={`${styles.nav}`}>
      <h3 className="subtitle">Veja por categorias</h3>
      <nav className={styles.slide}>
        <ul>
          <Categoria
            src="../images/paginaInicial/Calcinhas.jpg"
            title="Calcinhas"
          />

          <Categoria
            src="../images/paginaInicial/sutians.jpg"
            title="Sutiãns"
          />
          <Categoria
            src="../images/paginaInicial/Calcinhas basicas.jpg"
            title="Calcinhas basicas"
          />
          <Categoria
            src="../images/paginaInicial/CalcinhasRenda.jpg"
            title="Calcinhas de renda"
          />
          <Categoria
            src="../images/paginaInicial/acessorios.png"
            title="Acessorios"
          />
        </ul>
      </nav>
    </div>
  );
};

export default Categorias;
