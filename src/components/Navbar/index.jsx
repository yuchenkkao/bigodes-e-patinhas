import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/NavbarLogo.png';

import MenuPerfil from '../MenuPerfil';

import { MdOutlinePets } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { LuLogIn } from "react-icons/lu";


export default function Navbar() {

  const token = localStorage.getItem('@BigodesToken') || 'visitante';

  return (
    <>
    <nav>
     <div>
        <img src={logoImg} alt="Logotipo Bigodes e Patinhas" className="logo" />
    </div>

      <ul className="lista">
        <li><Link to="/" className="link"><FaHome /> Página Inicial </Link></li>
        {token !== 'visitante' && (
        <li><Link to="/agenda" className="link"><FaClock /> Agenda</Link></li>
        )}

        {token === 'visitante' && (
        <li><Link to="/login" className="link"><LuLogIn /> Login</Link></li>
        )}

        {(token === 'atendente' || token === 'veterinario' || token === 'gestor') && (
          <>
        <li><Link to="/tutores" className="link"><BsFillPeopleFill /> Tutores</Link></li>
        <li><Link to="/pets" className="link"><MdOutlinePets /> Pets </Link> </li>
          </>)}

        {(token === 'gestor') && (
        <li><Link to="/relatorios" className="link"><IoStatsChart /> Relatórios da Clínica</Link></li>
        )}
      </ul>

      <MenuPerfil/>

    </nav>

    <div className="onda-container">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path 
            fill="#4068DE" 
            fillOpacity="1" 
            d="M0,128L48,138.7C96,149,192,171,288,160C384,149,480,107,576,106.7C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
    </div>
    </>
  );
}