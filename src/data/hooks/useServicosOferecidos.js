import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { listarServicos, criarServico, removerServico } from '../services/servicosService';

export function useServicosOferecidos() {
  const { dados, carregando, setDados } = useRequisicao(listarServicos, []);

  const criar = useCallback(async (dadosServico) => {
    const servico = await criarServico(dadosServico);
    setDados((atual) => [...(atual || []), servico]);
    return servico;
  }, [setDados]);

  const remover = useCallback(async (id) => {
    await removerServico(id);
    setDados((atual) => (atual || []).filter((s) => s.id !== id));
  }, [setDados]);

  return { servicos: dados || [], carregando, criar, remover };
}
