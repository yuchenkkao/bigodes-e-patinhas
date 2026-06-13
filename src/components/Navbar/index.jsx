import { Link } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/NavbarLogo.png';

export default function Navbar() {
  return (
    <nav>
     <div>
        <img src={logoImg} alt="Logotipo Bigodes e Patinhas" className="logo" />
      </div>

      <ul className="lista">
        <li><Link to="/" className="link">Página Inicial</Link></li>
        <li><Link to="/agenda" className="link">Agenda</Link></li>
        <li><Link to="/tutores" className="link">Tutores</Link></li>
        <li><Link to="/pets" className="link">Pets</Link></li>
        <li><Link to="/meus-agendamentos" className="link">Área do Cliente</Link></li>
      </ul>
    </nav>
  );
}