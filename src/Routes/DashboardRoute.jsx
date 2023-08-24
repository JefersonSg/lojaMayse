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
import { UserProvider } from '../context/UserContext';
import ProtectedRoute from '../helpers/ProtectedRoute';

const DashboardRoute = () => {
  return (
    <>
      <Infos />
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/criar"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorias"
          element={
            <ProtectedRoute>
              <CreateCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorias/:id"
          element={
            <ProtectedRoute>
              <EditCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/produtos/:id"
          element={
            <ProtectedRoute>
              <SingleProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default DashboardRoute;
