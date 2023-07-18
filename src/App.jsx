import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import './App.css';
import Infos from './Components/Infos';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProdutosRoute from './Routes/ProdutosRoute';
import DashboardRoute from './Routes/DashboardRoute';
import ProdutoSingle from './Components/produtos/ProdutoSingle';

import { UserProvider } from './context/UserContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos/*" element={<ProdutosRoute />} />
            <Route path="/produto/:id" element={<ProdutoSingle />} />
            <Route path="/dashboard/*" element={<DashboardRoute />} />
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
