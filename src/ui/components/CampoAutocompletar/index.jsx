import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import './styles.css';

/**
 * Busca inteligente + botão "+": o usuário digita, escolhe uma sugestão da lista (fica
 * "selecionado" internamente) e só então o "+"/Enter dispara onAdicionar com o objeto
 * inteiro escolhido — o array em si é responsabilidade de quem usa este componente.
 */
export default function CampoAutocompletar({
  options = [],
  getLabel = (opcao) => opcao.label,
  onAdicionar,
  placeholder = 'Digite para buscar...',
  vazioTexto = 'Nenhum resultado encontrado'
}) {
  const [busca, setBusca] = useState('');
  const [selecionado, setSelecionado] = useState(null);
  const [aberto, setAberto] = useState(false);

  const opcoesFiltradas = busca.trim()
    ? options.filter((opcao) => getLabel(opcao).toLowerCase().includes(busca.trim().toLowerCase()))
    : options;

  const escolherOpcao = (opcao) => {
    setSelecionado(opcao);
    setBusca(getLabel(opcao));
    setAberto(false);
  };

  const handleAdicionar = () => {
    if (!selecionado) return;
    onAdicionar(selecionado);
    setSelecionado(null);
    setBusca('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdicionar();
    }
  };

  return (
    <div className="autocomplete-input">
      <div className="autocomplete-input-linha">
        <div className="autocomplete-campo-wrapper">
          <input
            type="text"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setSelecionado(null);
              setAberto(true);
            }}
            onFocus={() => setAberto(true)}
            onBlur={() => setTimeout(() => setAberto(false), 150)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
          />

          {aberto && busca && (
            <ul className="autocomplete-sugestoes">
              {opcoesFiltradas.length > 0 ? (
                opcoesFiltradas.map((opcao) => (
                  <li key={opcao.id} onMouseDown={() => escolherOpcao(opcao)}>
                    {getLabel(opcao)}
                  </li>
                ))
              ) : (
                <li className="autocomplete-vazio">{vazioTexto}</li>
              )}
            </ul>
          )}
        </div>

        <button type="button" className="btn-adicionar-tag" onClick={handleAdicionar} disabled={!selecionado} title="Adicionar">
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
