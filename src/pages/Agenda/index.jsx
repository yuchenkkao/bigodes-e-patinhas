import { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './styles.css';
import { FaHistory } from "react-icons/fa";
import { FaCheckCircle, FaUserCheck, FaStethoscope } from 'react-icons/fa';

export default function Agenda() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  const token = localStorage.getItem('@BigodesToken') || 'visitante';

  const proximosAtendimentos = [
    { id: 1, pet: 'Rex', tutor: 'Maria', hora: '14:00', motivo: 'Vacinação' },
    { id: 2, pet: 'Mingau', tutor: 'Carlos', hora: '15:30', motivo: 'Saúde Bucal' },
    { id: 3, pet: 'Luna', tutor: 'Ana', hora: '16:00', motivo: 'Clínico Geral' },
  ];

  const handleConfirmarPresenca = (pet) => {
    alert(`Presença confirmada para o pet ${pet}! Ele já pode ser chamado.`);
  };

  const horariosDisponiveis = [
    '08:00', '09:00', '10:30', '11:00', 
    '14:00', '15:30', '16:00', '17:30'
  ];


  const aoMudarData = (novaData) => {
    setDataSelecionada(novaData);
    setHorarioSelecionado(''); 
  };


  const dataFormatada = dataSelecionada.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const confirmarAgendamento = () => {
    if (!horarioSelecionado) {
      alert('Por favor, selecione um horário antes de confirmar!');
      return;
    }
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setHorarioSelecionado(''); 
  };

  return (
    <div className="agenda-container">
      <div className="agenda-header">
        <h2>Agendar Consulta</h2>
        <p>Selecione a data e o horário desejado para o atendimento.</p>
      </div>

      <div className="agenda-content">

        {(token === 'atendente' || token === 'veterinario' || token === 'gestor') && (
          <div className="proximos-box">
            <h3>Atendimentos de Hoje</h3>
            <div className="lista-atendimentos">
              {proximosAtendimentos.map((atend) => (
                <div key={atend.id} className="atendimento-card">
                  <div className="atend-info">
                    <span className="atend-hora">{atend.hora}</span>
                    <h4>{atend.pet} <span className="atend-tutor">({atend.tutor})</span></h4>
                    <p>{atend.motivo}</p>
                  </div>
        <div className="atend-acoes">
                    {/* Apenas a ATENDENTE pode confirmar a presença */}
                    {token === 'atendente' && (
                      <button 
                        className="btn-acao-atend" 
                        onClick={() => handleConfirmarPresenca(atend.pet)}
                        title="Confirmar Presença"
                      >
                        <FaUserCheck /> Presença
                      </button>
                    )}

            {token === 'veterinario' && (
                      <Link 
                        to={`/atendimento/${atend.id}`} 
                        className="btn-acao-vet"
                        title="Iniciar Consulta (Prontuário)"
                      >
                        <FaStethoscope /> Atender
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        
        <div className="calendario-box">
          <Calendar 
            onChange={aoMudarData} 
            value={dataSelecionada} 
            minDate={new Date()} 
            className="calendario-customizado"
          />
        </div>

        <div className="horarios-box">
          <h3>Horários para: <span>{dataFormatada}</span></h3>
          
          <div className="grid-horarios">
            {horariosDisponiveis.map((horario) => (
              <button
                key={horario}
                className={`btn-horario ${horarioSelecionado === horario ? 'selecionado' : ''}`}
                onClick={() => setHorarioSelecionado(horario)}
              >
                {horario}
              </button>
            ))}
          </div>

          <button className="btn-agenda" onClick={confirmarAgendamento}>
            Confirmar Agendamento
          </button>

          {(token === 'cliente' || token === 'atendente') && (
          <Link to="/historico-agendamentos" className="btn-agenda"><FaHistory/> Histórico de Agendamentos</Link>
          )}

        </div>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FaCheckCircle className="modal-icon" />
            <h2>Agendamento Concluído!</h2>
            <p>O atendimento do seu pet foi marcado com sucesso.</p>
            
            <div className="modal-detalhes">
              <p>📅 <strong>Data:</strong> {dataFormatada}</p>
              <p>⏰ <strong>Horário:</strong> {horarioSelecionado}h</p>
            </div>

            <button className="btn-modal-fechar" onClick={fecharModal}>
              Fechar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}