import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import './App.css';
import Infos from './Components/Infos';

function App() {
  return (
    <>
      <Infos />
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
