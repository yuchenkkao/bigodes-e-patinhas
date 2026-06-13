import { Link } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/NavbarLogo.png';

export default function Navbar() {
  return (
    <>
    <nav>
     <div>
        <img src={logoImg} alt="Logotipo Bigodes e Patinhas" className="logo" />
      </div>

      <ul className="lista">
        <li><Link to="/" className="link">Página Inicial</Link></li>
        <li><Link to="/agenda" className="link">Agenda</Link></li>
        <li><Link to="/tutores" className="link">Tutores</Link></li>
        <li><Link to="/pets" className="link">Pets</Link></li>
        <li><Link to="/meus-agendamentos" className="link">Agendamentos</Link></li>
      </ul>
    </nav>

    <div className="onda-container">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
         <path 
          fill="#4068DE" 
          fillOpacity="1" 
          d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,58.7C960,43,1056,21,1152,26.7C1248,32,1344,64,1392,80L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
  ></path>
        </svg>
      </div>
      </>
  );
}