import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { listarTutores, buscarTutorPorId, criarTutor } from '../services/tutoresService';

export function useTutores() {
  const { dados, carregando, setDados } = useRequisicao(listarTutores, []);

  const criar = useCallback(async (dadosTutor) => {
    const tutor = await criarTutor(dadosTutor);
    setDados((atual) => [...(atual || []), tutor]);
    return tutor;
  }, [setDados]);

  return { tutores: dados || [], carregando, criar };
}

export function useTutor(id) {
  const { dados, carregando } = useRequisicao(() => buscarTutorPorId(id), [id]);
  return { tutor: dados, carregando };
}
