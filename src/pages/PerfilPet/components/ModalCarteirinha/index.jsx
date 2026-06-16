import { useState } from 'react';
import { FaShieldAlt, FaTimes, FaPlus, FaCheck, FaCalendarDay } from 'react-icons/fa';
import './styles.css';

const historicoVacinasPadrao = {
  Cachorro: [
    { nome: 'Múltipla V10 (Dose 1)', data: '12/01/2025', lote: 'V10-984X', status: 'Aplicada' },
    { nome: 'Múltipla V10 (Dose 2)', data: '02/02/2025', lote: 'V10-112Y', status: 'Aplicada' },
    { nome: 'Antirrábica Anual', data: '12/01/2026', lote: 'ANT-0052', status: 'Aplicada' },
    { nome: 'Gripe Canina (Reforço)', data: 'Agendado', lote: '---', status: 'Pendente' },
  ],
  Gato: [
    { nome: 'Quádrupla Felina V4 (Dose 1)', data: '10/05/2025', lote: 'V4-441A', status: 'Aplicada' },
    { nome: 'Quádrupla Felina V4 (Dose 2)', data: '31/05/2025', lote: 'V4-882B', status: 'Aplicada' },
    { nome: 'Antirrábica Anual', data: '15/06/2026', lote: 'ANT-0099', status: 'Aplicada' },
  ]
};

export default function ModalCarteirinha({ isOpen, onClose, nome, especie, vacinas, onAdicionarVacina }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nomeVacina, setNomeVacina] = useState('');
  const [loteVacina, setLoteVacina] = useState('');

  const hojeFormatado = new Date().toLocaleDateString('pt-BR');
  const token = localStorage.getItem('@BigodesToken') || 'visitante';

  const vacinasDoAnimal = vacinas && vacinas.length > 0 
    ? vacinas 
    : (historicoVacinasPadrao[especie] || historicoVacinasPadrao['Cachorro']);

  const salvarNovaVacina = (e) => {
    e.preventDefault();

    if (!nomeVacina) {
      alert('Por favor, preencha o nome da vacina!');
      return;
    }

    const nova = {
      nome: nomeVacina,
      data: hojeFormatado, 
      lote: loteVacina || '---',
      status: 'Aplicada'
    };

    if (typeof onAdicionarVacina === 'function') {
      onAdicionarVacina(nova);
    } else {
      console.error("Erro: A propriedade 'onAdicionarVacina' não foi passada corretamente pelo componente pai PerfilPet.");
      alert("Não foi possível salvar. Erro interno de comunicação entre componentes.");
    }

    setNomeVacina('');
    setLoteVacina('');
    setMostrarForm(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-carteirinha">
        
        <div className="carteirinha-header">
          <div className="carteirinha-titulo">
            <FaShieldAlt className="shield-icon" />
            <div>
              <h2>Histórico de Imunização</h2>
              <p>Carteira digital de vacinas de <strong>{nome}</strong></p>
            </div>
          </div>
          <button type="button" className="btn-fechar-x" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {(token === 'veterinario') && !mostrarForm && (
          <button type="button" className="btn-registrar-dose" onClick={() => setMostrarForm(true)}>
            <FaPlus /> Registrar Aplicação de Vacina
          </button>
        )}

        {(token === 'veterinario') && mostrarForm && (
          <form onSubmit={salvarNovaVacina} className="form-aplicar-vacina">
            <h4>Registrar Nova Dose</h4>
            <div className="vacina-inputs-row">
              <input 
                type="text" 
                placeholder="Nome da Vacina (Ex: Antirrábica)" 
                value={nomeVacina} 
                onChange={(e) => setNomeVacina(e.target.value)} 
              />
              
              <div className="input-data-hoje" title="A data de registro é definida automaticamente para o dia atual">
                <FaCalendarDay /> <span>Hoje ({hojeFormatado})</span>
              </div>
              
              <input 
                type="text" 
                placeholder="Lote (Opcional)" 
                value={loteVacina} 
                onChange={(e) => setLoteVacina(e.target.value)} 
              />
            </div>
            <div className="form-vacina-acoes">
              <button type="button" className="btn-cancelar-vacina" onClick={() => setMostrarForm(false)}>Cancelar</button>
              <button type="submit" className="btn-confirmar-vacina"><FaCheck /> Confirmar Dose</button>
            </div>
          </form>
        )}

        <div className="carteirinha-corpo-tabela">
          <table className="tabela-vacinas">
            <thead>
              <tr>
                <th>Vacina / Imunizante</th>
                <th>Data Aplicação</th>
                <th>Lote</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vacinasDoAnimal.map((vacina, index) => (
                <tr key={index}>
                  <td className="vacina-nome-td"><strong>{vacina.nome}</strong></td>
                  <td>{vacina.data}</td>
                  <td><span className="lote-code">{vacina.lote}</span></td>
                  <td>
                    <span className={`badge-status-vacina ${vacina.status.toLowerCase() === 'aplicada' ? 'status-ok' : 'status-alerta'}`}>
                      {vacina.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}