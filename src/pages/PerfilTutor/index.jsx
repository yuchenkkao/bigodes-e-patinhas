import { useParams, Link } from 'react-router-dom';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaHome, FaPaw, FaArrowLeft, FaCalendarAlt, FaDna } from 'react-icons/fa';
import './styles.css';
import { useTutor } from '../../data/hooks/useTutores';
import { usePetsDoTutor } from '../../data/hooks/usePets';

export default function PerfilTutor() {
  const { id } = useParams();

  const { tutor } = useTutor(id);
  const { pets: petsDoTutor = [] } = usePetsDoTutor(id);

  if (!tutor) {
    return (
      <div className="perfil-erro-container">
        <h2>Tutor não localizado!</h2>
        <p>O código do cliente informado não consta no banco de dados.</p>
        <Link to="/tutores" className="btn-voltar-link"><FaArrowLeft /> Voltar para a lista</Link>
      </div>
    );
  }

  // Normalização de dados do endereço com múltiplos fallbacks
  const rua = tutor.endereco?.rua || tutor.rua || '';
  const numero = tutor.endereco?.numero || tutor.numero || '';
  const bairro = tutor.endereco?.bairro || tutor.endereco?.bairroNome || tutor.bairro || 'Não informado';
  const cidade = tutor.endereco?.cidade || tutor.endereco?.cidadeNome || tutor.cidade || '';
  const estado = tutor.endereco?.estado || tutor.endereco?.estadoNome || tutor.estado || '';
  const cep = tutor.endereco?.cep || tutor.cep || 'Não informado';

  const logradouroFormatado = rua 
    ? `${rua}${numero ? `, Nº ${numero}` : ''}`
    : 'Não informado';

  const cidadeEstadoFormatado = (cidade && estado) 
    ? `${cidade} - ${estado}` 
    : (cidade || estado || 'Não informado');

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
            <h2>{tutor.nome || tutor.nomeTutor}</h2>
            <span className="badge-cliente-ativo">Cliente Ativo</span>
          </div>

          <div className="tutor-details-body">
            <h3>Dados Pessoais</h3>
            <p><FaIdCard /> <strong>CPF:</strong> {tutor.cpf || tutor.CPF || 'Não informado'}</p>
            <p><FaPhone /> <strong>Telefone:</strong> {tutor.telefone || tutor.telefoneTutor || 'Não informado'}</p>
            <p><FaEnvelope /> <strong>E-mail:</strong> {tutor.email || tutor.emailTutor || 'Não informado'}</p>

            <h3><FaHome /> Endereço</h3>
            <p><strong>Logradouro:</strong> {logradouroFormatado}</p>
            <p><strong>Bairro:</strong> {bairro}</p>
            <p><strong>Cidade / Estado:</strong> {cidadeEstadoFormatado}</p>
            <p><strong>CEP:</strong> {cep}</p>
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
                <div key={pet.id || pet.idPet} className="mini-pet-card">
                  <div className="mini-pet-header">
                    <FaPaw className="mini-pet-icon" />
                    <h4>{pet.nome || pet.nomePet}</h4>
                    <span className="mini-badge-especie">{pet.especie || pet.nomeEspecie}</span>
                  </div>
                  <div className="mini-pet-body">
                    <p><FaDna /> {pet.raca || pet.nomeRaca || 'SRD'}</p>
                    <p><FaCalendarAlt /> {pet.idade || pet.idadePet ? `${pet.idade || pet.idadePet} anos` : 'Idade não informada'}</p>
                  </div>
                  <div className="mini-pet-footer">
                    <Link to={`/perfil-pet/${pet.id || pet.idPet}`} className="btn-mini-perfil">
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