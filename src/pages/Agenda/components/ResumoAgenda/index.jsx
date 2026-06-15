import { Link } from 'react-router-dom';
import { FaUserCheck, FaStethoscope, FaCalendarCheck } from 'react-icons/fa';
import './styles.css';


export default function ResumoAgenda({ token, dataSelecionada }) {
  

  const bancoDeDadosAtendimentos = [
    { id: 1, data: '15/06/2026', pet: 'Rex', tutor: 'Maria', hora: '14:00', motivo: 'Vacinação', veterinario: 'Mariana' },
    { id: 2, data: '15/06/2026', pet: 'Mingau', tutor: 'Carlos', hora: '15:30', motivo: 'Saúde Bucal', veterinario: 'Mariana' },
    { id: 3, data: '16/06/2026', pet: 'Luna', tutor: 'Ana', hora: '16:00', motivo: 'Clínico Geral', veterinario: 'Eduardo' },
    { id: 4, data: '16/06/2026', pet: 'Nikolas', tutor: 'Carolina', hora: '09:00', motivo: 'Retorno', veterinario: 'Mariana' },
    { id: 5, data: '17/06/2026', pet: 'Pipoca', tutor: 'Marcos', hora: '10:30', motivo: 'Castração', veterinario: 'Eduardo' },
  ];

  const handleConfirmarPresenca = (pet) => {
    alert(`Presença confirmada para o pet ${pet}! Ele já pode ser chamado.`);
  };

 
  if (token !== 'atendente' && token !== 'veterinario' && token !== 'gestor') return null;

  
  const dataStringAlvo = dataSelecionada.toLocaleDateString('pt-BR');

 
  const atendimentosDoDia = bancoDeDadosAtendimentos.filter(
    (atend) => atend.data === dataStringAlvo
  );


  const hojeString = new Date().toLocaleDateString('pt-BR');

  const ehHoje = dataStringAlvo === hojeString;
  const tituloPainel = ehHoje ? "Atendimentos de Hoje" : `Agenda de ${dataStringAlvo}`;

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
                {token === 'atendente' && ehHoje && (
                    <button 
                    className="btn-acao-atend" 
                    onClick={() => handleConfirmarPresenca(atend.pet)} 
                    title="Confirmar Presença"
                    >
                    <FaUserCheck /> Presença
                    </button>
                )}

                {token === 'veterinario' && ehHoje && (
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
          ))
        )}

      </div>
    </div>
  );
}