import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { listarEspecies, criarEspecie, removerEspecie } from '../services/especiesService';

export function useEspecies() {
  const { dados, carregando, setDados } = useRequisicao(listarEspecies, []);

  const criar = useCallback(async (nome) => {
    const especie = await criarEspecie(nome);
    setDados((atual) => [...(atual || []), especie]);
    return especie;
  }, [setDados]);

  const remover = useCallback(async (id) => {
    await removerEspecie(id);
    setDados((atual) => (atual || []).filter((e) => e.id !== id));
  }, [setDados]);

  return { especies: dados || [], carregando, criar, remover };
}
