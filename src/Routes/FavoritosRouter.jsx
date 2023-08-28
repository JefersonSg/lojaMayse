import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Infos from '../Components/loja/header&infos&footer/Infos';
import Header from '../Components/loja/header&infos&footer/Header';
import Favoritos from '../Components/loja/Favoritos/Favoritos';

// SVG

const CarrinhoRouter = () => {
  return (
    <>
      <Infos />
      <Header />
      <Routes>
        <Route path="/" element={<Favoritos />} />
      </Routes>
    </>
  );
};

export default CarrinhoRouter;
