import { FaPills, FaTimes } from 'react-icons/fa';
import './styles.css';

/**
 * Um medicamento já adicionado à prescrição: nome fixo + bloco com Dosagem, Frequência,
 * Duração e Observação. onChangeCampo(nomeDoCampo, valor) deixa o hook decidir em qual
 * índice do array de medicamentos aplicar a mudança — este componente não sabe sua posição.
 */
export default function MedicationPrescriptionForm({ item, onChangeCampo, onRemover }) {
  return (
    <div className="medication-prescription-form">
      <div className="medication-prescription-header">
        <span className="medication-prescription-nome"><FaPills /> {item.nome}</span>
        <button type="button" onClick={onRemover} aria-label={`Remover ${item.nome}`}>
          <FaTimes />
        </button>
      </div>

      <div className="medication-prescription-grid">
        <div className="medication-field">
          <label>Dosagem</label>
          <input
            type="text"
            placeholder="Ex: 10mg"
            value={item.dosagem}
            onChange={(e) => onChangeCampo('dosagem', e.target.value)}
          />
        </div>

        <div className="medication-field">
          <label>Frequência</label>
          <input
            type="text"
            placeholder="Ex: 2x ao dia"
            value={item.frequencia}
            onChange={(e) => onChangeCampo('frequencia', e.target.value)}
          />
        </div>

        <div className="medication-field">
          <label>Duração</label>
          <input
            type="text"
            placeholder="Ex: 7 dias"
            value={item.duracao}
            onChange={(e) => onChangeCampo('duracao', e.target.value)}
          />
        </div>

        <div className="medication-field medication-field-full">
          <label>Observação de Uso</label>
          <textarea
            rows="2"
            placeholder="Ex: Administrar após as refeições"
            value={item.observacao}
            onChange={(e) => onChangeCampo('observacao', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
