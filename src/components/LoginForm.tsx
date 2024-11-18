import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios'; // Importando AxiosError para tratar o tipo do erro
import { FaUser, FaLock } from "react-icons/fa";
import Image from 'next/image'; // Importe o componente Image do Next.js

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Para exibir mensagens de erro
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Limpar mensagens de erro anteriores

    try {
      // Faça a requisição para a API de login
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      if (response.status === 200) {
        alert(`Login bem-sucedido! Token: ${response.data.token}`);
        // Supondo que a API retorna um token ou uma confirmação de sucesso
        console.log("Login bem-sucedido:", response.data);

        // Redireciona para a página SistemaContigencia
        router.push('/SistemaContigencia');
      } else {
        // Trate outros status de resposta, se necessário
        setError('Usuário ou senha incorretos.');
      }
    } catch (err) {
      const error = err as AxiosError; // Fazendo a verificação de tipo do erro

      if (error.response) {
        // Erro de resposta da API
        setError((error.response.data as { message?: string })?.message || 'Erro ao fazer login.');
      } else {
        // Erro de rede ou outro problema
        setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
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
            alt="Transparente 13"
            width={240}
            height={240}
            priority // O atributo `priority` pode ser usado para garantir que a imagem seja carregada rapidamente
          />
        </div>
        <div className="input-group">
          <p>LOGIN</p>
          <div className="input-with-icon">
            <FaUser className="icon" />
            <input
              //type="email"
              placeholder="Digite seu login"
              value={username}
              onChange={handleUsernameChange}
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

        {error && <div className="error-message">{error}</div>} {/* Exibir mensagem de erro */}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginForm;
