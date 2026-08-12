import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaSyringe } from 'react-icons/fa';
import { useVacinasCatalogo } from '../../../data/hooks/useVacinasCatalogo';
import CampoMultiEtiqueta from '../../components/CampoMultiEtiqueta';

export default function ConfigVacinas() {
  const { vacinasCatalogo, criar, remover } = useVacinasCatalogo();

  const [nome, setNome] = useState('');
  // Lotes digitados para a vacina em cadastro (tag a tag, via botão "+" ou Enter no CampoMultiEtiqueta)
  const [lotes, setLotes] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nome) {
      alert('Nome da vacina é obrigatório!');
      return;
    }
    if (lotes.length === 0) {
      alert('Adicione pelo menos um lote!');
      return;
    }
    // Envia o array de lotes já pronto para a API (id/nome + lotes: string[])
    await criar({ nome, lotes });
    setNome('');
    setLotes([]);
  };

  return (
    <div className="sub-config-box">
      <div className="sub-config-header">
        <h2><FaSyringe /> Vacinas e Lotes em Estoque</h2>
        <p>Cadastre as vacinas oferecidas pela clínica e os lotes disponíveis de cada uma. Esses dados alimentam a seleção de vacina/lote na tela de Atendimento.</p>
      </div>

      <form onSubmit={handleAdd} className="form-config-vacina">
        <div className="form-group-vacina">
          <label htmlFor="nome-vacina">Nome da Vacina</label>
          <input
            type="text"
            id="nome-vacina"
            placeholder="Ex: Antirrábica, Múltipla V10..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="form-group-vacina">
          <label>Lotes em Estoque</label>
          <CampoMultiEtiqueta
            placeholder="Digite o número do lote e pressione Enter ou +"
            tags={lotes}
            onChange={setLotes}
          />
        </div>

        <button type="submit" className="btn-add-config"><FaPlus /> Cadastrar Vacina</button>
      </form>

      <table className="table-config-dados">
        <thead>
          <tr>
            <th>Vacina</th>
            <th>Lotes em Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vacinasCatalogo.map((vacina) => (
            <tr key={vacina.id}>
              <td>
                <div className="table-cell-profile">
                  <FaSyringe className="icon-table-avatar alternative" />
                  <strong>{vacina.nome}</strong>
                </div>
              </td>
              <td>
                <div className="lista-lotes-config">
                  {vacina.lotes.map((lote, indice) => (
                    <span key={`${lote}-${indice}`} className="tag-chip-lote">{lote}</span>
                  ))}
                </div>
              </td>
              <td>
                <button className="btn-delete-config text-mode" onClick={() => remover(vacina.id)}>
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
