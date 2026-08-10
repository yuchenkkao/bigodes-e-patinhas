import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaUser, FaCalendarAlt, FaSearch, FaPlus, FaDna } from 'react-icons/fa';
import './styles.css';
import { useAuth } from '../../data/hooks/useAuth';
import { usePets } from '../../data/hooks/usePets';

export default function Pets() {

  const { papel: token } = useAuth();
  const { pets } = usePets();

  const [pesquisa, setPesquisa] = useState('');

  const petsFiltrados = pets.filter((pet) =>
    pet.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    (pet.tutorNome || '').toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="catalog-container">
      
      <div className="catalog-header">
        <div>
          <h2>Catálogo de Pets</h2>
          <p>Consulte e gerencie as fichas cadastrais dos pacientes da clínica.</p>
        </div>


        {token === 'atendente' && (
          <Link to="/cadastrar-pet" className="btn-cadastrar-pet">
            <FaPlus /> Cadastrar Novo Pet
          </Link>
        )}
      </div>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Pesquisar por nome do pet ou do tutor..." 
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>


      <div className="pets-grid">
        {petsFiltrados.length === 0 ? (
          <div className="nenhum-pet">
            <FaPaw className="icon-vazio" />
            <p>Nenhum pet encontrado com esse nome ou tutor.</p>
          </div>
        ) : (
          petsFiltrados.map((pet) => (
            <div key={pet.id} className="pet-card">
              
  
              <div className="pet-avatar-box">
                <FaPaw className="pet-avatar-icon" />
                <span className="badge-especie">{pet.especie}</span>
              </div>

              <div className="pet-card-info">
                <h3>{pet.nome}</h3>
                
                <p><FaDna /> <strong>Raça:</strong> {pet.raca}</p>
                <p><FaCalendarAlt /> <strong>Idade:</strong> {pet.idade}</p>
                <p><FaUser /> <strong>Tutor:</strong> {pet.tutorNome}</p>
              </div>

              <div className="pet-card-footer">
                <Link to={`/perfil-pet/${pet.id}`} className="btn-ver-perfil">
                  Ver Ficha Clínica
                </Link>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}