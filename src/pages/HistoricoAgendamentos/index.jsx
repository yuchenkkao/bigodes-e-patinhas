import { useState } from 'react';
import { 
  FaCalendarAlt, FaSearch, FaPaw, FaUser, FaClock, 
  FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaFilter, FaHourglassHalf, FaBan 
} from 'react-icons/fa';
import './styles.css';

export default function HistoricoAgendamentos() {
  const token = localStorage.getItem('@BigodesToken') || 'visitante';
  
  const tutorLogadoNome = 'Maria Silva';
  const veterinarioLogadoNome = 'Dra. Mariana';

  const [pesquisa, setPesquisa] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const [bancoAgendamentos, setBancoAgendamentos] = useState([
    { id: 1, petNome: 'Rex', especie: 'Cachorro', tutorNome: 'Maria Silva', data: '17/06/2026', horario: '14:00', veterinario: 'Dra. Mariana', motivo: 'Vacinação', status: 'Agendado' },
    { id: 2, petNome: 'Mingau', especie: 'Gato', tutorNome: 'Carlos Souza', data: '19/06/2026', horario: '10:30', veterinario: 'Dr. Eduardo', motivo: 'Clínico Geral', status: 'Agendado' },
    { id: 3, petNome: 'Rex', especie: 'Cachorro', tutorNome: 'Maria Silva', data: '15/06/2026', horario: '14:00', veterinario: 'Dra. Mariana', motivo: 'Vacinação', status: 'Concluído' },
    { id: 4, petNome: 'Mingau', especie: 'Gato', tutorNome: 'Carlos Souza', data: '14/06/2026', horario: '10:30', veterinario: 'Dr. Eduardo', motivo: 'Clínico Geral', status: 'Concluído' },
    { id: 5, petNome: 'Thor', especie: 'Gato', tutorNome: 'Maria Silva', data: '10/06/2026', horario: '16:15', veterinario: 'Dra. Mariana', motivo: 'Saúde Bucal', status: 'Cancelado' },
    { id: 6, petNome: 'Luna', especie: 'Cachorro', tutorNome: 'Ana Costa', data: '05/06/2026', horario: '09:00', veterinario: 'Dr. Eduardo', motivo: 'Cirurgia', status: 'Concluído' },
    { id: 7, petNome: 'Pipoca', especie: 'Roedor', tutorNome: 'Marcos Lima', data: '28/05/2026', horario: '11:00', veterinario: 'Dra. Mariana', motivo: 'Clínico Geral', status: 'Faltou' },
  ]);

  const handleCancelarAgendamento = (id, pet) => {
    const confirmar = window.confirm(`Tem certeza que deseja cancelar o agendamento do(a) ${pet}?`);
    if (confirmar) {
      setBancoAgendamentos(prev =>
        prev.map(item => item.id === id ? { ...item, status: 'Cancelado' } : item)
      );
    }
  };

  const obterAgendamentosPorCargo = () => {
    if (token === 'cliente') {
      return bancoAgendamentos.filter(item => item.tutorNome === tutorLogadoNome);
    }
    if (token === 'veterinario') {
      return bancoAgendamentos.filter(item => item.veterinario === veterinarioLogadoNome);
    }
    return bancoAgendamentos;
  };

  const agendamentosPorCargo = obterAgendamentosPorCargo();

  const agendamentosFiltrados = agendamentosPorCargo.filter(item => {
    const correspondePesquisa = 
      item.petNome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      item.tutorNome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      item.veterinario.toLowerCase().includes(pesquisa.toLowerCase());

    const correspondeStatus = filtroStatus === 'todos' || item.status.toLowerCase() === filtroStatus.toLowerCase();

    return correspondePesquisa && correspondeStatus;
  });

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Agendado': return <span className="badge-status status-agendado"><FaHourglassHalf /> Agendado</span>;
      case 'Concluído': return <span className="badge-status status-concluido"><FaCheckCircle /> Concluído</span>;
      case 'Cancelado': return <span className="badge-status status-cancelado"><FaTimesCircle /> Cancelado</span>;
      case 'Faltou': return <span className="badge-status status-faltou"><FaExclamationCircle /> Faltou</span>;
      default: return <span className="badge-status">{status}</span>;
    }
  };

  return (
    <div className="historico-container">
      
      <div className="historico-header">
        <div className="historico-titulo-box">
          <FaCalendarAlt className="icon-agenda-titulo" />
          <div>
            <h2>Painel de Agendamentos</h2>
            <p>
              {token === 'cliente' && `Consultas agendadas e histórico de seus pets`}
              {token === 'veterinario' && `Seus atendimentos e consultas sob a responsabilidade de ${veterinarioLogadoNome}`}
              {(token !== 'cliente' && token !== 'veterinario') && 'Controle geral de consultas futuras e histórico completo da clínica'}
            </p>
          </div>
        </div>
      </div>

      <div className="historico-toolbar">
        <div className="search-box-historico">
          <FaSearch className="search-icon-inside" />
          <input 
            type="text" 
            placeholder={token === 'cliente' ? "Buscar por pet ou motivo..." : "Buscar por pet, tutor ou motivo..."} 
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        <div className="filter-buttons-group">
          <span className="label-filtros"><FaFilter /> Filtrar:</span>
          <button className={`btn-filtro ${filtroStatus === 'todos' ? 'ativo' : ''}`} onClick={() => setFiltroStatus('todos')}>Todos</button>
          <button className={`btn-filtro ${filtroStatus === 'agendado' ? 'ativo' : ''}`} onClick={() => setFiltroStatus('agendado')}>Agendados</button>
          <button className={`btn-filtro ${filtroStatus === 'concluido' ? 'ativo' : ''}`} onClick={() => setFiltroStatus('concluido')}>Concluídos</button>
          <button className={`btn-filtro ${filtroStatus === 'cancelado' ? 'ativo' : ''}`} onClick={() => setFiltroStatus('cancelado')}>Cancelados</button>
          <button className={`btn-filtro ${filtroStatus === 'faltou' ? 'ativo' : ''}`} onClick={() => setFiltroStatus('faltou')}>Faltas</button>
        </div>
      </div>

      <div className="historico-table-wrapper">
        {agendamentosFiltrados.length > 0 ? (
          <table className="historico-tabela">
            <thead>
              <tr>
                <th>Paciente</th>
                {token !== 'cliente' && <th>Tutor Responsável</th>}
                <th>Data / Horário</th>
                <th>Médico Veterinário</th>
                <th>Motivo</th>
                <th>Status</th>
                {/* 🌟 MUDANÇA 3: Adiciona a coluna de Ações apenas para o Cliente */}
                {token === 'cliente' && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {agendamentosFiltrados.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="celula-pet">
                      <div className="avatar-pet-mini"><FaPaw /></div>
                      <div>
                        <strong>{item.petNome}</strong>
                        <span>{item.especie}</span>
                      </div>
                    </div>
                  </td>
                  
                  {token !== 'cliente' && (
                    <td>
                      <div className="celula-tutor">
                        <FaUser className="icon-sub-tutor" />
                        <span>{item.tutorNome}</span>
                      </div>
                    </td>
                  )}

                  <td>
                    <div className="celula-data">
                      <strong>{item.data}</strong>
                      <span><FaClock /> {item.horario}</span>
                    </div>
                  </td>

                  <td>
                    <span className="nome-vet-tabela">{item.veterinario}</span>
                  </td>

                  <td>
                    <span className="badge-motivo-historico">{item.motivo}</span>
                  </td>

                  <td>
                    {renderStatusBadge(item.status)}
                  </td>

                  {/* 🌟 MUDANÇA 4: Renderiza o botão de cancelar se for cliente e estiver agendado */}
                  {token === 'cliente' && (
                    <td>
                      {item.status === 'Agendado' ? (
                        <button 
                          type="button" 
                          className="btn-cancelar-agendamento"
                          onClick={() => handleCancelarAgendamento(item.id, item.petNome)}
                          title="Cancelar esta consulta"
                        >
                          <FaBan /> Cancelar
                        </button>
                      ) : (
                        <span className="texto-acao-bloqueada">---</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="historico-vazio">
            <FaPaw className="paw-vazia-icon" />
            <h3>Nenhum registro encontrado</h3>
            <p>Não encontramos agendamentos com as restrições do seu perfil ou filtros selecionados.</p>
          </div>
        )}
      </div>

    </div>
  );
}