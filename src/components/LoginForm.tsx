import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router'; // Importando useRouter do Next.js
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter(); // Inicializa o useRouter

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Adicione sua lógica de autenticação aqui
    // Se a autenticação for bem-sucedida, redirecione
    router.push('/SistemaContigencia'); // Redireciona para a página SistemaContigencia
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
        <img className="LogoForm" src="/LogoRHP.png" alt="Logo RHP" width={300} height={200} />
        <div className="input-group">
          <p>LOGIN</p>
          <div className="input-with-icon">
            <FaUser className="icon" />
            <input
              type="email"
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

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginForm;
