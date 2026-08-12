import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaPaw, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { useEspecies } from '../../../data/hooks/useEspecies';
import './styles.css';

/**
 * Cadastro de Espécies com Raças aninhadas (Smart Tags).
 * Este componente só orquestra a UI — toda a manipulação do array aninhado
 * (especies -> especie.racas) mora em useEspecies (adicionarRaca/removerRaca),
 * mantendo a imutabilidade fora da camada de apresentação.
 */
export default function ConfiguracaoEspecieRaca() {
  const { especies, criar, remover, adicionarRaca, removerRaca } = useEspecies();

  const [novaEspecie, setNovaEspecie] = useState('');
  // Só uma espécie por vez fica "aberta" — é o sub-campo de raças habilitado após
  // cadastrar/selecionar a espécie, conforme o fluxo pedido
  const [especieExpandidaId, setEspecieExpandidaId] = useState(null);
  const [novaRaca, setNovaRaca] = useState('');

  const handleAdicionarEspecie = async (e) => {
    e.preventDefault();
    if (!novaEspecie.trim()) return;
    if (especies.some((especie) => especie.nome === novaEspecie)) {
      alert('Esta espécie já está cadastrada!');
      return;
    }
    const especieCriada = await criar(novaEspecie.trim());
    setNovaEspecie('');
    // Ao cadastrar, já habilita o sub-campo de raças desta espécie recém-criada
    setEspecieExpandidaId(especieCriada.id);
  };

  const alternarExpansao = (especieId) => {
    setEspecieExpandidaId((atual) => (atual === especieId ? null : especieId));
    setNovaRaca('');
  };

  // Lógica do botão "+" / Enter: adiciona a raça digitada à espécie que está aberta no momento
  const handleAdicionarRaca = (especieId) => {
    const raca = novaRaca.trim();
    if (!raca) return;
    adicionarRaca(especieId, raca);
    setNovaRaca('');
  };

  const handleKeyDownRaca = (e, especieId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdicionarRaca(especieId);
    }
  };

  return (
    <div className="sub-config-box">
      <div className="sub-config-header">
        <h2><FaPaw /> Espécies e Raças Atendidas</h2>
        <p>Cadastre as espécies atendidas pela clínica e, para cada uma, as raças específicas vinculadas a ela.</p>
      </div>

      <form onSubmit={handleAdicionarEspecie} className="form-add-config">
        <input
          type="text"
          placeholder="Ex: Canina, Felina, Ave..."
          value={novaEspecie}
          onChange={(e) => setNovaEspecie(e.target.value)}
        />
        <button type="submit" className="btn-add-config"><FaPlus /> Adicionar Espécie</button>
      </form>

      <div className="lista-especies-racas">
        {especies.map((especie) => {
          const expandida = especieExpandidaId === especie.id;
          return (
            <div key={especie.id} className={`especie-card ${expandida ? 'expandida' : ''}`}>
              <button type="button" className="especie-card-header" onClick={() => alternarExpansao(especie.id)}>
                <span className="especie-card-nome"><FaPaw /> {especie.nome}</span>
                <span className="especie-card-acoes">
                  <span className="especie-card-contagem">
                    {especie.racas.length} {especie.racas.length === 1 ? 'raça' : 'raças'}
                  </span>
                  {expandida ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              {/* Sub-campo habilitado só quando a espécie está selecionada/expandida */}
              {expandida && (
                <div className="especie-card-corpo">
                  <div className="form-add-raca">
                    <input
                      type="text"
                      placeholder="Digite o nome da raça e pressione Enter ou +"
                      value={novaRaca}
                      onChange={(e) => setNovaRaca(e.target.value)}
                      onKeyDown={(e) => handleKeyDownRaca(e, especie.id)}
                    />
                    <button
                      type="button"
                      className="btn-adicionar-tag"
                      onClick={() => handleAdicionarRaca(especie.id)}
                      title="Adicionar raça"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {especie.racas.length > 0 ? (
                    <div className="lista-racas-chips">
                      {especie.racas.map((raca, indice) => (
                        <span key={`${raca}-${indice}`} className="tag-chip-raca">
                          {raca}
                          <button type="button" onClick={() => removerRaca(especie.id, raca)} aria-label={`Remover raça ${raca}`}>
                            <FaTimes />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="racas-vazio">Nenhuma raça cadastrada para esta espécie ainda.</p>
                  )}

                  <button type="button" className="btn-delete-config text-mode btn-remover-especie" onClick={() => remover(especie.id)}>
                    <FaTrashAlt /> Remover Espécie
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
