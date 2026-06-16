import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaWeight, FaCalendarAlt, FaUser, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { MdNotes } from 'react-icons/md';
import './styles.css';

export default function CadastroPet() {

  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [genero, setGenero] = useState('');
  const [tutor, setTutor] = useState('');
  const [observacoes, setObservacoes] = useState('');


  const [mostrarModal, setMostrarModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!nome || !especie || !tutor) {
      alert('Por favor, preencha os campos obrigatórios (Nome, Espécie e Tutor)!');
      return;
    }


    const novoPet = { nome, especie, raca, idade, peso, genero, tutor, observacoes };
    console.log('Salvando novo pet:', novoPet);


    setMostrarModal(true);
  };

  const limparFormulario = () => {
    setNome('');
    setEspecie('');
    setRaca('');
    setIdade('');
    setPeso('');
    setGenero('');
    setTutor('');
    setObservacoes('');
    setMostrarModal(false);
  };

  return (
    <div className="cadastro-pet-container">
      
      <div className="back-link-container">
        <Link to="/pets" className="btn-voltar-link">
          <FaArrowLeft /> Voltar para Pets
        </Link>
      </div>

      <div className="cadastro-card">
        <div className="cadastro-header">
          <FaPaw className="paw-main-icon" />
          <h2>Cadastrar Novo Pet</h2>
          <p>Preencha a ficha clínica e cadastral do paciente.</p>
        </div>

        <form onSubmit={handleSubmit} className="cadastro-form">
          
          <h3 className="secao-titulo">Informações do Pet</h3>
          
          <div className="form-row">
            <div className="form-group flex-2">
              <label htmlFor="nome">Nome do Pet *</label>
              <div className="input-with-icon">
                <FaPaw className="input-icon" />
                <input type="text" id="nome" placeholder="Ex: Thor, Mel, Pipoca" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="especie">Espécie *</label>
              <select id="especie" value={especie} onChange={(e) => setEspecie(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="ave">Ave</option>
                <option value="roedor">Roedor</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="raca">Raça</label>
              <input type="text" id="raca" placeholder="Ex: Poodle, SRD, Persa" value={raca} onChange={(e) => setRaca(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="idade">Idade / Tempo de Vida</label>
              <div className="input-with-icon">
                <FaCalendarAlt className="input-icon" />
                <input type="text" id="idade" placeholder="Ex: 2 anos, 5 meses" value={idade} onChange={(e) => setIdade(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="peso">Peso (kg)</label>
              <div className="input-with-icon">
                <FaWeight className="input-icon" />
                <input type="number" step="0.1" id="peso" placeholder="Ex: 7.5" value={peso} onChange={(e) => setPeso(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label>Gênero</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="genero" value="macho" checked={genero === 'macho'} onChange={(e) => setGenero(e.target.value)} />
                  Macho
                </label>
                <label className="radio-label">
                  <input type="radio" name="genero" value="femea" checked={genero === 'femea'} onChange={(e) => setGenero(e.target.value)} />
                  Fêmea
                </label>
              </div>
            </div>
          </div>


          <h3 className="secao-titulo">Responsável Legal</h3>
          
          <div className="form-group">
            <label htmlFor="tutor">Buscar Tutor / Responsável *</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input type="text" id="tutor" placeholder="Digite o nome ou CPF do tutor" value={tutor} onChange={(e) => setTutor(e.target.value)} />
            </div>
          </div>


          <h3 className="secao-titulo">Observações Clínicas</h3>
          
          <div className="form-group">
            <label htmlFor="observacoes">Alergias, Restrições ou Notas Médicas</label>
            <div className="textarea-with-icon">
              <MdNotes className="textarea-icon" />
              <textarea id="observacoes" rows="4" placeholder="Ex: Alérgico a dipirona, animal castrado, proprietário relatou desmaios..." value={observacoes} onChange={(e) => setObservacoes(e.target.value)}></textarea>
            </div>
          </div>


          <div className="form-actions">
            <button type="submit" className="btn-salvar-pet">Salvar</button>
          </div>

        </form>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FaCheckCircle className="modal-icon" />
            <h2>Pet Cadastrado!</h2>
            <p>O prontuário de <strong>{nome}</strong> foi aberto e indexado com sucesso no sistema.</p>
            
            <div className="modal-detalhes">
              <p>🐾 <strong>Paciente:</strong> {nome} ({especie})</p>
              <p>👤 <strong>Tutor:</strong> {tutor}</p>
            </div>

            <button className="btn-modal-fechar" onClick={limparFormulario}>
             Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}