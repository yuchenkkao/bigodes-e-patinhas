import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaPaw, FaHistory, FaSignOutAlt, FaEdit, FaPlus, FaCalendarCheck 
} from 'react-icons/fa';
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

  useEffect(() => {
    if (token === 'visitante') {
      navigate('/');
    }
  }, [token, navigate]);

  if (token === 'visitante') {
    return null;
  }

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
    navigate('/');
  };

  const handleEditarPerfil = () => {
    alert('Abertura do modal de edição de perfil (em breve)!');
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
          <div className="perfil-card info-pessoal">
            <div className="card-header-perfil">
              <h3><FaUser /> Meus Dados</h3>
              <button className="btn-editar-icon" onClick={handleEditarPerfil} title="Editar Dados">
                <FaEdit />
              </button>
            </div>
            
            <div className="info-pessoal-lista">
              <div className="info-item">
                <FaUser className="info-icon" />
                <div>
                  <strong>Nome Completo</strong>
                  <p>{usuario.nome}</p>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <strong>E-mail</strong>
                  <p>{usuario.email}</p>
                </div>
              </div>
              <div className="info-item">
                <FaPhone className="info-icon" />
                <div>
                  <strong>Telefone / WhatsApp</strong>
                  <p>{usuario.telefone}</p>
                </div>
              </div>
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <strong>Endereço</strong>
                  <p>{usuario.endereco}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="perfil-coluna-pets">
          
          <div className="perfil-card meus-pets-box">
            <div className="card-header-perfil">
              <h3><FaPaw /> Meus Pets</h3>
            </div>

            <div className="lista-pets-perfil">
              {meusPets.map(pet => (
                <div key={pet.id} className="pet-card-mini">
                  <div className="pet-card-mini-info">
                    <div className="pet-avatar-mini"><FaPaw /></div>
                    <div>
                      <h4>{pet.nome}</h4>
                      <p>{pet.especie} • {pet.raca}</p>
                    </div>
                  </div>
    
                  <Link to={`/perfil-pet/${pet.id}`} className="btn-ver-prontuario">
                    Ver Ficha
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="perfil-card historico-box">
            <div className="card-header-perfil">
              <h3><FaHistory /> Últimas Consultas</h3>
            </div>
            
            <table className="tabela-historico-perfil">
              <tbody>
                {historicoConsultas.map(consulta => (
                  <tr key={consulta.id}>
                    <td><FaCalendarCheck className="icone-data-tabela" /> <strong>{consulta.data}</strong></td>
                    <td>{consulta.pet}</td>
                    <td>{consulta.motivo}</td>
                    <td><span className="badge-status-concluido">{consulta.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  );
}