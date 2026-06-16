import { FaPaw, FaUser, FaCalendarAlt, FaWeight, FaDna, FaVenusMars } from 'react-icons/fa';
import { MdVaccines } from 'react-icons/md';
import './styles.css';

export default function FichaPet({ pet, onAbrirCarteirinha }) {
  return (
    <div className="pet-info-card">
      <div className="pet-profile-header">
        <div className="avatar-pet-grande"><FaPaw /></div>
        <h2>{pet.nome}</h2>
        <span className="badge-especie-tag">{pet.especie}</span>
      </div>

      <div className="pet-details-body">
        <h3>Ficha Cadastral</h3>
        <p><FaDna /> <strong>Raça:</strong> {pet.raca}</p>
        <p><FaCalendarAlt /> <strong>Idade:</strong> {pet.idade}</p>
        <p><FaWeight /> <strong>Peso atual:</strong> {pet.peso} kg</p>
        <p><FaVenusMars /> <strong>Gênero:</strong> {pet.genero}</p>
        
        <div className="tutor-vinculo-box">
          <p><FaUser /> <strong>Tutor Responsável:</strong></p>
          <h4>{pet.tutor}</h4>
        </div>

        <button type="button" className="btn-abrir-carteirinha" onClick={onAbrirCarteirinha}>
          <MdVaccines /> Carteirinha de Vacina
        </button>
      </div>
    </div>
  );
}