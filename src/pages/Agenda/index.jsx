import { useState, useEffect } from 'react';

import ResumoAgenda from '../../ui/partials/Agenda/ResumoAgenda';
import CalendarioBox from '../../ui/partials/Agenda/CalendarioBox';
import HorariosBox from '../../ui/partials/Agenda/HorariosBox';
import ModalEditarHorarios from '../../ui/partials/Agenda/ModalEditarHorarios';
import ModalAgendamento from '../../ui/partials/Agenda/ModalAgendamento';

import './styles.css';
import { useAuth } from '../../data/hooks/useAuth';
import { useHorarios } from '../../data/hooks/useHorarios';
import { useAgendamentos } from '../../data/hooks/useAgendamentos';

const API_VETERINARIOS_URL = 'http://localhost:8080/api/veterinarios';

export default function Agenda() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  const [veterinarios, setVeterinarios] = useState([]);
  const [idVeterinarioSelecionado, setIdVeterinarioSelecionado] = useState(1);

  const { papel: token } = useAuth();
  const { horarios, carregarHorarios, salvarHorarios } = useHorarios();
  const { agendamentos, criar: criarAgendamento, atualizarStatus } = useAgendamentos();

  useEffect(() => {
    let montado = true;

    async function buscarVeterinarios() {
      try {
        const res = await fetch(API_VETERINARIOS_URL);
        if (res.ok) {
          const dados = await res.json();
          if (montado && Array.isArray(dados) && dados.length > 0) {
            setVeterinarios(dados);
            setIdVeterinarioSelecionado(dados[0].id);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar veterinários:', err);
      }
    }

    buscarVeterinarios();

    return () => {
      montado = false;
    };
  }, []);

  useEffect(() => {
    if (idVeterinarioSelecionado && dataSelecionada) {
      carregarHorarios(idVeterinarioSelecionado, dataSelecionada);
    }
  }, [dataSelecionada, idVeterinarioSelecionado, carregarHorarios]);

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

        {veterinarios.length > 0 && (
          <div className="agenda-seletor-vet">
            <label>Veterinário(a):</label>
            <select
              value={idVeterinarioSelecionado}
              onChange={(e) => setIdVeterinarioSelecionado(Number(e.target.value))}
            >
              {veterinarios.map((vet) => (
                <option key={vet.id} value={vet.id}>
                  {vet.nome} {vet.crmv ? `- CRMV: ${vet.crmv}` : ''}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="agenda-content">
        <ResumoAgenda
          token={token}
          dataSelecionada={dataSelecionada}
          agendamentos={agendamentos}
          atualizarStatus={atualizarStatus}
        />

        <CalendarioBox 
          dataSelecionada={dataSelecionada} 
          aoMudarData={aoMudarData} 
        />
      </div>

      <HorariosBox 
        token={token}
        dataFormatada={dataFormatada}
        horarios={horarios}
        horarioSelecionado={horarioSelecionado}
        setHorarioSelecionado={setHorarioSelecionado}
        confirmarAgendamento={confirmarAgendamento}
        setMostrarModalEditar={setMostrarModalEditar}
      />

      <ModalAgendamento 
        mostrarModal={mostrarModal} 
        fecharModal={() => { setMostrarModal(false); setHorarioSelecionado(''); }} 
        dataSelecionada={dataSelecionada}
        horarioSelecionado={horarioSelecionado}
        idVeterinario={idVeterinarioSelecionado}
        onSalvarAgendamento={async (novoAgendamento) => {
          await criarAgendamento(novoAgendamento);
          await carregarHorarios(idVeterinarioSelecionado, dataSelecionada);
          alert(`Agendamento concluído para às ${novoAgendamento.horario}h!`);
        }}
      />

      <ModalEditarHorarios 
        mostrarModalEditar={mostrarModalEditar}
        setMostrarModalEditar={setMostrarModalEditar}
        dataSelecionada={dataSelecionada}
        horarios={horarios}
        idVeterinario={idVeterinarioSelecionado}
        salvarHorarios={salvarHorarios}
      />
    </div>
  );
}