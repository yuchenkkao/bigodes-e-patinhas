import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { listarVacinas, criarVacina } from '../services/vacinasService';

export function useVacinas(petId) {
  const { dados, carregando, setDados } = useRequisicao(() => listarVacinas(petId), [petId]);

  const adicionarVacina = useCallback(async (dadosVacina) => {
    const vacina = await criarVacina(petId, dadosVacina);
    setDados((atual) => [...(atual || []), vacina]);
    return vacina;
  }, [petId, setDados]);

  return { vacinas: dados || [], carregando, adicionarVacina };
}
