import { Link } from 'react-router-dom';
import { FaPaw, FaHourglassHalf, FaCalendarAlt, FaTachometerAlt, FaVenusMars, FaUser, FaSyringe } from 'react-icons/fa';
import './styles.css';

export default function FichaPet({ pet, onAbrirCarteirinha }) {
  if (!pet) return null;

  const nomeTutor = pet.nomeTutor || pet.tutorNome || pet.tutor?.nome || 'Não informado';
  const idTutor = pet.idTutor || pet.tutor?.id;

  return (
    <div className="pet-info-card">
      <div className="pet-profile-header">
        <div className="avatar-pet-grande">
          <FaPaw />
        </div>
        <h2>{pet.nome || pet.nomePet}</h2>
        <span className="badge-especie-tag">
          {(pet.especie || pet.nomeEspecie || 'PET').toUpperCase()}
        </span>
      </div>

      <div className="pet-details-body">
        <h3>Ficha Cadastral</h3>

        <p>
          <FaHourglassHalf /> <strong>Raça:</strong> {pet.raca || pet.nomeRaca || 'SRD'}
        </p>

        <p>
          <FaCalendarAlt /> <strong>Idade:</strong> {pet.idade !== null && pet.idade !== undefined ? `${pet.idade}` : 'Não informada'}
        </p>

        <p>
          <FaTachometerAlt /> <strong>Peso atual:</strong> {pet.peso !== null && pet.peso !== undefined ? `${pet.peso} kg` : 'Não informado'}
        </p>

        <p>
          <FaVenusMars /> <strong>Gênero:</strong> {pet.genero || pet.nomeGenero || 'Não informado'}
        </p>

        <div className="tutor-vinculo-box">
          <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaUser /> <strong>Tutor Responsável:</strong>{' '}
            {idTutor ? (
              <Link to={`/perfil-tutor/${idTutor}`} style={{ color: '#4068DE', fontWeight: 'bold', textDecoration: 'none' }}>
                {nomeTutor}
              </Link>
            ) : (
              <span>{nomeTutor}</span>
            )}
          </p>
        </div>
      </div>

      <button type="button" className="btn-abrir-carteirinha" onClick={onAbrirCarteirinha}>
        <FaSyringe /> Carteirinha de Vacina
      </button>
    </div>
  );
}