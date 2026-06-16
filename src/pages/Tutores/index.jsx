import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaSearch, FaPlus, FaPaw } from 'react-icons/fa';
import './styles.css';

export default function Tutores() {
  const token = localStorage.getItem('@BigodesToken') || 'visitante';

  const [pesquisa, setPesquisa] = useState('');

  const bancoTutores = [
    { id: 1, nome: 'Maria Silva', cpf: '123.456.789-00', telefone: '(45) 99911-2233', email: 'maria.silva@email.com', qtdPets: 2 },
    { id: 2, nome: 'Carlos Souza', cpf: '987.654.321-11', telefone: '(45) 99888-7766', email: 'carlos.souza@email.com', qtdPets: 1 },
    { id: 3, nome: 'Ana Costa', cpf: '456.789.123-22', telefone: '(45) 99122-3344', email: 'ana.costa@email.com', qtdPets: 1 },
    { id: 4, nome: 'Marcos Lima', cpf: '321.654.987-33', telefone: '(45) 98455-6677', email: 'marcos.lima@email.com', qtdPets: 1 },
    { id: 5, nome: 'Beatriz Reis', cpf: '789.123.456-44', telefone: '(45) 99233-8899', email: 'biatriz.reis@email.com', qtdPets: 3 },
  ];

  const tutoresFiltrados = bancoTutores.filter((tutor) =>
    tutor.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    tutor.cpf.includes(pesquisa) ||
    tutor.email.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="tutores-container">
      
      <div className="tutores-header">
        <div>
          <h2>Catálogo de Tutores</h2>
          <p>Gerencie o cadastro, informações de contato e vínculos dos clientes da clínica.</p>
        </div>

        {token === 'atendente' && (
          <Link to="/cadastrar-tutor" className="btn-cadastrar-tutor">
            <FaPlus /> Cadastrar Novo Tutor
          </Link>
        )}
      </div>

      <div className="search-tutor-container">
        <FaSearch className="search-tutor-icon" />
        <input 
          type="text" 
          placeholder="Pesquisar por nome, CPF ou e-mail do tutor..." 
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>

      <div className="tutores-grid">
        {tutoresFiltrados.length === 0 ? (
          <div className="nenhum-tutor">
            <FaUser className="icon-tutor-vazio" />
            <p>Nenhum tutor localizado com os termos informados.</p>
          </div>
        ) : (
          tutoresFiltrados.map((tutor) => (
            <div key={tutor.id} className="tutor-card">
              
              <div className="tutor-card-top">
                <div className="avatar-tutor-circle">
                  <FaUser className="avatar-tutor-icon" />
                </div>
                <span className="badge-pets-qtd">
                  <FaPaw /> {tutor.qtdPets} {tutor.qtdPets === 1 ? 'Pet' : 'Pets'}
                </span>
              </div>

              <div className="tutor-card-body">
                <h3>{tutor.nome}</h3>
                
                <p><FaIdCard /> <strong>CPF:</strong> {tutor.cpf}</p>
                <p><FaPhone /> <strong>Telefone:</strong> {tutor.telefone}</p>
                <p><FaEnvelope /> <strong>E-mail:</strong> {tutor.email}</p>
              </div>

              <div className="tutor-card-footer">
                <Link to={`/perfil-tutor/${tutor.id}`} className="btn-ver-tutor">
                  Visualizar Cadastro
                </Link>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}