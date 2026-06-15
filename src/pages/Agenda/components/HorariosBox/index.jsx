import { Link } from 'react-router-dom';
import { FaHistory } from "react-icons/fa";
import './styles.css';

export default function HorariosBox({ 
  token, 
  dataFormatada, 
  horarios, 
  horarioSelecionado, 
  setHorarioSelecionado, 
  confirmarAgendamento, 
  setMostrarModalEditar 
}) {
  return (
    <div className="horarios-box">
      <h3>Horários para: <span>{dataFormatada}</span></h3>
      
      <div className="grid-horarios">
        {horarios
          .filter(h => h.ativo || token === 'veterinario') 
          .map((item) => (
            <button
              key={item.hora}
              disabled={!item.ativo && token !== 'veterinario'}
              className={`btn-horario ${horarioSelecionado === item.hora ? 'selecionado' : ''} ${!item.ativo ? 'bloqueado' : ''}`}
              onClick={() => item.ativo && setHorarioSelecionado(item.hora)}
            >
              {item.hora} {!item.ativo && '(Bloqueado)'}
            </button>
        ))}
      </div>

      {(token === 'cliente' || token === 'atendente') && (
        <>
          <button className="btn-agenda" onClick={confirmarAgendamento}>
            Confirmar Agendamento
          </button>
          <Link to="/historico-agendamentos" className="btn-agenda">
            <FaHistory/> Histórico de Agendamentos
          </Link>
        </>
      )}

      {token === 'veterinario' && (
        <>
          <button className="btn-agenda" onClick={() => setMostrarModalEditar(true)}>
            Editar Horários de Agendamento
          </button>
          <Link to="/historico-agendamentos" className="btn-agenda">
            <FaHistory /> Histórico de Atendimentos
          </Link>
        </>
      )}
    </div>
  );
}