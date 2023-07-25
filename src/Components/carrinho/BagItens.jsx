import React from 'react';
import api from '../../helpers/api';
import { color } from 'framer-motion';
import styles from './BagItens.module.css';
import { ReactComponent as Trash } from '../../assets/svg/svgCarrinho/delete.svg';
import { ReactComponent as ExpandMore } from '../../assets/svg/svgCarrinho/expand_more.svg';
import { NavLink } from 'react-router-dom';

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
  valorCarrinho,
  setValorCarrinho,
  index,
  itens,
}) => {
  const [corSelecionada, setCorSelecionada] = React.useState(
    colorSelected || '',
  );
  const [codigoCorSelecionada, setCodigoCorSelecionada] = React.useState(
    itens[index].codeColor || '',
  );
  const [sizeSelecionada, setSizeSelecionada] = React.useState(
    sizeSelected || '',
  );
  const [amounts, setAmounts] = React.useState(itens);
  const [descricao, setDescricao] = React.useState(description);

  const [modalDelete, setModalDelete] = React.useState(false);
  const [modalColors, setModalColors] = React.useState(false);
  const [modalSizes, setModalSizes] = React.useState(false);

  const [P, setP] = React.useState(undefined);
  const [M, setM] = React.useState(undefined);
  const [G, setG] = React.useState(undefined);
  const [GG, setGG] = React.useState(undefined);

  const url = `${api.getUri()}files/products/`;
  const colorsIndex = colors.findIndex((cor) => cor === colorSelected);

  const handleCheckColor = React.useCallback(
    (e, i) => {
      +stock.sizeP.amount[i] ? setP((P) => true) : setP((P) => false),
        +stock.sizeM.amount[i] ? setM((M) => true) : setM((M) => false),
        +stock.sizeG.amount[i] ? setG((G) => true) : setG((G) => false),
        +stock.sizeGG.amount[i] ? setGG((GG) => true) : setGG((GG) => false);
    },
    [stock],
  );

  const total = amountSelected * price;

  React.useEffect(() => {
    handleCheckColor('', colorsIndex);
  }, [handleCheckColor, colorsIndex, setValorCarrinho]);
  return (
    <div className={styles.bagItem}>
      <div
        style={{ backgroundImage: `url('${url}${image}')` }}
        className={styles.image}
      ></div>
      <div className={styles.infos}>
        <h2 className={styles.name}>
          <NavLink to={`/produtos/${itens[index].id}`}>
            {name.length > 14 ? name.slice(0, 14) + '...' : name}
          </NavLink>
        </h2>
        <span className={styles.price}>
          {price.toLocaleString('pt-BR').includes(',')
            ? `R$ ${price.toLocaleString('pt-BR')}`
            : `R$ ${price},00`}
        </span>
        <span className={styles.description}>
          {descricao.length > 14 ? descricao.slice(0, 27) + '...' : descricao}
        </span>
        <div className={styles.addAmount}>
          <button
            onClick={() => {
              let quantidade = [...amounts];
              quantidade[index].amount = +amounts[index].amount + 1;
              setAmounts(quantidade);
              setValorCarrinho(valorCarrinho + price);
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
              if (valorCarrinho >= price && quantidade[index].amount > 1) {
                setValorCarrinho(valorCarrinho - price);
              }
              window.localStorage.setItem('bag', JSON.stringify(amounts));
            }}
          >
            -
          </button>
        </div>

        <div className={styles.colorSizes}>
          <span
            className={`${styles.color} ${
              modalColors ? styles.selectMode : ''
            }`}
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
                  {colors.map((cor, i) => (
                    <div key={i}>
                      <li
                        onClick={(e) => {
                          setCorSelecionada(cor);
                          setCodigoCorSelecionada(codes[i]);
                          setModalColors(false);
                          handleCheckColor('', index);

                          let quantidade = [...amounts];
                          console.log(quantidade);
                          quantidade[index].color = cor;
                          quantidade[index].codeColor = codes[i];
                          window.localStorage.setItem(
                            'bag',
                            JSON.stringify(quantidade),
                          );
                        }}
                      >
                        {' '}
                        <span
                          className={styles.corSelecionada}
                          style={{ backgroundColor: `${codes[i]}` }}
                        ></span>
                        {cor}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </span>

          <span
            className={`${styles.sizes} ${modalSizes ? styles.selectSize : ''}`}
          >
            <div
              className={styles.divSizeSelected}
              onClick={() => setModalSizes(!modalSizes)}
            >
              {sizeSelecionada}
              {<ExpandMore />}
            </div>
            {modalSizes && stock && (
              <div className={styles.opcoesSizes}>
                <ul>
                  {P && (
                    <li
                      onClick={() => {
                        setSizeSelecionada('P');
                        setModalSizes(false);

                        let quantidade = [...amounts];
                        console.log(quantidade);
                        quantidade[index].size = 'P';
                        window.localStorage.setItem(
                          'bag',
                          JSON.stringify(quantidade),
                        );
                      }}
                    >
                      P
                    </li>
                  )}
                  {M && (
                    <li
                      onClick={() => {
                        setSizeSelecionada('M');
                        setModalSizes(false);

                        let quantidade = [...amounts];
                        console.log(quantidade);
                        quantidade[index].size = 'M';
                        window.localStorage.setItem(
                          'bag',
                          JSON.stringify(quantidade),
                        );
                      }}
                    >
                      M
                    </li>
                  )}
                  {G && (
                    <li
                      onClick={() => {
                        setSizeSelecionada('G');
                        setModalSizes(false);

                        let quantidade = [...amounts];
                        console.log(quantidade);
                        quantidade[index].size = 'G';
                        window.localStorage.setItem(
                          'bag',
                          JSON.stringify(quantidade),
                        );
                      }}
                    >
                      G
                    </li>
                  )}
                  {GG && (
                    <li
                      onClick={() => {
                        setSizeSelecionada('GG');
                        setModalSizes(false);

                        let quantidade = [...amounts];
                        console.log(quantidade);
                        quantidade[index].size = 'GG';
                        window.localStorage.setItem(
                          'bag',
                          JSON.stringify(quantidade),
                        );
                      }}
                    >
                      GG
                    </li>
                  )}
                </ul>
              </div>
            )}
          </span>
        </div>

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
            <h4>Tem certeza de excluir esse item?</h4>
            <div className={styles.botoes}>
              <button onClick={() => setModalDelete(false)}>Cancelar</button>

              <button
                onClick={(e) => {
                  const newItens = JSON.parse(localStorage.getItem('bag'));
                  console.log(newItens);
                  newItens.splice(index, 1);

                  window.localStorage.setItem('bag', JSON.stringify(newItens));
                  setModalDelete(false);
                  e.target.parentElement.parentElement.parentElement.parentElement.remove();
                  window.location.reload();
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BagItens;
