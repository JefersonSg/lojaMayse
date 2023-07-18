import React from 'react';
import Produtos from './Produtosall';
import BreadCrumbs from './Breadcrumbs';

const Lancamentos = () => {
  return (
    <>
      <BreadCrumbs categoriaAtual={'lançamentos'} />
      <Produtos />
    </>
  );
};

export default Lancamentos;
