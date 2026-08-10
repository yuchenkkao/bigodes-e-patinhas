import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaPaw, FaStethoscope, FaConciergeBell, FaLock, FaArrowLeft, FaSyringe } from 'react-icons/fa';

import ConfigEspecies from '../../ui/partials/Configuracoes/ConfigEspecies';
import ConfigVeterinarios from '../../ui/partials/Configuracoes/ConfigVeterinarios';
import ConfigServicos from '../../ui/partials/Configuracoes/ConfigServicos';
import ConfigVacinas from '../../ui/partials/Configuracoes/ConfigVacinas';

import './styles.css';
import { useAuth } from '../../data/hooks/useAuth';

export default function Configuracao() {
  const { papel: token } = useAuth();
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

          <button
            className={`nav-tab-btn ${abaAtiva === 'vacinas' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('vacinas')}
          >
            <FaSyringe /> Vacinas e Lotes
          </button>
        </nav>
      </aside>

      <main className="config-content-panel">
        {abaAtiva === 'especies' && <ConfigEspecies />}
        {abaAtiva === 'veterinarios' && <ConfigVeterinarios />}
        {abaAtiva === 'servicos' && <ConfigServicos />}
        {abaAtiva === 'vacinas' && <ConfigVacinas />}
      </main>

    </div>
  );
}