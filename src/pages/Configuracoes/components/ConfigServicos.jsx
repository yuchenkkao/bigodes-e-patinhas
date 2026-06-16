import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaHandHoldingMedical, FaClock, FaDollarSign, FaConciergeBell } from 'react-icons/fa';

export default function ConfigServicos() {
  const [servicos, setServicos] = useState([
    { id: 1, nome: 'Vacinação', tempo: '20 min' },
    { id: 2, nome: 'Clínico Geral', tempo: '40 min' },
    { id: 3, nome: 'Saúde Bucal', tempo: '60 min' },
  ]);

  const [nome, setNome] = useState('');
  const [tempo, setTempo] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!nome) {
      alert('Nome do serviço é obrigatório!');
      return;
    }
    const novoServico = {
      id: Date.now(),
      nome,
      tempo: tempo || '30 min'
    };
    setServicos([...servicos, novoServico]);
    setNome(''); setTempo('');
  };

  return (
    <div className="sub-config-box">
      <div className="sub-config-header">
        <h2><FaConciergeBell/> Portfólio de Serviços Oferecidos</h2>
        <p>Defina a tabela de procedimentos médicos, valores e tempos de duração estimados para os agendamentos.</p>
      </div>

      <form onSubmit={handleAdd} className="form-add-config row-form">
        <input type="text" placeholder="Nome do Procedimento" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="Duração (Ex: 30 min)" value={tempo} onChange={(e) => setTempo(e.target.value)} />
        <button type="submit" className="btn-add-config"><FaPlus /> Adicionar</button>
      </form>

      <table className="table-config-dados">
        <thead>
          <tr>
            <th>Procedimento</th>
            <th>Tempo Estimado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map(serv => (
            <tr key={serv.id}>
              <td>
                <div className="table-cell-profile">
                  <FaHandHoldingMedical className="icon-table-avatar alternative" />
                  <strong>{serv.nome}</strong>
                </div>
              </td>
              <td><span className="time-tag"><FaClock /> {serv.tempo}</span></td>
              <td>
                <button className="btn-delete-config text-mode" onClick={() => setServicos(servicos.filter(s => s.id !== serv.id))}>
                  <FaTrashAlt /> Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}