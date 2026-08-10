import { useCallback, useMemo } from 'react';
import { useRequisicao } from './useRequisicao';
import { useAuth } from './useAuth';
import { listarAgendamentos, criarAgendamento, atualizarStatusAgendamento } from '../services/agendamentosService';

export function useAgendamentos() {
  const { dados, carregando, setDados } = useRequisicao(listarAgendamentos, []);

  const criar = useCallback(async (dadosAgendamento) => {
    const agendamento = await criarAgendamento(dadosAgendamento);
    setDados((atual) => [...(atual || []), agendamento]);
    return agendamento;
  }, [setDados]);

  const atualizarStatus = useCallback(async (id, status) => {
    await atualizarStatusAgendamento(id, status);
    setDados((atual) => (atual || []).map((a) => (a.id === id ? { ...a, status } : a)));
  }, [setDados]);

  return { agendamentos: dados || [], carregando, criar, atualizarStatus };
}

// Placeholder até existir uma sessão real vinculada a um Tutor/Veterinario específico
// (hoje o login apenas simula o papel do usuário, sem identificar qual tutor/vet é).
const IDENTIDADE_SIMULADA = { tutorNome: 'Maria Silva', veterinarioNome: 'Dra. Mariana' };

export function useMeusAgendamentos() {
  const { papel } = useAuth();
  const { agendamentos, carregando, atualizarStatus } = useAgendamentos();

  const meusAgendamentos = useMemo(() => {
    if (papel === 'cliente') return agendamentos.filter((a) => a.tutorNome === IDENTIDADE_SIMULADA.tutorNome);
    if (papel === 'veterinario') return agendamentos.filter((a) => a.veterinarioNome === IDENTIDADE_SIMULADA.veterinarioNome);
    return agendamentos;
  }, [agendamentos, papel]);

  const cancelar = useCallback((id) => atualizarStatus(id, 'Cancelado'), [atualizarStatus]);

  return { agendamentos: meusAgendamentos, carregando, cancelar };
}
