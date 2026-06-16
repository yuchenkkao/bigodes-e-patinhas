import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaHandHoldingMedical, FaClock, FaConciergeBell, FaAlignLeft } from 'react-icons/fa';

export default function ConfigServicos() {
  const [servicos, setServicos] = useState([
    { id: 1, nome: 'Vacinação', tempo: '20 min', descricao: 'As vacinas ajudam a proteger o seu pet de uma grande gama de doenças, pois aplicamos produtos de alta qualidade, cientificamente comprovados, aliados a adequada conservação e meios de aplicação corretos por nossos veterinários.' },
    { id: 2, nome: 'Clínico Geral', tempo: '40 min', descricao: 'Um clínico geral é um médico que fornece cuidados de rotina para uma variedade de animais e pode diagnosticar e prescrever tratamentos para uma ampla gama de problemas.' },
    { id: 3, nome: 'Saúde Bucal', tempo: '60 min', descricao: 'A saúde bucal refere-se aos dentes, gengivas e a língua. As partes principais da saúde bucal nos animais envolvem problemas gengivais como o tártaro e doenças periodontais. A saúde bucal do seu animal de estimação é vital para seu bem-estar geral e qualidade de vida.' },
  ]);

  const [nome, setNome] = useState('');
  const [tempo, setTempo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!nome) {
      alert('Nome do serviço é obrigatório!');
      return;
    }
    const novoServico = {
      id: Date.now(),
      nome,
      tempo: tempo || '30 min',
      descricao: descricao || 'Nenhuma descrição detalhada informada.'
    };
    setServicos([...servicos, novoServico]);
    
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
              {/* 🌟 NOVA CÉLULA: Renderiza o texto cadastrado com estilo mais suave */}
              <td style={{ color: '#666', fontSize: '0.88rem', maxWidth: '350px', lineHeight: '1.4' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {serv.descricao}
                </span>
              </td>
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