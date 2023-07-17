import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Lancamentos from './Components/produtos/Lancamentos';
import ProdutosCategorias from './Components/produtos/ProdutosCategorias';

const ProdutosRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Lancamentos />} />
      <Route path="lancamentos" element={<Lancamentos />} />
      <Route path="categoria/:id" element={<ProdutosCategorias />} />
    </Routes>
  );
};

export default ProdutosRoute;
