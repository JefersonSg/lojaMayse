import React from 'react';
import Produtos from './Produtosall';

// Hooks
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
