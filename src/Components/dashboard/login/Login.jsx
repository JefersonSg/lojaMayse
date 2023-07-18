import React from 'react';
import Input from '../forms/Input';
import useForm from '../../../Hooks/useForm';
import styles from './Login.module.css';
import Button from '../forms/Button';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context/UserContext';
import { UserProvider } from '../../../context/UserContext';

const Login = () => {
  const email = useForm();
  const password = useForm();
  const { login } = React.useContext(Context);
  const [user, setUser] = React.useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = {
        email: email.value,
        password: password.value,
      };
      login(data);
    } catch (error) {
      console.log('Ocorreu um erro:' + error);
    }
  }

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Login</h2>
      <Input label="Nome" name="username" type="email" {...email} />
      <Input label="Senha" name="password" type="password" {...password} />
      <Button>ENTRAR</Button>
    </form>
  );
};

export default Login;
