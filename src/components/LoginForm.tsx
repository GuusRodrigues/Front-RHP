import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { FaUser, FaLock } from "react-icons/fa";
import Image from 'next/image';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); 

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      // Verificação de resposta válida
      if (response.status === 200 && response.data) {
        alert(`Login bem-sucedido! Token: ${response.data.token}`);
        console.log("Login bem-sucedido:", response.data);

        router.push('/SistemaContigencia');
      } else {
        setError('Resposta inválida recebida do servidor.');
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response) {
        // Caso o erro seja relacionado à resposta da API
        if (error.response.status === 404) {
          setError('Usuário não encontrado.');
        } else {
          setError((error.response.data as { message?: string })?.message || 'Erro ao fazer login.');
        }
      } else if (error.request) {
        setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
      } else {
        setError('Erro inesperado. Tente novamente.');
      }
      console.error("Erro no login:", error);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="flex justify-center items-center">
          <Image
            className="Transparente_13"
            src="/Transparente_13.png"
            alt="Logo"
            width={240}
            height={240}
            priority
          />
        </div>

        <div className="input-group">
          <p>LOGIN</p>
          <div className="input-with-icon">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Digite seu login"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <p>SENHA</p>
          <div className="input-with-icon">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </div>

        <div className="remember-me">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueci a senha</a>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={!username || !password}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
