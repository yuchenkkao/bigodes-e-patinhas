import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { FaUserCheck, FaStethoscope, FaCalendarCheck, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';
import './styles.css';

export default function ResumoAgenda({ token, dataSelecionada }) {
  
  const [atendimentos, setAtendimentos] = useState([
    { id: 1, data: '17/06/2026', pet: 'Rex', tutor: 'Maria', hora: '14:00', motivo: 'Vacinação', veterinario: 'Mariana', status: 'Agendado' },
    { id: 2, data: '17/06/2026', pet: 'Mingau', tutor: 'Carlos', hora: '15:30', motivo: 'Saúde Bucal', veterinario: 'Mariana', status: 'Agendado' },
    { id: 3, data: '18/06/2026', pet: 'Luna', tutor: 'Ana', hora: '16:00', motivo: 'Clínico Geral', veterinario: 'Eduardo', status: 'Agendado' },
    { id: 4, data: '18/06/2026', pet: 'Nikolas', tutor: 'Carolina', hora: '09:00', motivo: 'Retorno', veterinario: 'Mariana', status: 'Agendado' },
    { id: 5, data: '19/06/2026', pet: 'Pipoca', tutor: 'Marcos', hora: '10:30', motivo: 'Castração', veterinario: 'Eduardo', status: 'Agendado' },
  ]);

  const handleMudarStatus = (id, novoStatus) => {
    setAtendimentos(prev =>
      prev.map(atend => atend.id === id ? { ...atend, status: novoStatus } : atend)
    );
  };

  if (token !== 'atendente' && token !== 'veterinario' && token !== 'gestor') return null;

  const dataStringAlvo = dataSelecionada.toLocaleDateString('pt-BR');

  const atendimentosDoDia = atendimentos.filter(
    (atend) => atend.data === dataStringAlvo
  );

  const hojeString = new Date().toLocaleDateString('pt-BR');
  const ehHoje = dataStringAlvo === hojeString;
  const tituloPainel = ehHoje ? "Atendimentos de Hoje" : `Agenda de ${dataStringAlvo}`;

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Concluído': return <span className="badge-resumo status-concluido"><FaCheckCircle /> Concluído</span>;
      case 'Cancelado': return <span className="badge-resumo status-cancelado"><FaTimesCircle /> Cancelado</span>;
      case 'Faltou': return <span className="badge-resumo status-faltou"><FaExclamationCircle /> Faltou</span>;
      default: return <span className="badge-resumo status-agendado"><FaHourglassHalf /> Agendado</span>;
    }
  };

  return (
    <div className="proximos-box">
      <h3>{tituloPainel}</h3>
      <div className="lista-atendimentos">
        
        {atendimentosDoDia.length === 0 ? (
          <div className="agenda-vazia">
            <FaCalendarCheck className="icon-vazio" />
            <p>Nenhum atendimento agendado para este dia.</p>
          </div>
        ) : (
          atendimentosDoDia.map((atend) => (
            <div key={atend.id} className="atendimento-card">
              <div className="atend-info">
                <span className="atend-hora">{atend.hora}</span>
                <h4>{atend.pet} <span className="atend-tutor">({atend.tutor})</span></h4>
                <p>{atend.motivo}</p>
                <p>Veterinário(a): {atend.veterinario}</p>
              </div>
              
              <div className="atend-acoes">
                {token === 'atendente' && (
                  <div className="seletor-status-container">
                    <label className="label-select-status">Status/Presença:</label>
                    <select
                      value={atend.status}
                      onChange={(e) => handleMudarStatus(atend.id, e.target.value)}
                      className={`select-status-resumo status-cor-${atend.status.toLowerCase()}`}
                    >
                      <option value="Agendado">⏳ Agendado</option>
                      <option value="Presente">✅ Concluído</option>
                      <option value="Cancelado">❌ Cancelado</option>
                      <option value="Faltou">⚠️ Faltou</option>
                    </select>
                  </div>
                )}

                {token === 'veterinario' && (
                  <div className="vet-acoes-wrapper">
                    {renderStatusBadge(atend.status)}
                    
                    {atend.status === 'Agendado' && (
                      <Link 
                        to={`/atendimento/${atend.id}`} 
                        className="btn-acao-vet" 
                        title="Iniciar Consulta"
                      >
                        <FaStethoscope /> Atender
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}