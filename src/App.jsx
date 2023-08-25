import React from 'react';
import Infos from './Components/header&infos&footer/Infos';
import Header from './Components/header&infos&footer/Header';
import Footer from './Components/header&infos&footer/Footer';
import Home from './Components/Home';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProdutosRouter from './Routes/ProdutosRouter';
import DashboardRouter from './Routes/DashboardRouter';
import FavoritosRouter from './Routes/FavoritosRouter';

import { UserProvider } from './context/UserContext';
import CarrinhoRouter from './Routes/CarrinhoRouter';

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos/*" element={<ProdutosRouter />} />
            <Route path="/dashboard/*" element={<DashboardRouter />} />
            <Route path="/checkout/*" element={<CarrinhoRouter />} />
            <Route path="/favoritos/*" element={<FavoritosRouter />} />
          </Routes>

          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
