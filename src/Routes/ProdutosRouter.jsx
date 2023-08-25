import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Infos from '../Components/header&infos&footer/Infos';
import Header from '../Components/header&infos&footer/Header';
import Lancamentos from '../Components/produtos/Lancamentos';
import ProdutosCategorias from '../Components/produtos/ProdutosCategorias';
import ProdutoSingle from '../Components/produtos/ProdutoSingle';
import { ReactComponent as Whatsapp } from '../assets/svg/svgFooter/whatsapp.svg';

const ProdutosRoute = () => {
  return (
    <>
      <Infos />
      <Header />
      <Routes>
        <Route path="/" element={<Lancamentos />} />
        <Route path="/:id" element={<ProdutoSingle />} />
        <Route path="lancamentos" element={<Lancamentos />} />
        <Route path="categoria/:id" element={<ProdutosCategorias />} />
      </Routes>
      <div
        onClick={() => {
          const urlWhatsapp = `https://wa.me/22992339289?text=Olá, gostaria de tirar uma duvida`;
          window.open(urlWhatsapp, '_blank');
        }}
        className="btnZap"
      >
        <Whatsapp />
      </div>
    </>
  );
};

export default ProdutosRoute;
