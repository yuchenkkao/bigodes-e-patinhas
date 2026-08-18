import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaSearch, FaPlus, FaPaw } from 'react-icons/fa';
import './styles.css';
import { useAuth } from '../../data/hooks/useAuth';
import { useTutores } from '../../data/hooks/useTutores';

export default function Tutores() {
  const { papel: token } = useAuth();
  const { tutores } = useTutores();

  const [pesquisa, setPesquisa] = useState('');

  // Filtro seguro tratando campos nulos/undefined e variações de nomenclatura
  const tutoresFiltrados = (tutores || []).filter((tutor) => {
    const nome = tutor.nome || tutor.nomeTutor || '';
    const cpf = tutor.cpf || tutor.CPF || '';
    const email = tutor.email || tutor.emailTutor || '';
    const termo = pesquisa.toLowerCase();

    return (
      nome.toLowerCase().includes(termo) ||
      cpf.includes(termo) ||
      email.toLowerCase().includes(termo)
    );
  });

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
          tutoresFiltrados.map((tutor) => {
            const id = tutor.id || tutor.idTutor;
            const nome = tutor.nome || tutor.nomeTutor || 'Sem nome';
            const cpf = tutor.cpf || tutor.CPF || 'Não informado';
            const telefone = tutor.telefone || tutor.telefoneTutor || 'Não informado';
            const email = tutor.email || tutor.emailTutor || 'Não informado';
            const qtdPets = tutor.qtdPets || 0;

            return (
              <div key={id || Math.random()} className="tutor-card">
                <div className="tutor-card-top">
                  <div className="avatar-tutor-circle">
                    <FaUser className="avatar-tutor-icon" />
                  </div>
                  <span className="badge-pets-qtd">
                    <FaPaw /> {qtdPets} {qtdPets === 1 ? 'Pet' : 'Pets'}
                  </span>
                </div>

                <div className="tutor-card-body">
                  <h3>{nome}</h3>
                  <p><FaIdCard /> <strong>CPF:</strong> {cpf}</p>
                  <p><FaPhone /> <strong>Telefone:</strong> {telefone}</p>
                  <p><FaEnvelope /> <strong>E-mail:</strong> {email}</p>
                </div>

                <div className="tutor-card-footer">
                  <Link to={`/perfil-tutor/${id}`} className="btn-ver-tutor">
                    Visualizar Cadastro
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}