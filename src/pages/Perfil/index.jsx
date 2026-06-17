import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

import DadosPerfil from './components/DadosPerfil';
import DadosPet from './components/DadosPet';
import DadosConsulta from './components/DadosConsultas';
import ModalEditarPerfil from './components/ModalEditarPerfil';

import './styles.css';

export default function Perfil() {
const navigate = useNavigate();
  const token = localStorage.getItem('@BigodesToken') || 'visitante';

  const [usuario, setUsuario] = useState({
    nome: 'Maria Silva',
    email: 'maria.silva@email.com',
    telefone: '(45) 99999-8888',
    endereco: 'Rua das Araucárias, 123 - Centro, Foz do Iguaçu - PR',
    membroDesde: 'Janeiro / 2024'
  });

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  useEffect(() => {
    if (token === 'visitante') {
      navigate('/');
    }
  }, [token, navigate]);

  if (token === 'visitante') {
    return null;
  }
  
  const handleEditarPerfil = () => {
    setModalEditarAberto(true);
  };

  const handleSalvarPerfil = (dadosAtualizados) => {
    setUsuario(dadosAtualizados); 
    alert('Perfil atualizado com sucesso!');
  };

  const meusPets = [
    { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Vira-lata (SRD)', idade: '2 anos' },
    { id: 3, nome: 'Thor', especie: 'Gato', raca: 'Siamês', idade: '4 anos' }
  ];

  const historicoConsultas = [
    { id: 101, data: '15/05/2026', pet: 'Rex', motivo: 'Vacinação (V10)', status: 'Concluído' },
    { id: 102, data: '10/04/2026', pet: 'Thor', motivo: 'Clínico Geral', status: 'Concluído' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('@BigodesToken');
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