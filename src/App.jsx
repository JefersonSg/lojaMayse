import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import './App.css';
import Infos from './Components/Infos';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProdutoSingle from './Components/produtos/ProdutoSingle';
import ProdutosCategorias from './Components/produtos/ProdutosCategorias';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Infos />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProdutoSingle />} />
          <Route
            path="/produto/categorias/:id"
            element={<ProdutosCategorias />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
