import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { listarHorarios, atualizarHorario } from '../services/agendamentosService';

export function useHorarios() {
  const { dados, carregando, setDados } = useRequisicao(listarHorarios, []);

  const toggleHorario = useCallback((horaParaMudar) => {
    setDados((atual) => (atual || []).map((h) =>
      h.hora === horaParaMudar ? { ...h, ativo: !h.ativo } : h
    ));
    const horarioAtual = (dados || []).find((h) => h.hora === horaParaMudar);
    if (horarioAtual) atualizarHorario(horaParaMudar, !horarioAtual.ativo);
  }, [dados, setDados]);

  return { horarios: dados || [], carregando, toggleHorario };
}
