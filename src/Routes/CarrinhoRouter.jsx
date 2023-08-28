import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Infos from '../Components/loja/header&infos&footer/Infos';
import Header from '../Components/loja/header&infos&footer/Header';
import Carrinho from '../Components/loja/carrinho/Carrinho';

const CarrinhoRouter = () => {
  return (
    <>
      <Infos />
      <Header />
      <Routes>
        <Route path="/" element={<Carrinho />} />
      </Routes>
    </>
  );
};

export default CarrinhoRouter;
