import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { buscarFichaAtendimento, listarProntuario, registrarEvolucao } from '../services/atendimentosService';

export function useAtendimento(agendamentoId) {
  const { dados, carregando } = useRequisicao(() => buscarFichaAtendimento(agendamentoId), [agendamentoId]);

  const salvarEvolucao = useCallback((dadosEvolucao) => registrarEvolucao(dadosEvolucao), []);

  return { ficha: dados, carregando, salvarEvolucao };
}

export function useProntuario(petId) {
  const { dados, carregando } = useRequisicao(() => listarProntuario(petId), [petId]);

  return { historico: dados || [], carregando };
}
