import React from 'react';

const Porcentagem = ({ restante }) => {
  return (
    <>
      <p>
        {restante > 0 && 'PRESENTE SURPRESA EM '}
        {restante > 0 && (
          <span>{'R$ ' + restante.toLocaleString('pt-BR')}</span>
        )}

        {restante <= 0 && <span>PRESENTE DESBLOQUEADO</span>}
      </p>
    </>
  );
};

export default Porcentagem;
