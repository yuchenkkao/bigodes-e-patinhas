import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { listarCids, criarCid, removerCid } from '../services/cidsService';

export function useCids() {
  const { dados, carregando, setDados } = useRequisicao(listarCids, []);

  const criar = useCallback(async (dadosCid) => {
    const cid = await criarCid(dadosCid);
    setDados((atual) => [...(atual || []), cid]);
    return cid;
  }, [setDados]);

  const remover = useCallback(async (id) => {
    await removerCid(id);
    setDados((atual) => (atual || []).filter((c) => c.id !== id));
  }, [setDados]);

  return { cids: dados || [], carregando, criar, remover };
}
