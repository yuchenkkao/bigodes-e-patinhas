import { Link } from 'react-router-dom';
import { FaPaw, FaPlus } from 'react-icons/fa';
import './styles.css';

export default function DadosPet({ pets }) {
  return (
    <div className="perfil-card meus-pets-box">
      <div className="card-header-perfil">
        <h3><FaPaw /> Meus Pets</h3>
      </div>

      <div className="lista-pets-perfil">
        {pets.map(pet => (
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
  );
}