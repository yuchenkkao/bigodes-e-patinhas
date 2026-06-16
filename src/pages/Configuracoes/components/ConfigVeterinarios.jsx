import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaUserMd, FaIdCard, FaStethoscope } from 'react-icons/fa';

export default function ConfigVeterinarios() {
  const [vets, setVets] = useState([
    { id: 1, nome: 'Dra. Mariana', crmv: 'CRMV-PR 1234', especialidade: 'Vacinação & Pediatria' },
    { id: 2, nome: 'Dr. Eduardo', crmv: 'CRMV-PR 5678', especialidade: 'Clínica Geral & Cirurgia' },
  ]);

  const [nome, setNome] = useState('');
  const [crmv, setCrmv] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!nome || !crmv) {
      alert('Nome e CRMV são obrigatórios!');
      return;
    }
    const novoVet = {
      id: Date.now(),
      nome,
      crmv,
      especialidade: especialidade || 'Clínica Geral'
    };
    setVets([...vets, novoVet]);
    setNome(''); setCrmv(''); setEspecialidade('');
  };

  return (
    <div className="sub-config-box">
      <div className="sub-config-header">
        <h2><FaStethoscope/> Gerenciamento do Corpo Veterinário</h2>
        <p>Cadastre os profissionais habilitados. Esses dados alimentarão a página da Equipe Médica.</p>
      </div>

      <form onSubmit={handleAdd} className="form-add-config row-form">
        <input type="text" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="CRMV (Ex: CRMV-PR 0000)" value={crmv} onChange={(e) => setCrmv(e.target.value)} />
        <input type="text" placeholder="Especialidade" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} />
        <button type="submit" className="btn-add-config"><FaPlus /> Contratar</button>
      </form>

      <table className="table-config-dados">
        <thead>
          <tr>
            <th>Médico Veterinário</th>
            <th>Registro Profissional</th>
            <th>Especialidade Principal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vets.map(vet => (
            <tr key={vet.id}>
              <td>
                <div className="table-cell-profile">
                  <FaUserMd className="icon-table-avatar" />
                  <strong>{vet.nome}</strong>
                </div>
              </td>
              <td><span className="crmv-tag"><FaIdCard /> {vet.crmv}</span></td>
              <td>{vet.especialidade}</td>
              <td>
                <button className="btn-delete-config text-mode" onClick={() => setVets(vets.filter(v => v.id !== vet.id))}>
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