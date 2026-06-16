import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaUser, FaCalendarAlt, FaSearch, FaPlus, FaDna } from 'react-icons/fa';
import './styles.css';

export default function Pets() {

  const token = localStorage.getItem('@BigodesToken') || 'visitante';


  const [pesquisa, setPesquisa] = useState('');


  const bancoPets = [
    { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Vira-lata (SRD)', idade: '2 anos', tutor: 'Maria Silva' },
    { id: 2, nome: 'Mingau', especie: 'Gato', raca: 'Persa', idade: '1 ano', tutor: 'Carlos Souza' },
    { id: 3, nome: 'Luna', especie: 'Cachorro', raca: 'Poodle', idade: '3 anos', tutor: 'Ana Costa' },
    { id: 4, nome: 'Nikolas', especie: 'Cachorro', raca: 'Pinscher', idade: '5 meses', tutor: 'Victor' },
    { id: 5, nome: 'Pipoca', especie: 'Roedor', raca: 'Hamster Sírio', idade: '8 meses', tutor: 'Marcos Lima' },
    { id: 6, nome: 'Mel', especie: 'Cachorro', raca: 'Golden Retriever', idade: '4 anos', tutor: 'Beatriz Reis' },
  ];

  const petsFiltrados = bancoPets.filter((pet) =>
    pet.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    pet.tutor.toLowerCase().includes(pesquisa.toLowerCase())
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
                <p><FaUser /> <strong>Tutor:</strong> {pet.tutor}</p>
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