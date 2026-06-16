import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaPaw, FaStethoscope, FaConciergeBell, FaLock, FaArrowLeft } from 'react-icons/fa';

import ConfigEspecies from './components/ConfigEspecies';
import ConfigVeterinarios from './components/ConfigVeterinarios';
import ConfigServicos from './components/ConfigServicos';

import './styles.css';

export default function Configuracao() {
  const token = localStorage.getItem('@BigodesToken') || 'visitante';
  const [abaAtiva, setAbaAtiva] = useState('especies');

  if (token !== 'gestor' && token !== 'atendente') {
    return (
      <div className="config-bloqueada-container">
        <div className="lock-circle-config"><FaLock /></div>
        <h2>Painel Administrativo Restrito</h2>
        <p>Você não possui credenciais de nível de gerenciamento para modificar as configurações da clínica.</p>
        <Link to="/agenda" className="btn-voltar-config"><FaArrowLeft /> Voltar para a Agenda</Link>
      </div>
    );
  }

  return (
    <div className="config-page-container">
      
      <aside className="config-sidebar">
        <div className="sidebar-title">
          <FaCog className="icon-cog-spin" />
          <h3>Configurações</h3>
        </div>
        
        <nav className="config-menu-nav">
          <button 
            className={`nav-tab-btn ${abaAtiva === 'especies' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('especies')}
          >
            <FaPaw /> Espécies Atendidas
          </button>
          
          <button 
            className={`nav-tab-btn ${abaAtiva === 'veterinarios' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('veterinarios')}
          >
            <FaStethoscope /> Corpo Veterinário
          </button>
          
          <button 
            className={`nav-tab-btn ${abaAtiva === 'servicos' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('servicos')}
          >
            <FaConciergeBell /> Serviços Oferecidos
          </button>
        </nav>
      </aside>

      <main className="config-content-panel">
        {abaAtiva === 'especies' && <ConfigEspecies />}
        {abaAtiva === 'veterinarios' && <ConfigVeterinarios />}
        {abaAtiva === 'servicos' && <ConfigServicos />}
      </main>

    </div>
  );
}