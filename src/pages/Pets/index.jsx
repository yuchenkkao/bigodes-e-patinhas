import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaSearch, FaPlus, FaUser, FaDna, FaWeight, FaCalendarAlt } from 'react-icons/fa';
import './styles.css';
import { listarPets } from '../../data/services/petsService';
import { useAuth } from '../../data/hooks/useAuth';

export default function Pets() {
  const { papel: token } = useAuth();
  const [pets, setPets] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    listarPets()
      .then((data) => setPets(data || []))
      .catch((err) => console.error('Erro ao buscar pets:', err));
  }, []);

  const petsFiltrados = pets.filter((pet) => {
    const nome = pet.nome || '';
    const raca = pet.raca || '';
    const especie = pet.especie || '';
    const nomeTutor = pet.nomeTutor || '';
    const termo = pesquisa.toLowerCase();

    return (
      nome.toLowerCase().includes(termo) ||
      raca.toLowerCase().includes(termo) ||
      especie.toLowerCase().includes(termo) ||
      nomeTutor.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="tutores-container">
      <div className="tutores-header">
        <div>
          <h2>Catálogo de Pacientes (Pets)</h2>
          <p>Consulte todos os pets cadastrados na clínica e seus respectivos tutores.</p>
        </div>

        {token === 'atendente' && (
          <Link to="/cadastrar-pet" className="btn-cadastrar-tutor">
            <FaPlus /> Cadastrar Novo Pet
          </Link>
        )}
      </div>

      <div className="search-tutor-container">
        <FaSearch className="search-tutor-icon" />
        <input
          type="text"
          placeholder="Pesquisar por nome do pet, espécie, raça ou tutor..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>

      <div className="tutores-grid">
        {petsFiltrados.length === 0 ? (
          <div className="nenhum-tutor">
            <FaPaw className="icon-tutor-vazio" />
            <p>Nenhum paciente localizado com os termos informados.</p>
          </div>
        ) : (
          petsFiltrados.map((pet) => (
            <div key={pet.id} className="tutor-card">
              <div className="tutor-card-top">
                <div className="avatar-tutor-circle">
                  <FaPaw className="avatar-tutor-icon" />
                </div>
                <span className="badge-pets-qtd">{pet.especie || 'Pet'}</span>
              </div>

              <div className="tutor-card-body">
                <h3>{pet.nome}</h3>
                <p><FaDna /> <strong>Raça:</strong> {pet.raca || 'SRD'}</p>
                <p><FaUser /> <strong>Tutor:</strong> {pet.nomeTutor || 'Não vinculado'}</p>
                <p><FaCalendarAlt /> <strong>Idade:</strong> {pet.idade || 'Não informada'}</p>
                <p><FaWeight /> <strong>Peso:</strong> {pet.peso ? `${pet.peso} kg` : 'Não informado'}</p>
              </div>

              <div className="tutor-card-footer">
                <Link to={`/perfil-pet/${pet.id}`} className="btn-ver-tutor">
                  Visualizar Ficha
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}