import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

import DadosPerfil from '../../ui/partials/Perfil/DadosPerfil';
import DadosPet from '../../ui/partials/Perfil/DadosPet';
import DadosConsulta from '../../ui/partials/Perfil/DadosConsultas';
import ModalEditarPerfil from '../../ui/partials/Perfil/ModalEditarPerfil';

import './styles.css';
import { useAuth } from '../../data/hooks/useAuth';
import { usePerfil, useMeusPets, useHistoricoConsultas } from '../../data/hooks/usePerfil';

export default function Perfil() {
  const navigate = useNavigate();
  const { papel: token, sair } = useAuth();

  const { usuario, atualizar } = usePerfil();
  const { pets: meusPets } = useMeusPets();
  const { historico: historicoConsultas } = useHistoricoConsultas();

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  useEffect(() => {
    if (token === 'visitante') {
      navigate('/');
    }
  }, [token, navigate]);

  if (token === 'visitante' || !usuario) {
    return null;
  }

  const handleEditarPerfil = () => {
    setModalEditarAberto(true);
  };

  const handleSalvarPerfil = async (dadosAtualizados) => {
    await atualizar(dadosAtualizados);
    alert('Perfil atualizado com sucesso!');
  };

  const handleLogout = () => {
    sair();
    alert('Sessão encerrada com sucesso!');
    navigate('/');
  };

  return (
    <div className="perfil-page-container">
      
      <div className="perfil-header-saudacao">
        <div>
          <h2>Olá, {usuario.nome.split(' ')[0]}! 👋</h2>
          <p>Gerencie suas informações pessoais e os dados dos seus pets.</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          <FaSignOutAlt /> Sair da Conta
        </button>
      </div>

      <div className="perfil-grid-layout">
        
        <div className="perfil-coluna-dados">
          <DadosPerfil usuario={usuario} onEditar={handleEditarPerfil} />
        </div>

        <div className="perfil-coluna-pets">
          <DadosPet pets={meusPets} />
          <DadosConsulta historico={historicoConsultas} />
        </div>

      </div>

      <ModalEditarPerfil 
        isOpen={modalEditarAberto}
        onClose={() => setModalEditarAberto(false)}
        usuarioAtual={usuario}
        onSalvar={handleSalvarPerfil}
      />

    </div>
  );
}