import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaPaw, FaUserMd, FaStethoscope } from 'react-icons/fa';
import './styles.css';

export default function HistoricoAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  const idTutorLogado = 1;

  useEffect(() => {
    async function carregarHistorico() {
      try {
        setCarregando(true);
        const res = await fetch(`http://localhost:8080/api/agendamentos/historico-tutor?idTutor=${idTutorLogado}`);
        if (!res.ok) throw new Error('Erro ao buscar histórico.');
        const data = await res.json();
        setAgendamentos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setCarregando(false);
      }
    }
    carregarHistorico();
  }, []);

  return (
    <div className="historico-container">
      <div className="historico-header">
        <button type="button" className="btn-voltar" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar para a Agenda
        </button>
        <h2>Histórico de Agendamentos</h2>
      </div>

      {carregando ? (
        <p className="msg-aviso">Carregando consultas...</p>
      ) : agendamentos.length === 0 ? (
        <div className="card-vazio">
          <p>Nenhum agendamento encontrado para este tutor.</p>
        </div>
      ) : (
        <div className="lista-agendamentos">
          {agendamentos.map((item) => (
            <div key={item.id} className="card-agendamento">
              <div className="card-topo">
                <span className="badge-data">
                  <FaCalendarAlt /> {item.data}
                </span>
                <span className="badge-hora">
                  <FaClock /> {item.horario}h
                </span>
                <span className={`badge-status ${String(item.status).toLowerCase()}`}>
                  {item.status}
                </span>
              </div>

              <div className="card-corpo">
                <p><FaPaw className="icone-info" /> <strong>Pet:</strong> {item.nomePet}</p>
                <p><FaUserMd className="icone-info" /> <strong>Veterinário:</strong> {item.nomeVeterinario}</p>
                <p><FaStethoscope className="icone-info" /> <strong>Serviço:</strong> {item.nomeServico}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}