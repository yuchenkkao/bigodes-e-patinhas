import { useCallback, useState } from 'react';
import { useVacinasCatalogo } from './useVacinasCatalogo';

/**
 * Concentra toda a lógica de negócio da seção de vacinação dentro do Atendimento:
 * - filtragem dos lotes disponíveis a partir da vacina escolhida (Passo 1 -> Passo 2)
 * - regra de limpar o lote automaticamente sempre que a vacina do Passo 1 muda
 * - manipulação do array de itens de vacinação adicionados neste atendimento
 * O componente de UI (Atendimento/index.jsx) só chama o que este hook expõe.
 */
export function useAtendimentoVacinacao() {
  const { vacinasCatalogo } = useVacinasCatalogo();

  const [vacinaCatalogoId, setVacinaCatalogoId] = useState('');
  const [lote, setLote] = useState('');
  const [statusDose, setStatusDose] = useState('Aplicada');
  const [dataAgendada, setDataAgendada] = useState('');
  const [itensVacinacao, setItensVacinacao] = useState([]);

  const vacinaSelecionada = vacinasCatalogo.find((v) => v.id === vacinaCatalogoId);
  // Passo 2 recalculado a partir do Passo 1 — só existem lotes se uma vacina estiver selecionada
  const lotesDisponiveis = vacinaSelecionada?.lotes || [];

  // Regra de estado exigida: trocar a vacina no Passo 1 limpa o lote do Passo 2
  const selecionarVacina = useCallback((id) => {
    setVacinaCatalogoId(id);
    setLote('');
  }, []);

  const adicionarItem = useCallback(() => {
    if (!vacinaSelecionada || !lote) return;
    if (statusDose === 'Agendado' && !dataAgendada) return;

    setItensVacinacao((atual) => [...atual, {
      nome: vacinaSelecionada.nome,
      lote,
      status: statusDose,
      data: statusDose === 'Agendado' ? dataAgendada : new Date().toLocaleDateString('pt-BR')
    }]);

    setVacinaCatalogoId('');
    setLote('');
    setStatusDose('Aplicada');
    setDataAgendada('');
  }, [vacinaSelecionada, lote, statusDose, dataAgendada]);

  const removerItem = useCallback((indice) => {
    setItensVacinacao((atual) => atual.filter((_, i) => i !== indice));
  }, []);

  return {
    vacinasCatalogo,
    vacinaCatalogoId,
    selecionarVacina,
    lote,
    setLote,
    lotesDisponiveis,
    statusDose,
    setStatusDose,
    dataAgendada,
    setDataAgendada,
    itensVacinacao,
    adicionarItem,
    removerItem
  };
}
