import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaNotesMedical } from 'react-icons/fa';
import { useCids } from '../../../data/hooks/useCids';

export default function ConfigCids() {
  const { cids, criar, remover } = useCids();

  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');

  // "+" / Enter do formulário: cada envio vira uma nova linha na tabela abaixo (lista visual expansível)
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!codigo || !descricao) {
      alert('Código e Descrição são obrigatórios!');
      return;
    }
    await criar({ codigo, descricao });
    setCodigo('');
    setDescricao('');
  };

  return (
    <div className="sub-config-box">
      <div className="sub-config-header">
        <h2><FaNotesMedical /> Diagnósticos (CID)</h2>
        <p>Cadastre os códigos CID disponíveis para diagnóstico. Esses dados alimentam a busca de CID na tela de Atendimento.</p>
      </div>

      <form onSubmit={handleAdd} className="form-add-config row-form">
        <input type="text" placeholder="Código (Ex: A09)" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        <input type="text" placeholder="Descrição (Ex: Diarreia e gastroenterite)" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <button type="submit" className="btn-add-config"><FaPlus /> Adicionar</button>
      </form>

      <table className="table-config-dados">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cids.map((cid) => (
            <tr key={cid.id}>
              <td><span className="crmv-tag">{cid.codigo}</span></td>
              <td>{cid.descricao}</td>
              <td>
                <button className="btn-delete-config text-mode" onClick={() => remover(cid.id)}>
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
