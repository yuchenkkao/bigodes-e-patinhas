import { useState } from 'react';

import ResumoAgenda from '../../ui/partials/Agenda/ResumoAgenda';
import CalendarioBox from '../../ui/partials/Agenda/CalendarioBox';
import HorariosBox from '../../ui/partials/Agenda/HorariosBox';
import ModalEditarHorarios from '../../ui/partials/Agenda/ModalEditarHorarios';
import ModalAgendamento from '../../ui/partials/Agenda/ModalAgendamento';

import './styles.css';
import { useAuth } from '../../data/hooks/useAuth';
import { useHorarios } from '../../data/hooks/useHorarios';
import { useAgendamentos } from '../../data/hooks/useAgendamentos';

export default function Agenda() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  const { papel: token } = useAuth();
  const { horarios, toggleHorario } = useHorarios();
  const { agendamentos, criar: criarAgendamento, atualizarStatus } = useAgendamentos();

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
        <ResumoAgenda token={token} dataSelecionada={dataSelecionada} agendamentos={agendamentos} atualizarStatus={atualizarStatus}/>

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
        onSalvarAgendamento={async (novoAgendamento) => {
          await criarAgendamento(novoAgendamento);
          alert(`Agendamento concluído para às ${novoAgendamento.horario}h!`);
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