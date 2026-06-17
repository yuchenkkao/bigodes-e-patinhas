import { FaHistory, FaCalendarCheck } from 'react-icons/fa';
import './styles.css';

export default function DadosConsultas({ historico }) {
  return (
    <div className="perfil-card historico-box">
      <div className="card-header-perfil">
        <h3><FaHistory /> Últimas Consultas</h3>
      </div>
      
      <table className="tabela-historico-perfil">
        <tbody>
          {historico.map(consulta => (
            <tr key={consulta.id}>
              <td><FaCalendarCheck className="icone-data-tabela" /> <strong>{consulta.data}</strong></td>
              <td>{consulta.pet}</td>
              <td>{consulta.motivo}</td>
              <td><span className="badge-status-concluido">{consulta.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}