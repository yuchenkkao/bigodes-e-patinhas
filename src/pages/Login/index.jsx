import { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/NavbarLogo.png'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    window.location.href = '/';
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <div className="login-header">
          <img src={logoImg} alt="Logotipo Bigodes e Patinhas" className="login-logo" />
          <h2>Bem-vindo de volta!</h2>
          <p>Insira suas credenciais para acessar o sistema.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="email">E-mail de Usuário</label>
            <input 
              type="email" 
              id="email"
              placeholder="exemplo@bigodes.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id="senha"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

  
          <div className="login-actions">
            <a href="#esqueceu" className="forgot-password">Esqueceu a senha?</a>
          </div>

  
          <button type="submit" className="btn-login">Entrar no Sistema</button>
        </form>

      </div>
    </div>
  );
}