import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaPaw } from 'react-icons/fa';
import { useEspecies } from '../../../data/hooks/useEspecies';

export default function ConfigEspecies() {
  const { especies, criar, remover } = useEspecies();
  const [novaEspecie, setNovaEspecie] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!novaEspecie.trim()) return;
    if (especies.some((esp) => esp.nome === novaEspecie)) {
      alert('Esta espécie já está cadastrada!');
      return;
    }
    await criar(novaEspecie.trim());
    setNovaEspecie('');
  };

  return (
    <div className="sub-config-box">
      <div className="sub-config-header">
        <h2><FaPaw/> Espécies Atendidas na Clínica</h2>
        <p>Gerencie quais classes de animais a clínica está apta a receber no formulário de agendamento.</p>
      </div>

      <form onSubmit={handleAdd} className="form-add-config">
        <input 
          type="text" 
          placeholder="Ex: Réptil, Equino..." 
          value={novaEspecie}
          onChange={(e) => setNovaEspecie(e.target.value)}
        />
        <button type="submit" className="btn-add-config"><FaPlus /> Adicionar</button>
      </form>

      <div className="config-list-items">
        {especies.map((esp) => (
          <div key={esp.id} className="item-config-card">
            <div className="item-config-info">
              <FaPaw className="icon-decor-list" />
              <span>{esp.nome}</span>
            </div>
            <button type="button" className="btn-delete-config" onClick={() => remover(esp.id)}>
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}