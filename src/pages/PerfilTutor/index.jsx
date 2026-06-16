import { useParams, Link } from 'react-router-dom';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaHome, FaPaw, FaArrowLeft, FaCalendarAlt, FaDna } from 'react-icons/fa';
import './styles.css';

export default function PerfilTutor() {
  const { id } = useParams();

  const bancoTutores = [
    { id: 1, nome: 'Maria Silva', cpf: '123.456.789-00', telefone: '(45) 99911-2233', email: 'maria.silva@email.com', rua: 'Av. Brasil', numero: '1500', bairro: 'Centro', cidade: 'Foz do Iguaçu' },
    { id: 2, nome: 'Carlos Souza', cpf: '987.654.321-11', telefone: '(45) 99888-7766', email: 'carlos.souza@email.com', rua: 'Rua Paraná', numero: '320', bairro: 'Vila A', cidade: 'Foz do Iguaçu' },
    { id: 3, nome: 'Ana Costa', cpf: '456.789.123-22', telefone: '(45) 99122-3344', email: 'ana.costa@email.com', rua: 'Av. Jorge Schimmelpfeng', numero: '85', bairro: 'Maracanã', cidade: 'Foz do Iguaçu' },
    { id: 4, nome: 'Marcos Lima', cpf: '321.654.987-33', telefone: '(45) 98455-6677', email: 'marcos.lima@email.com', rua: 'Rua República Argentina', numero: '2400', bairro: 'Vila Yolanda', cidade: 'Foz do Iguaçu' },
    { id: 5, nome: 'Beatriz Reis', cpf: '789.123.456-44', telefone: '(45) 99233-8899', email: 'biatriz.reis@email.com', rua: 'Av. das Cataratas', numero: '500', bairro: 'Vila Yolanda', cidade: 'Foz do Iguaçu' },
  ];

  const bancoPets = [
    { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Vira-lata (SRD)', idade: '2 anos', tutor: 'Maria Silva' },
    { id: 2, nome: 'Mingau', especie: 'Gato', raca: 'Persa', idade: '1 ano', tutor: 'Carlos Souza' },
    { id: 3, nome: 'Luna', especie: 'Cachorro', raca: 'Poodle', idade: '3 anos', tutor: 'Ana Costa' },
    { id: 4, nome: 'Thor', especie: 'Gato', raca: 'Siamês', idade: '5 meses', tutor: 'Maria Silva' }, 
    { id: 5, nome: 'Pipoca', especie: 'Roedor', raca: 'Hamster Sírio', idade: '8 meses', tutor: 'Marcos Lima' },
    { id: 6, nome: 'Mel', especie: 'Cachorro', raca: 'Golden Retriever', idade: '4 anos', tutor: 'Beatriz Reis' },
  ];

  const tutor = bancoTutores.find((t) => t.id === Number(id));

  if (!tutor) {
    return (
      <div className="perfil-erro-container">
        <h2>Tutor não localizado!</h2>
        <p>O código do cliente informado não consta no banco de dados.</p>
        <Link to="/tutores" className="btn-voltar-link"><FaArrowLeft /> Voltar para a lista</Link>
      </div>
    );
  }

  const petsDoTutor = bancoPets.filter((pet) => pet.tutor === tutor.nome);

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
            <p><strong>Logradouro:</strong> {tutor.rua}, Nº {tutor.numero}</p>
            <p><strong>Bairro:</strong> {tutor.bairro}</p>
            <p><strong>Cidade:</strong> {tutor.cidade}</p>
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