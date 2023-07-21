import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../Header';
import Lancamentos from '../Components/produtos/Lancamentos';
import ProdutosCategorias from '../Components/produtos/ProdutosCategorias';
import Infos from '../Components/Infos';
import ProdutoSingle from '../Components/produtos/ProdutoSingle';

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
    </>
  );
};

export default ProdutosRoute;
