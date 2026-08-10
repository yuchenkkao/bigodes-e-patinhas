import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { listarVeterinarios, criarVeterinario, removerVeterinario } from '../services/veterinariosService';

export function useVeterinarios() {
  const { dados, carregando, setDados } = useRequisicao(listarVeterinarios, []);

  const criar = useCallback(async (dadosVeterinario) => {
    const veterinario = await criarVeterinario(dadosVeterinario);
    setDados((atual) => [...(atual || []), veterinario]);
    return veterinario;
  }, [setDados]);

  const remover = useCallback(async (id) => {
    await removerVeterinario(id);
    setDados((atual) => (atual || []).filter((v) => v.id !== id));
  }, [setDados]);

  return { veterinarios: dados || [], carregando, criar, remover };
}
