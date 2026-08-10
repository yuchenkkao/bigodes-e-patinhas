import { useCallback, useState } from 'react';
import { useRequisicao } from './useRequisicao';
import {
  listarEstados,
  listarCidadesPorEstado,
  listarBairrosPorCidade,
  buscarEnderecoPorCep
} from '../services/enderecoService';

export function useEstados() {
  const { dados, carregando } = useRequisicao(listarEstados, []);
  return { estados: dados || [], carregando };
}

export function useCidadesPorEstado(estadoId) {
  const { dados, carregando } = useRequisicao(
    () => (estadoId ? listarCidadesPorEstado(estadoId) : Promise.resolve([])),
    [estadoId]
  );
  return { cidades: dados || [], carregando };
}

export function useBairrosPorCidade(cidadeId) {
  const { dados, carregando } = useRequisicao(
    () => (cidadeId ? listarBairrosPorCidade(cidadeId) : Promise.resolve([])),
    [cidadeId]
  );
  return { bairros: dados || [], carregando };
}

// Consulta o CEP para pré-preencher Estado/Cidade/Bairro/Rua (hoje é um stub: buscarEnderecoPorCep sempre
// devolve null até existir uma integração real, ex: ViaCEP).
export function useBuscaCep() {
  const [buscando, setBuscando] = useState(false);

  const buscarPorCep = useCallback(async (cep) => {
    setBuscando(true);
    const endereco = await buscarEnderecoPorCep(cep);
    setBuscando(false);
    return endereco;
  }, []);

  return { buscarPorCep, buscando };
}
