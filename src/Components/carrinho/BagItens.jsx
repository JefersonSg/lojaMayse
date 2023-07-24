import React from 'react';
import api from '../../helpers/api';
import { color } from 'framer-motion';
import styles from './BagItens.module.css';
import { ReactComponent as Trash } from '../../assets/svg/svgCarrinho/delete.svg';
import { ReactComponent as ExpandMore } from '../../assets/svg/svgCarrinho/expand_more.svg';

const BagItens = ({
  name,
  image,
  brand,
  colors,
  description,
  price,
  stock,
  codes,
  sizeSelected,
  colorSelected,
  amountSelected,
  index,
  itens,
}) => {
  const [corSelecionada, setCorSelecionada] = React.useState(
    colorSelected || '',
  );
  const [codigoCorSelecionada, setCodigoCorSelecionada] = React.useState(
    itens[index].codeColor || '',
  );
  const [amounts, setAmounts] = React.useState(itens);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [modalColors, setModalColors] = React.useState(false);
  const url = `${api.getUri()}files/products/`;
  return (
    <div className={styles.bagItem}>
      <div
        style={{ backgroundImage: `url('${url}${image}')` }}
        className={styles.image}
      ></div>
      <div className={styles.infos}>
        <h2 className={styles.name}>{name}</h2>
        <span className={styles.price}>
          {price.toLocaleString('pt-BR').includes(',')
            ? `R$ ${price.toLocaleString('pt-BR')}`
            : `R$ ${price},00`}
        </span>
        <span className={styles.description}>{description}</span>
        <div className={styles.addAmount}>
          <button
            onClick={() => {
              let quantidade = [...amounts];
              quantidade[index].amount = +amounts[index].amount + 1;
              setAmounts(quantidade);
              window.localStorage.setItem('bag', JSON.stringify(amounts));
            }}
          >
            +
          </button>
          <span className={styles.amount}>{amounts[index].amount || 1}</span>
          <button
            onClick={() => {
              let quantidade = [...amounts];
              quantidade[index].amount =
                +amounts[index].amount > 1 ? +amounts[index].amount - 1 : 1;
              setAmounts(quantidade);
              window.localStorage.setItem('bag', JSON.stringify(amounts));
            }}
          >
            -
          </button>
        </div>
        <span
          className={`${styles.color} ${modalColors ? styles.selectMode : ''}`}
        >
          <div
            className={styles.divColorSelected}
            onClick={() => setModalColors(!modalColors)}
          >
            <span
              className={`${styles.corSelecionada} `}
              style={{ backgroundColor: `${codigoCorSelecionada}` }}
            ></span>
            {corSelecionada}
            {<ExpandMore />}
          </div>
          {modalColors && colors && (
            <div className={styles.opcoesColors}>
              <ul>
                {colors.map((cor, index) => (
                  <div key={index}>
                    <li
                      onClick={() => {
                        setCorSelecionada(cor);
                        setCodigoCorSelecionada(codes[index]);
                        setModalColors(false);
                      }}
                    >
                      {' '}
                      <span
                        className={styles.corSelecionada}
                        style={{ backgroundColor: `${codes[index]}` }}
                      ></span>
                      {cor}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </span>
        <span className={styles.lixeira} onClick={() => setModalDelete(true)}>
          {<Trash />}
        </span>
      </div>
      {modalDelete && (
        <div
          className={styles.modalDelete}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setModalDelete(false);
            }
          }}
        >
          <div className={styles.gridDelete}>
            <h4>Deseja remover o item do carrinho?</h4>
            <div className={styles.botoes}>
              <button
                onClick={(e) => {
                  const newItens = [...itens];
                  newItens.splice(index, 1);
                  window.localStorage.setItem('bag', JSON.stringify(newItens));
                  setModalDelete(false);

                  e.target.parentElement.parentElement.parentElement.parentElement.remove();
                }}
              >
                Sim
              </button>
              <button onClick={() => setModalDelete(false)}>Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BagItens;
