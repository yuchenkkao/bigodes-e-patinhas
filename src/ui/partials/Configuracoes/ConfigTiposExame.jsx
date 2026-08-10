import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaFlask } from 'react-icons/fa';
import { useTiposExame } from '../../../data/hooks/useTiposExame';

export default function ConfigTiposExame() {
  const { tiposExame, criar, remover } = useTiposExame();
  const [novoExame, setNovoExame] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!novoExame.trim()) return;
    if (tiposExame.some((exame) => exame.nome === novoExame)) {
      alert('Este tipo de exame já está cadastrado!');
      return;
    }
    await criar(novoExame.trim());
    setNovoExame('');
  };

  return (
    <div className="sub-config-box">
      <div className="sub-config-header">
        <h2><FaFlask /> Tipos de Exame</h2>
        <p>Cadastre os exames que a clínica solicita. Esses dados alimentam a busca de exames na tela de Atendimento.</p>
      </div>

      <form onSubmit={handleAdd} className="form-add-config">
        <input
          type="text"
          placeholder="Ex: Hemograma completo, Raio-X coxofemoral..."
          value={novoExame}
          onChange={(e) => setNovoExame(e.target.value)}
        />
        <button type="submit" className="btn-add-config"><FaPlus /> Adicionar</button>
      </form>

      <div className="config-list-items">
        {tiposExame.map((exame) => (
          <div key={exame.id} className="item-config-card">
            <div className="item-config-info">
              <FaFlask className="icon-decor-list" />
              <span>{exame.nome}</span>
            </div>
            <button type="button" className="btn-delete-config" onClick={() => remover(exame.id)}>
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
