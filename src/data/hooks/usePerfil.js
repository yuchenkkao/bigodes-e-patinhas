import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { buscarPerfil, atualizarPerfil, listarMeusPets, listarHistoricoConsultas } from '../services/usuarioService';

export function usePerfil() {
  const { dados, carregando, setDados } = useRequisicao(buscarPerfil, []);

  const atualizar = useCallback(async (dadosAtualizados) => {
    const usuario = await atualizarPerfil(dadosAtualizados);
    setDados(usuario);
    return usuario;
  }, [setDados]);

  return { usuario: dados, carregando, atualizar };
}

export function useMeusPets() {
  const { dados, carregando } = useRequisicao(listarMeusPets, []);
  return { pets: dados || [], carregando };
}

export function useHistoricoConsultas() {
  const { dados, carregando } = useRequisicao(listarHistoricoConsultas, []);
  return { historico: dados || [], carregando };
}
