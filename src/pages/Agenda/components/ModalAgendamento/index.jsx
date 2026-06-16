import { useState, useEffect } from 'react';
import { FaCalendarDay, FaUser, FaPaw, FaStethoscope, FaNotesMedical, FaTimes, FaCheck } from 'react-icons/fa';
import './styles.css';

export default function ModalAgendamento({ mostrarModal, fecharModal, dataSelecionada, horarioSelecionado, onSalvarAgendamento }) {
  const token = localStorage.getItem('@BigodesToken') || 'visitante';
  const tutorLogadoPadrao = 'Maria Silva';

  // Coleções de dados simulados (Futuramente virão das suas telas de Configuração)
  const listaTutores = ['Maria Silva', 'Carlos Souza', 'Ana Costa', 'Marcos Lima'];
  const listaVets = ['Dra. Mariana', 'Dr. Eduardo'];
  const listaMotivos = ['Vacinação', 'Clínico Geral', 'Saúde Bucal', 'Castração'];

  const mapaPetsPorTutor = {
    'Maria Silva': ['Rex', 'Thor'],
    'Carlos Souza': ['Mingau'],
    'Ana Costa': ['Luna'],
    'Marcos Lima': ['Pipoca']
  };

  const [tutor, setTutor] = useState('');
  const [pet, setPet] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const [motivo, setMotivo] = useState('');
  const [petsDisponiveis, setPetsDisponiveis] = useState([]);

  useEffect(() => {
    if (mostrarModal) {
      if (token === 'cliente') {
        setTutor(tutorLogadoPadrao);
        setPetsDisponiveis(mapaPetsPorTutor[tutorLogadoPadrao] || []);
      } else {
        setTutor('');
        setPet('');
        setPetsDisponiveis([]);
      }
      setVeterinario('');
      setMotivo('');
    }
  }, [mostrarModal, token]);

  const handleMudarTutor = (novoTutor) => {
    setTutor(novoTutor);
    setPet('');
    if (novoTutor) {
      setPetsDisponiveis(mapaPetsPorTutor[novoTutor] || []);
    } else {
      setPetsDisponiveis([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tutor || !pet || !veterinario || !motivo) {
      alert('Por favor, selecione todas as informações obrigatórias!');
      return;
    }

    // Monta o agendamento idêntico às chaves lidas pelo seu ResumoAgenda
    const novoAgendamento = {
      id: Date.now(),
      data: dataSelecionada.toLocaleDateString('pt-BR'),
      hora: horarioSelecionado,
      tutor: tutor,
      pet: pet,
      veterinario: veterinario,
      motivo: motivo,
      status: 'Agendado'
    };

    onSalvarAgendamento(novoAgendamento);
    fecharModal();
  };

  if (!mostrarModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-agendamento">
        <div className="agendamento-header">
          <div className="agendamento-titulo">
            <div className="calendar-badge-icon"><FaCalendarDay /></div>
            <div>
              <h2>Preencher Agendamento</h2>
              <p>Horário reservado: <strong>{horarioSelecionado}</strong> do dia {dataSelecionada.toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
          <button type="button" className="btn-fechar-x" onClick={fecharModal}><FaTimes /></button>
        </div>

        <form onSubmit={handleSubmit} className="form-agendamento-corpo">
          {token !== 'cliente' ? (
            <div className="input-group-agendar">
              <label><FaUser /> Cliente / Tutor Responsável *</label>
              <select value={tutor} onChange={(e) => handleMudarTutor(e.target.value)}>
                <option value="">-- Selecione o Dono do Pet --</option>
                {listaTutores.map((tut, idx) => (
                  <option key={idx} value={tut}>{tut}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="info-tutor-estatico">
              <p>Agendamento direto para o seu perfil: <strong>{tutorLogadoPadrao}</strong></p>
            </div>
          )}

          <div className="input-group-agendar">
            <label><FaPaw /> Nome do Paciente (Pet) *</label>
            <select value={pet} onChange={(e) => setPet(e.target.value)} disabled={token !== 'cliente' && !tutor}>
              <option value="">{token !== 'cliente' && !tutor ? "Escolha o tutor primeiro..." : "-- Selecione o Pet --"}</option>
              {petsDisponiveis.map((pNome, idx) => (
                <option key={idx} value={pNome}>{pNome}</option>
              ))}
            </select>
          </div>

          <div className="input-group-agendar">
            <label><FaStethoscope /> Médico Veterinário *</label>
            <select value={veterinario} onChange={(e) => setVeterinario(e.target.value)}>
              <option value="">-- Selecione o Profissional --</option>
              {listaVets.map((vet, idx) => (
                <option key={idx} value={vet}>{vet}</option>
              ))}
            </select>
          </div>

          <div className="input-group-agendar">
            <label><FaNotesMedical /> Motivo / Procedimento *</label>
            <select value={motivo} onChange={(e) => setMotivo(e.target.value)}>
              <option value="">-- Escolha o Motivo --</option>
              {listaMotivos.map((mot, idx) => (
                <option key={idx} value={mot}>{mot}</option>
              ))}
            </select>
          </div>

          <div className="form-agendar-acoes">
            <button type="button" className="btn-cancelar-agendar" onClick={fecharModal}>Voltar</button>
            <button type="submit" className="btn-confirmar-agendar"><FaCheck /> Confirmar Vaga</button>
          </div>
        </form>
      </div>
    </div>
  );
}