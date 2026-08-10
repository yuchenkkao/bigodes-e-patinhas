import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { listarTiposExame, criarTipoExame, removerTipoExame } from '../services/tiposExameService';

export function useTiposExame() {
  const { dados, carregando, setDados } = useRequisicao(listarTiposExame, []);

  const criar = useCallback(async (nome) => {
    const tipoExame = await criarTipoExame(nome);
    setDados((atual) => [...(atual || []), tipoExame]);
    return tipoExame;
  }, [setDados]);

  const remover = useCallback(async (id) => {
    await removerTipoExame(id);
    setDados((atual) => (atual || []).filter((e) => e.id !== id));
  }, [setDados]);

  return { tiposExame: dados || [], carregando, criar, remover };
}
