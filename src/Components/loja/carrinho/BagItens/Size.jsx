import React from 'react';

const Size = ({ size, setSizeSelecionada, setModalSizes, index, amounts }) => {
  function changeSize() {
    setSizeSelecionada(size);
    setModalSizes(false);

    let quantidade = [...amounts];
    quantidade[index].size = size;
    window.localStorage.setItem('bag', JSON.stringify(quantidade));
  }

  return <li onClick={changeSize}>{size}</li>;
};

export default Size;
