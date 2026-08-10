import { FaFlask, FaTimes } from 'react-icons/fa';
import './styles.css';

/**
 * Um exame já adicionado ao atendimento: mostra o nome fixo e um textarea aberto para o
 * resultado. onChangeResultado repassa o texto puro — quem sabe em qual índice do array
 * esse exame está é o hook que gerencia a lista (useAtendimentoClinico), não este card.
 */
export default function ExamResultCard({ item, onChangeResultado, onRemover }) {
  return (
    <div className="exam-result-card">
      <div className="exam-result-card-header">
        <span className="exam-result-card-nome"><FaFlask /> {item.nome}</span>
        <button type="button" onClick={onRemover} aria-label={`Remover ${item.nome}`}>
          <FaTimes />
        </button>
      </div>
      <textarea
        rows="2"
        placeholder="Resultado do exame..."
        value={item.resultado}
        onChange={(e) => onChangeResultado(e.target.value)}
      />
    </div>
  );
}
