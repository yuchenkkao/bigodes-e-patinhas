import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPaw, FaWeight, FaCalendarAlt, FaUser, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import './styles.css';
import { listarTutores } from '../../data/services/tutoresService';
import { criarPet } from '../../data/services/petsService';

const RACAS_POR_ESPECIE = {
  Cachorro: ['SRD (Vira-lata)', 'Buldog Francês', 'Poodle', 'Golden Retriever', 'Shih Tzu', 'Yorkshire', 'Pastor Alemão', 'Pinscher', 'Rottweiler', 'Labrador', 'Dachshund (Salsicha)'],
  Gato: ['SRD', 'Siamês', 'Persa', 'Maine Coon', 'Angorá', 'Sphynx', 'Ragdoll', 'Bengal'],
  Ave: ['Calopsita', 'Periquito', 'Papagaio', 'Canário', 'Agapornis'],
  Outro: ['SRD']
};

export default function CadastrarPet() {
  const navigate = useNavigate();

  const [nomePet, setNomePet] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [genero, setGenero] = useState('Macho');
  const [idTutor, setIdTutor] = useState('');

  const [tutores, setTutores] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    listarTutores()
      .then((dados) => setTutores(dados || []))
      .catch((err) => console.error('Erro ao carregar tutores:', err));
  }, []);

  const handleEspecieChange = (novaEspecie) => {
    setEspecie(novaEspecie);
    setRaca('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nomePet.trim()) return alert('Informe o nome do pet.');
    if (!especie) return alert('Selecione a espécie.');
    if (!idTutor) return alert('Selecione o tutor responsável.');

    const valorPeso = peso ? parseFloat(String(peso).replace(',', '.')) : null;
    const valorIdade = idade ? parseInt(String(idade).replace(/\D/g, ''), 10) : null;

    try {
      await criarPet({
        nomePet: nomePet.trim(),
        especieNome: especie,
        racaNome: raca || 'SRD',
        idadePet: isNaN(valorIdade) ? null : valorIdade,
        pesoPet: isNaN(valorPeso) ? null : valorPeso,
        generoNome: genero,
        idTutor: parseInt(idTutor, 10)
      });

      setMostrarModal(true);
    } catch (err) {
      alert('Não foi possível cadastrar o pet: ' + err.message);
    }
  };

  const racasDisponiveis = RACAS_POR_ESPECIE[especie] || [];

  return (
    <div className="cadastro-pet-container">
      <div className="back-link-container">
        <Link to="/pets" className="btn-voltar-link">
          <FaArrowLeft /> Voltar para a lista de Pets
        </Link>
      </div>

      <div className="cadastro-card">
        <div className="cadastro-header">
          <FaPaw className="user-main-icon" />
          <h2>Cadastrar Novo Pet</h2>
          <p>Preencha a ficha clínica e cadastral do paciente.</p>
        </div>

        <form onSubmit={handleSubmit} className="cadastro-form">
          <h3 className="secao-titulo">Informações do Pet</h3>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="nomePet">Nome do Pet *</label>
              <div className="input-with-icon">
                <FaPaw className="input-icon" />
                <input
                  type="text"
                  id="nomePet"
                  placeholder="Ex: Thor, Mel, Pipoca"
                  value={nomePet}
                  onChange={(e) => setNomePet(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="especie">Espécie *</label>
              <select
                id="especie"
                value={especie}
                onChange={(e) => handleEspecieChange(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Ave">Ave</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="raca">Raça</label>
              <input
                type="text"
                id="raca"
                list="lista-racas"
                placeholder={especie ? 'Selecione ou digite a raça...' : 'Selecione uma espécie primeiro'}
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
                disabled={!especie}
              />
              <datalist id="lista-racas">
                {racasDisponiveis.map((item, idx) => (
                  <option key={idx} value={item} />
                ))}
              </datalist>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="idade">Idade (anos)</label>
              <div className="input-with-icon">
                <FaCalendarAlt className="input-icon" />
                <input
                  type="number"
                  min="0"
                  max="40"
                  id="idade"
                  placeholder="Ex: 2"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="peso">Peso (kg)</label>
              <div className="input-with-icon">
                <FaWeight className="input-icon" />
                <input
                  type="number"
                  step="0.01"
                  id="peso"
                  placeholder="Ex: 0.8 ou 7.5"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group flex-1">
              <label>Gênero *</label>
              <div className="radio-group" style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                <label>
                  <input
                    type="radio"
                    value="Macho"
                    checked={genero === 'Macho'}
                    onChange={(e) => setGenero(e.target.value)}
                  /> Macho
                </label>
                <label>
                  <input
                    type="radio"
                    value="Fêmea"
                    checked={genero === 'Fêmea'}
                    onChange={(e) => setGenero(e.target.value)}
                  /> Fêmea
                </label>
              </div>
            </div>
          </div>

          <h3 className="secao-titulo">Responsável Legal</h3>

          <div className="form-group">
            <label htmlFor="tutorSelect">Tutor / Responsável *</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <select
                id="tutorSelect"
                value={idTutor}
                onChange={(e) => setIdTutor(e.target.value)}
                required
              >
                <option value="">Selecione o Tutor Responsável...</option>
                {tutores.map((t) => (
                  <option key={t.id || t.idTutor} value={t.id || t.idTutor}>
                    {t.nome || t.nomeTutor} — CPF: {t.cpf || t.CPF || 'S/ CPF'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-salvar-tutor">Salvar Pet</button>
          </div>
        </form>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FaCheckCircle className="modal-icon" />
            <h2>Pet Cadastrado!</h2>
            <p>O paciente <strong>{nomePet}</strong> foi registrado com sucesso.</p>
            <button
              className="btn-modal-fechar"
              onClick={() => {
                setMostrarModal(false);
                navigate('/pets');
              }}
            >
              Ir para Catálogo de Pets
            </button>
          </div>
        </div>
      )}
    </div>
  );
}