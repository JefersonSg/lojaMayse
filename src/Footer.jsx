import React from 'react';
import styles from './Footer.module.css';
import useMedia from './Hooks/useMedia';

const Footer = () => {
  const mobile = useMedia('(max-width: 43.75rem)');

  const [mostrarAjuda, setMostrarAjuda] = React.useState(true);
  const [mostrarInfos, setMostrarInfos] = React.useState(true);
  const [mostrarRedes, setMostrarRedes] = React.useState(true);

  React.useState(() => {
    const resizeFooter = () => {
      let medidaAnterior = document.documentElement.scrollWidth;

      if (medidaAnterior < 560) {
        setMostrarAjuda(false);
        setMostrarInfos(false);
        setMostrarRedes(false);
        return;
      }
      setMostrarAjuda(true);
      setMostrarInfos(true);
      setMostrarRedes(true);
      return;
    };
    window.addEventListener('resize', resizeFooter);

    // Remover o event listener quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', resizeFooter);
    };
  }, [mobile]);

  return (
    <footer className={styles.footer}>
      <div className={styles.sobre}>
        <h2>Loja Mayse</h2>
        <p>
          Experimente o conforto e a luxuria das lingeries top de linha vendidas
          aqui na Mayse.
        </p>
      </div>
      <div className={styles.contatos}>
        <h2 onClick={() => setMostrarAjuda(!mostrarAjuda)}>Ajuda</h2>
        {mostrarAjuda && (
          <ul>
            <li>Entrar em contato</li>
            <li>Perguntas frequentes</li>
            <li>Endereço da loja</li>
            <li>Guia de tamanhos</li>
          </ul>
        )}
      </div>
      <div className={styles.informacoes}>
        <h2 onClick={() => setMostrarInfos(!mostrarInfos)}>Informações</h2>
        {mostrarInfos && (
          <ul>
            <li>Envio e entrega</li>
            <li>Devoluções</li>
            <li>Termos e condições</li>
            <li>Politica de privacidade</li>
            <li>Politica de Cookies</li>
          </ul>
        )}
      </div>
      <div className={styles.redes}>
        <h2 onClick={() => setMostrarRedes(!mostrarRedes)}>Redes sociais</h2>
        {mostrarRedes && (
          <ul>
            <li>Instagram</li>
            <li>Tiktok</li>
            <li>Facebook</li>
          </ul>
        )}
      </div>
    </footer>
  );
};

export default Footer;
