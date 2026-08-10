import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import './styles.css';

// Componente de apresentação puro: recebe a lista atual (tags) e devolve a lista nova via onChange.
// Quem guarda o array no estado é sempre o formulário que o utiliza.
export default function MultiTagInput({ label, tags = [], onChange, placeholder }) {
  const [valorAtual, setValorAtual] = useState('');

  // Lógica do botão "+": adiciona o valor digitado ao array de tags e limpa o campo
  const adicionarTag = () => {
    const valor = valorAtual.trim();
    if (!valor) return;
    onChange([...tags, valor]);
    setValorAtual('');
  };

  // Enter tem o mesmo efeito do botão "+", sem submeter o formulário
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      adicionarTag();
    }
  };

  const removerTag = (indice) => {
    onChange(tags.filter((_, i) => i !== indice));
  };

  return (
    <div className="multi-tag-input">
      {label && <label>{label}</label>}

      <div className="multi-tag-input-linha">
        <input
          type="text"
          value={valorAtual}
          onChange={(e) => setValorAtual(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <button type="button" className="btn-adicionar-tag" onClick={adicionarTag} title="Adicionar">
          <FaPlus />
        </button>
      </div>

      {tags.length > 0 && (
        <div className="multi-tag-input-lista">
          {tags.map((tag, indice) => (
            <span key={`${tag}-${indice}`} className="tag-chip">
              {tag}
              <button type="button" onClick={() => removerTag(indice)} aria-label={`Remover ${tag}`}>
                <FaTimes />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
