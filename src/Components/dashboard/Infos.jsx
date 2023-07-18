import React from 'react';
import styles from './Infos.module.css';
import { Context } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Infos = () => {
  const { authenticated, logout } = React.useContext(Context);
  const navigate = useNavigate();

  return (
    <div className={styles.infos}>
      {authenticated ? (
        <>
          <li
            style={{ marginLeft: '80px', cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            Ir para a home
          </li>
          <li
            style={{ marginLeft: '80px', cursor: 'pointer' }}
            onClick={logout}
          >
            Sair
          </li>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Infos;
