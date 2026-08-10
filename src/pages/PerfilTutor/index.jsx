import { useParams, Link } from 'react-router-dom';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaHome, FaPaw, FaArrowLeft, FaCalendarAlt, FaDna } from 'react-icons/fa';
import './styles.css';
import { useTutor } from '../../data/hooks/useTutores';
import { usePetsDoTutor } from '../../data/hooks/usePets';

export default function PerfilTutor() {
  const { id } = useParams();

  const { tutor } = useTutor(id);
  const { pets: petsDoTutor } = usePetsDoTutor(id);

  if (!tutor) {
    return (
      <div className="perfil-erro-container">
        <h2>Tutor não localizado!</h2>
        <p>O código do cliente informado não consta no banco de dados.</p>
        <Link to="/tutores" className="btn-voltar-link"><FaArrowLeft /> Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div className="perfil-tutor-container">
      
      <div className="back-link-container">
        <Link to="/tutores" className="btn-voltar-link">
          <FaArrowLeft /> Voltar para Tutores
        </Link>
      </div>

      <div className="perfil-layout">
        
        <div className="tutor-info-card">
          <div className="tutor-profile-header">
            <div className="avatar-tutor-grande">
              <FaUser />
            </div>
            <h2>{tutor.nome}</h2>
            <span className="badge-cliente-ativo">Cliente Ativo</span>
          </div>

          <div className="tutor-details-body">
            <h3>Dados Pessoais</h3>
            <p><FaIdCard /> <strong>CPF:</strong> {tutor.cpf}</p>
            <p><FaPhone /> <strong>Telefone:</strong> {tutor.telefone}</p>
            <p><FaEnvelope /> <strong>E-mail:</strong> {tutor.email}</p>

            <h3><FaHome /> Endereço</h3>
            <p><strong>Logradouro:</strong> {tutor.endereco?.rua}, Nº {tutor.endereco?.numero}</p>
            <p><strong>Bairro:</strong> {tutor.endereco?.bairroNome}</p>
            <p><strong>Cidade / Estado:</strong> {tutor.endereco?.cidadeNome} - {tutor.endereco?.estadoNome}</p>
            <p><strong>CEP:</strong> {tutor.endereco?.cep}</p>
          </div>
        </div>

        <div className="tutor-pets-section">
          <h3>Pets Vinculados a este Responsável</h3>
          
          <div className="perfil-pets-grid">
            {petsDoTutor.length === 0 ? (
              <div className="tutor-sem-pets">
                <FaPaw className="icon-sem-pets" />
                <p>Este tutor ainda não possui animais vinculados ao seu cadastro.</p>
              </div>
            ) : (
              petsDoTutor.map((pet) => (
                <div key={pet.id} className="mini-pet-card">
                  <div className="mini-pet-header">
                    <FaPaw className="mini-pet-icon" />
                    <h4>{pet.nome}</h4>
                    <span className="mini-badge-especie">{pet.especie}</span>
                  </div>
                  <div className="mini-pet-body">
                    <p><FaDna /> {pet.raca}</p>
                    <p><FaCalendarAlt /> {pet.idade}</p>
                  </div>
                  <div className="mini-pet-footer">
                    <Link to={`/perfil-pet/${pet.id}`} className="btn-mini-perfil">
                      Ver Ficha do Pet
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}