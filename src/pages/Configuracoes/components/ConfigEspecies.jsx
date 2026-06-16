import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaPaw } from 'react-icons/fa';

export default function ConfigEspecies() {
  const [especies, setEspecies] = useState(['Cachorro', 'Gato', 'Roedor', 'Ave']);
  const [novaEspecie, setNovaEspecie] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!novaEspecie.trim()) return;
    if (especies.includes(novaEspecie)) {
      alert('Esta espécie já está cadastrada!');
      return;
    }
    setEspecies([...especies, novaEspecie.trim()]);
    setNovaEspecie('');
  };

  const handleDeletar = (nome) => {
    setEspecies(especies.filter(esp => esp !== nome));
  };

  return (
    <div className="sub-config-box">
      <div className="sub-config-header">
        <h2><FaPaw/> Diretório de Espécies Atendidas</h2>
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
        {especies.map((esp, idx) => (
          <div key={idx} className="item-config-card">
            <div className="item-config-info">
              <FaPaw className="icon-decor-list" />
              <span>{esp}</span>
            </div>
            <button type="button" className="btn-delete-config" onClick={() => handleDeletar(esp)}>
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}