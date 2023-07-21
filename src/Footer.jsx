import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
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
        <h2>Ajuda</h2>
        <ul>
          <li>Entrar em contato</li>
          <li>Perguntas frequentes</li>
          <li>Endereço da loja</li>
          <li>Guia de tamanhos</li>
        </ul>
      </div>
      <div className={styles.informacoes}>
        <h2>Informações</h2>
        <ul>
          <li>Envio e entrega</li>
          <li>Devoluções</li>
          <li>Termos e condições</li>
          <li>Politica de privacidade</li>
          <li>Politica de Cookies</li>
        </ul>
      </div>
      <div className={styles.redes}>
        <h2>Redes sociais</h2>
        <ul>
          <li>Instagram</li>
          <li>Tiktok</li>
          <li>Facebook</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
