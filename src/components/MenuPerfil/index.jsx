import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import './styles.css';

export default function MenuPerfil() {
  const [menuAberto, setMenuAberto] = useState(false);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const simularLogin = (modo) => {
    localStorage.setItem('@BigodesToken', modo);  
    setMenuAberto(false); 
    window.location.reload()
  };

  return (
    <div className="perfil-container">
      <button onClick={alternarMenu} className="link-perfil">
        <FaUserCircle />
      </button>

      {menuAberto && (
        <div className="dropdown-menu">
          <Link to="/perfil" onClick={() => setMenuAberto(false)}>Meu Perfil</Link>
          <Link to="/login" onClick={() => setMenuAberto(false)}>Login</Link>

          <button onClick={() => simularLogin('visitante')}>Sair</button>

          <div className="divisor"></div>
          
          <span className="dropdown-titulo">Modo</span>
          <button onClick={() => simularLogin('cliente')}>Modo Cliente</button>
          <button onClick={() => simularLogin('atendente')}>Modo Atendente</button>
          <button onClick={() => simularLogin('veterinario')}>Modo Veterinário</button>
          <button onClick={() => simularLogin('gestor')}>Modo Gestor</button>
        </div>
      )}
    </div>
  );
}