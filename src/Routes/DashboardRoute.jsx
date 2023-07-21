import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Components/dashboard/login/Login';
import Infos from '../Components/dashboard/Infos';
import Header from '../Components/dashboard/Header';
import Home from '../Components/dashboard/Home';
import CreateCategory from '../Components/dashboard/categories/CreateCategory';
import EditCategory from '../Components/dashboard/categories/EditCategory';
import SingleProduct from '../Components/dashboard/produto/ProdutoSingle';
import EditProduct from '../Components/dashboard/edit/EditProduct';
import CreateProduct from '../Components/dashboard/create/CreateProduct';

const DashboardRoute = () => {
  return (
    <>
      <Infos />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criar" element={<CreateProduct />} />
        <Route path="/categorias" element={<CreateCategory />} />
        <Route path="/categorias/:id" element={<EditCategory />} />
        <Route path="/produto/:id" element={<SingleProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
};

export default DashboardRoute;
