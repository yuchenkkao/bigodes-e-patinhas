import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { listarVacinasCatalogo, criarVacinaCatalogo, removerVacinaCatalogo } from '../services/vacinasCatalogoService';

export function useVacinasCatalogo() {
  const { dados, carregando, setDados } = useRequisicao(listarVacinasCatalogo, []);

  const criar = useCallback(async (dadosVacina) => {
    const vacina = await criarVacinaCatalogo(dadosVacina);
    setDados((atual) => [...(atual || []), vacina]);
    return vacina;
  }, [setDados]);

  const remover = useCallback(async (id) => {
    await removerVacinaCatalogo(id);
    setDados((atual) => (atual || []).filter((v) => v.id !== id));
  }, [setDados]);

  return { vacinasCatalogo: dados || [], carregando, criar, remover };
}
