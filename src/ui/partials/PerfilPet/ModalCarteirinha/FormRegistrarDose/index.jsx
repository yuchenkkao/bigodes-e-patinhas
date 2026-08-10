import { useState } from 'react';
import { FaCheck, FaCalendarDay } from 'react-icons/fa';
import './styles.css';

export default function FormRegistrarDose({ onSalvar, onCancelar }) {
  const [nomeVacina, setNomeVacina] = useState('');
  const [loteVacina, setLoteVacina] = useState('');
  const hojeFormatado = new Date().toLocaleDateString('pt-BR');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nomeVacina) {
      alert('Por favor, preencha o nome da vacina!');
      return;
    }

    onSalvar({
      nome: nomeVacina,
      data: hojeFormatado,
      lote: loteVacina || '---',
      status: 'Aplicada'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-vacina-box box-aplicada">
      <h4>💉 Registrar Vacina Aplicada Hoje</h4>
      <div className="vacina-inputs-row">
        <input 
          type="text" 
          placeholder="Nome da Vacina (Ex: Antirrábica)" 
          value={nomeVacina} 
          onChange={(e) => setNomeVacina(e.target.value)} 
        />
        
        <div className="input-data-fixa" title="A data de registro é o dia atual">
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
        <button type="button" className="btn-cancelar-vacina" onClick={onCancelar}>Cancelar</button>
        <button type="submit" className="btn-confirmar-vacina"><FaCheck /> Confirmar Dose</button>
      </div>
    </form>
  );
}