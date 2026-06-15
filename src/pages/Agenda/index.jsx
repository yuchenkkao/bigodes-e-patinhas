import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './styles.css';

import { FaCheckCircle } from 'react-icons/fa';

export default function Agenda() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);


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

          <button className="btn-confirmar" onClick={confirmarAgendamento}>
            Confirmar Agendamento
          </button>
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