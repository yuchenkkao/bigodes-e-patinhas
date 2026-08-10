import { useRequisicao } from './useRequisicao';
import { buscarRelatorio } from '../services/relatoriosService';

export function useRelatorios(mes) {
  const { dados, carregando } = useRequisicao(() => buscarRelatorio(mes), [mes]);

  return { relatorio: dados, carregando };
}
