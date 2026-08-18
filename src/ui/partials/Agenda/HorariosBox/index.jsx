import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaHistory } from 'react-icons/fa';
import './styles.css';

export default function HorariosBox({
  dataFormatada,
  horarios = [],
  horarioSelecionado,
  setHorarioSelecionado,
  confirmarAgendamento,
  setMostrarModalEditar,
  isVeterinario = true
}) {
  const navigate = useNavigate();

  const horariosDisponiveis = Array.isArray(horarios)
    ? horarios.filter((h) => {
        if (typeof h === 'string') return true;
        const ativo = h.isAtivo !== false && h.isativo !== false;
        const agendado = h.agendado === true || h.isAgendado === true;
        return ativo && !agendado;
      })
    : [];

  return (
    <div className="horarios-secao-bottom">
      <p className="horarios-label-sub">Horários disponíveis para:</p>
      <h3 className="horarios-data-titulo">{dataFormatada}</h3>

      {horariosDisponiveis.length === 0 ? (
        <p className="msg-sem-horarios">Nenhum horário disponível para este dia.</p>
      ) : (
        <div className="grid-horarios-chips">
          {horariosDisponiveis.map((item) => {
            const hora = typeof item === 'string' ? item : (item.horario || item.hora);
            const isSelecionado = horarioSelecionado === hora;

            return (
              <button
                key={hora}
                type="button"
                className={`btn-slot-disponivel ${isSelecionado ? 'selecionado' : ''}`}
                onClick={() => setHorarioSelecionado(hora)}
              >
                {hora}
              </button>
            );
          })}
        </div>
      )}

      <div className="grupo-botoes-agenda">
        {horarioSelecionado && (
          <button
            type="button"
            className="btn-agenda-acao-azul btn-destaque-agendar"
            onClick={confirmarAgendamento}
          >
            <FaCalendarAlt /> Agendar Consulta para às {horarioSelecionado}
          </button>
        )}

        {isVeterinario && (
          <button
            type="button"
            className="btn-agenda-acao-azul"
            onClick={() => setMostrarModalEditar(true)}
          >
            Editar Horários de Agendamento
          </button>
        )}

        <button
          type="button"
          className="btn-agenda-acao-azul"
          onClick={() => navigate('/historico-agendamentos')}
        >
          <FaHistory /> Histórico de Atendimentos
        </button>
      </div>
    </div>
  );
}