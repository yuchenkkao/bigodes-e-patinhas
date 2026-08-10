import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { listarMedicamentos, criarMedicamento, removerMedicamento } from '../services/medicamentosService';

export function useMedicamentos() {
  const { dados, carregando, setDados } = useRequisicao(listarMedicamentos, []);

  const criar = useCallback(async (dadosMedicamento) => {
    const medicamento = await criarMedicamento(dadosMedicamento);
    setDados((atual) => [...(atual || []), medicamento]);
    return medicamento;
  }, [setDados]);

  const remover = useCallback(async (id) => {
    await removerMedicamento(id);
    setDados((atual) => (atual || []).filter((m) => m.id !== id));
  }, [setDados]);

  return { medicamentos: dados || [], carregando, criar, remover };
}
