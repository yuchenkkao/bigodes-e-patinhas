import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaPills } from 'react-icons/fa';
import { useMedicamentos } from '../../../data/hooks/useMedicamentos';

export default function ConfigMedicamentos() {
  const { medicamentos, criar, remover } = useMedicamentos();

  const [nome, setNome] = useState('');
  const [principioAtivo, setPrincipioAtivo] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nome || !principioAtivo) {
      alert('Nome do Medicamento e Princípio Ativo são obrigatórios!');
      return;
    }
    await criar({ nome, principioAtivo });
    setNome('');
    setPrincipioAtivo('');
  };

  return (
    <div className="sub-config-box">
      <div className="sub-config-header">
        <h2><FaPills /> Medicamentos</h2>
        <p>Cadastre os medicamentos disponíveis para prescrição. Esses dados alimentam a busca de medicamentos na tela de Atendimento.</p>
      </div>

      <form onSubmit={handleAdd} className="form-add-config row-form">
        <input type="text" placeholder="Nome do Medicamento (Ex: Posatex)" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="Princípio Ativo (Ex: Orbifloxacina)" value={principioAtivo} onChange={(e) => setPrincipioAtivo(e.target.value)} />
        <button type="submit" className="btn-add-config"><FaPlus /> Adicionar</button>
      </form>

      <table className="table-config-dados">
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Princípio Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((medicamento) => (
            <tr key={medicamento.id}>
              <td>
                <div className="table-cell-profile">
                  <FaPills className="icon-table-avatar alternative" />
                  <strong>{medicamento.nome}</strong>
                </div>
              </td>
              <td>{medicamento.principioAtivo}</td>
              <td>
                <button className="btn-delete-config text-mode" onClick={() => remover(medicamento.id)}>
                  <FaTrashAlt /> Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
