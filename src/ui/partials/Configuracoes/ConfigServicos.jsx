import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaHandHoldingMedical, FaClock, FaConciergeBell } from 'react-icons/fa';
import { useServicosOferecidos } from '../../../data/hooks/useServicosOferecidos';

export default function ConfigServicos() {
  const { servicos, criar, remover } = useServicosOferecidos();

  const [nome, setNome] = useState('');
  const [tempo, setTempo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nome) {
      alert('Nome do serviço é obrigatório!');
      return;
    }
    await criar({
      nome,
      tempo: tempo || '30 min',
      descricao: descricao || 'Nenhuma descrição detalhada informada.'
    });

    setNome('');
    setTempo('');
    setDescricao('');
  };

  return (
    <div className="sub-config-box">
      <div className="sub-config-header">
        <h2><FaConciergeBell/> Portfólio de Serviços Oferecidos</h2>
        <p>Defina a tabela de procedimentos médicos, descrições e tempos de duração estimados para os agendamentos.</p>
      </div>

      <form onSubmit={handleAdd} className="form-add-config row-form" style={{ flexWrap: 'wrap', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Nome do Procedimento" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          style={{ flex: '1 1 200px' }}
        />
        <input 
          type="text" 
          placeholder="Duração (Ex: 30 min)" 
          value={tempo} 
          onChange={(e) => setTempo(e.target.value)} 
          style={{ flex: '1 1 150px' }}
        />
        <input 
          type="text" 
          placeholder="Breve descrição do que está incluso no serviço..." 
          value={descricao} 
          onChange={(e) => setDescricao(e.target.value)} 
          style={{ flex: '2 1 300px' }} 
        />
        <button type="submit" className="btn-add-config" style={{ height: '42px' }}><FaPlus /> Adicionar</button>
      </form>

      <table className="table-config-dados">
        <thead>
          <tr>
            <th>Procedimento</th>
            <th>Duração</th>
            <th>Descrição Detalhada</th>
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
              <td>
                <span className="time-tag"><FaClock /> {serv.tempo}</span>
              </td>
              <td style={{ color: '#666', fontSize: '0.88rem', maxWidth: '350px', lineHeight: '1.4' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {serv.descricao}
                </span>
              </td>
              <td>
                <button className="btn-delete-config text-mode" onClick={() => remover(serv.id)}>
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