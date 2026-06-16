import { useState } from 'react';

import ResumoAgenda from './components/ResumoAgenda';
import CalendarioBox from './components/CalendarioBox';
import HorariosBox from './components/HorariosBox';
import ModalEditarHorarios from './components/ModalEditarHorarios';
import ModalAgendamento from './components/ModalAgendamento';

import './styles.css';

export default function Agenda() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  const token = localStorage.getItem('@BigodesToken') || 'visitante';

  const [horarios, setHorarios] = useState([
    { hora: '08:00', ativo: true },
    { hora: '09:00', ativo: true },
    { hora: '10:30', ativo: true },
    { hora: '11:00', ativo: true },
    { hora: '14:00', ativo: true },
    { hora: '15:30', ativo: true },
    { hora: '16:00', ativo: true },
    { hora: '17:30', ativo: true }
  ]);

  const toggleHorario = (horaParaMudar) => {
    setHorarios(horarios.map(h => 
      h.hora === horaParaMudar ? { ...h, ativo: !h.ativo } : h
    ));
  };

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

  return (
    <div className="agenda-container">
      <div className="agenda-header">
        <h2>Agendar Consulta</h2>
        <p>Selecione a data e o horário desejado para o atendimento.</p>
      </div>

      <div className="agenda-content">
        <ResumoAgenda token={token} dataSelecionada={dataSelecionada}/>
        
        <CalendarioBox 
          dataSelecionada={dataSelecionada} 
          aoMudarData={aoMudarData} 
        />

        <HorariosBox 
          token={token}
          dataFormatada={dataFormatada}
          horarios={horarios}
          horarioSelecionado={horarioSelecionado}
          setHorarioSelecionado={setHorarioSelecionado}
          confirmarAgendamento={confirmarAgendamento}
          setMostrarModalEditar={setMostrarModalEditar}
        />
      </div>

      <ModalAgendamento 
        mostrarModal={mostrarModal} 
        fecharModal={() => { setMostrarModal(false); setHorarioSelecionado(''); }} 
        dataSelecionada={dataSelecionada}
        horarioSelecionado={horarioSelecionado}
        onSalvarAgendamento={(novoAgendamento) => {
          console.log('Dados salvos do agendamento:', novoAgendamento);
          alert(`Agendamento concluído para às ${novoAgendamento.hora}h!`);
        }}
      />

      <ModalEditarHorarios 
        mostrarModalEditar={mostrarModalEditar}
        setMostrarModalEditar={setMostrarModalEditar}
        horarios={horarios}
        toggleHorario={toggleHorario}
      />
    </div>
  );
}