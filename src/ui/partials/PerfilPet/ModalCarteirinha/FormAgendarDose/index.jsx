import { useState } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
import './styles.css';

export default function FormAgendarDose({ onSalvar, onCancelar }) {
  const [nomeVacina, setNomeVacina] = useState('');
  const [dataAgendada, setDataAgendada] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nomeVacina || !dataAgendada) {
      alert('Por favor, preencha o nome da vacina e a data planejada!');
      return;
    }

    const dataFormatada = dataAgendada.split('-').reverse().join('/');

    onSalvar({
      nome: nomeVacina,
      data: dataFormatada,
      lote: '---', 
      status: 'Agendado'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-vacina-box box-agendada">
      <h4>📅 Planejar Dose Futura</h4>
      <div className="vacina-inputs-row">
        <input 
          type="text" 
          placeholder="Nome da Vacina (Ex: Reforço V10)" 
          value={nomeVacina} 
          onChange={(e) => setNomeVacina(e.target.value)} 
        />
        
        <input 
          type="date" 
          className="input-date-picker"
          value={dataAgendada} 
          onChange={(e) => setDataAgendada(e.target.value)} 
        />
      </div>
      <div className="form-vacina-acoes">
        <button type="button" className="btn-cancelar-vacina" onClick={onCancelar}>Cancelar</button>
        <button type="submit" className="btn-confirmar-agendamento"><FaCalendarPlus /> Agendar Vacina</button>
      </div>
    </form>
  );
}