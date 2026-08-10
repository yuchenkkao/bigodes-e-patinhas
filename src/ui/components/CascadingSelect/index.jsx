import { useId } from 'react';
import './styles.css';

/**
 * Par de campos dependentes: Passo 1 é um <select> comum; Passo 2 é filtrado pelo Passo 1
 * (childOptions já deve chegar pronto, filtrado pelo componente pai/hook) e aceita tanto
 * escolher uma opção quanto digitar um valor novo (via <datalist>).
 *
 * Este componente é só apresentação: quem decide o que acontece quando o Passo 1 muda
 * (ex: limpar o Passo 2) é o hook que gerencia o estado, não este componente.
 */
export default function CascadingSelect({
  parentLabel,
  parentPlaceholder = '-- Selecione --',
  parentOptions = [],
  parentValue,
  onParentChange,
  childLabel,
  childPlaceholder = 'Selecione ou digite um valor',
  childOptions = [],
  childValue,
  onChildChange,
  childDisabledMessage = 'Selecione uma opção acima primeiro'
}) {
  const datalistId = useId();
  const childHabilitado = Boolean(parentValue);

  return (
    <div className="cascading-select">
      <div className="cascading-select-etapa">
        <label>{parentLabel}</label>
        <select value={parentValue || ''} onChange={(e) => onParentChange(e.target.value)}>
          <option value="">{parentPlaceholder}</option>
          {parentOptions.map((opcao) => (
            <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
          ))}
        </select>
      </div>

      <div className="cascading-select-etapa">
        <label>{childLabel}</label>
        <input
          type="text"
          list={datalistId}
          value={childValue || ''}
          onChange={(e) => onChildChange(e.target.value)}
          disabled={!childHabilitado}
          placeholder={childHabilitado ? childPlaceholder : childDisabledMessage}
        />
        <datalist id={datalistId}>
          {childOptions.map((opcao) => (
            <option key={opcao} value={opcao} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
