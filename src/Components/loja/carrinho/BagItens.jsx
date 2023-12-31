import React from 'react';
import styles from './BagItens.module.css';
import { NavLink } from 'react-router-dom';

// Components
import Produto from '../produtos/Produto';
import Produtos from '../produtos/Produtosall';
import Add from './BagItens/AddItem';
import Decrease from './BagItens/DecreaseItem';

// Imagens || SVGS
import { ReactComponent as Trash } from '../../../assets/svg/svgCarrinho/delete.svg';
import { ReactComponent as ExpandMore } from '../../../assets/svg/svgCarrinho/expand_more.svg';
import Size from './BagItens/Size';

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
  valorCarrinho,
  setValorCarrinho,
  index,
  itens,
  setPause,
  setStop,
  setErrorForm,
  pause,
  stop,
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
  const [buttonOf, setButtonOf] = React.useState(false);
  const [buttonMenosOf, setButtonMenosOf] = React.useState(false);
  const [descricao, setDescricao] = React.useState(description);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [modalColors, setModalColors] = React.useState(false);
  const [modalSizes, setModalSizes] = React.useState(false);

  const [P, setP] = React.useState(undefined);
  const [M, setM] = React.useState(undefined);
  const [G, setG] = React.useState(undefined);
  const [GG, setGG] = React.useState(undefined);

  const url = import.meta.env.VITE_APP_IMAGE_URL;

  const colorsIndex = colors.findIndex((cor) => cor === corSelecionada);

  const handleCheckColor = React.useCallback(
    (e, i) => {
      +stock.sizeP.amount[i] ? setP(true) : setP(false),
        +stock.sizeM.amount[i] ? setM(true) : setM(false),
        +stock.sizeG.amount[i] ? setG(true) : setG(false),
        +stock.sizeGG.amount[i] ? setGG(true) : setGG(false);

      if (+stock.sizeP.amount[i]) {
        return +stock.sizeP.amount[i] && setSizeSelecionada('P');
      } else if (+stock.sizeM.amount[i]) {
        return +stock.sizeM.amount[i] && setSizeSelecionada('M');
      } else if (+stock.sizeG.amount[i]) {
        return +stock.sizeG.amount[i] && setSizeSelecionada('G');
      } else if (+stock.sizeGG.amount[i]) {
        return +stock.sizeGG.amount[i] && setSizeSelecionada('GG');
      } else {
        return setSizeSelecionada('');
      }
    },
    [stock],
  );

  React.useEffect(() => {
    const limite = +stock[`size${sizeSelected}`].amount[colorsIndex];

    if (limite === +amounts[index].amount) {
      setButtonOf(true);
    } else {
      setButtonOf(false);
    }
  }, [stock, sizeSelected, index, amounts, colorsIndex]);

  React.useEffect(() => {
    handleCheckColor('', colorsIndex);
  }, [handleCheckColor, colorsIndex, setValorCarrinho, corSelecionada]);

  function changeColor(cor, i) {
    setCorSelecionada(cor);
    setCodigoCorSelecionada(codes[i]);
    setModalColors(false);
    handleCheckColor(i);

    let quantidade = [...amounts];
    quantidade[index].color = cor;
    quantidade[index].codeColor = codes[i];
    window.localStorage.setItem('bag', JSON.stringify(quantidade));
  }
  function adicionarItem() {
    let quantidade = [...amounts];
    const limite = +stock[`size${sizeSelected}`].amount[colorsIndex];

    if (limite > +amounts[index].amount) {
      quantidade[index].amount = +amounts[index].amount + 1;
      setAmounts(quantidade);
      setStop(false);
      setValorCarrinho(valorCarrinho + price);
      window.localStorage.setItem('bag', JSON.stringify(amounts));
    } else {
      setErrorForm('Limite de itens adicionados');
    }
  }
  function removerItem() {
    let quantidade = [...amounts];
    if (+amounts[index].amount === 1) {
      setModalDelete(true);
      return null;
    }
    quantidade[index].amount = +amounts[index].amount - 1;
    setStop(true);
    setAmounts(quantidade);
    setValorCarrinho(valorCarrinho - price);
    setButtonOf(false);

    return window.localStorage.setItem('bag', JSON.stringify(amounts));
  }

  return (
    <>
      <div className={styles.bagItem}>
        <NavLink to={`/produtos/${itens[index].id}`}>
          <div
            style={{ backgroundImage: `url('${url}${image}')` }}
            className={styles.image}
          ></div>
        </NavLink>
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
            <Decrease buttonMenosOf={buttonMenosOf} removerItem={removerItem} />

            <span className={`${styles.amount} `}>
              {amounts[index].amount || 1}
            </span>
            <Add buttonOf={buttonOf} adicionarItem={adicionarItem} />
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
                        <li onClick={() => changeColor(cor, i)}>
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
              className={`${styles.sizes} ${
                modalSizes ? styles.selectSize : ''
              }`}
            >
              <div
                className={styles.divSizeSelected}
                onClick={() => setModalSizes(!modalSizes)}
              >
                {sizeSelecionada === 'P' ? sizeSelected : sizeSelecionada}
                {<ExpandMore />}
              </div>
              {modalSizes && stock && (
                <div className={styles.opcoesSizes}>
                  <ul>
                    {P && (
                      <Size
                        size={'P'}
                        setSizeSelecionada={setSizeSelecionada}
                        setModalSizes={setModalSizes}
                        index={index}
                        amounts={amounts}
                      />
                    )}
                    {M && (
                      <Size
                        size={'M'}
                        setSizeSelecionada={setSizeSelecionada}
                        setModalSizes={setModalSizes}
                        index={index}
                        amounts={amounts}
                      />
                    )}
                    {G && (
                      <Size
                        size={'G'}
                        setSizeSelecionada={setSizeSelecionada}
                        setModalSizes={setModalSizes}
                        index={index}
                        amounts={amounts}
                      />
                    )}
                    {GG && (
                      <Size
                        size={'GG'}
                        setSizeSelecionada={setSizeSelecionada}
                        setModalSizes={setModalSizes}
                        index={index}
                        amounts={amounts}
                      />
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
                    newItens.splice(index, 1);

                    window.localStorage.setItem(
                      'bag',
                      JSON.stringify(newItens),
                    );
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
    </>
  );
};

export default BagItens;
