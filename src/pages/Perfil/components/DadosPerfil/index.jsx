import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import './styles.css';

export default function DadosPerfil({ usuario, onEditar }) {
  return (
    <div className="perfil-card info-pessoal">
      <div className="card-header-perfil">
        <h3><FaUser /> Meus Dados</h3>
        <button className="btn-editar-icon" onClick={onEditar} title="Editar Dados">
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
  );
}