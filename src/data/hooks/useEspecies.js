import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import {
  listarEspecies,
  criarEspecie,
  removerEspecie,
  adicionarRacaEspecie,
  removerRacaEspecie
} from '../services/especiesService';

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

  // Gestão de estado aninhado: adiciona uma raça DENTRO de uma espécie específica sem
  // mutar o array de espécies (nem o array de raças de qualquer outra espécie).
  // .map() sempre devolve um array NOVO; a espécie alvo vira uma cópia nova (spread) com
  // um array de racas também novo (spread + a raça adicionada) — todas as demais espécies
  // do array passam direto, mantendo a MESMA referência de objeto que já tinham antes.
  const adicionarRaca = useCallback(async (especieId, raca) => {
    await adicionarRacaEspecie(especieId, raca);
    setDados((atual) => (atual || []).map((especie) => (
      especie.id === especieId
        ? { ...especie, racas: [...especie.racas, raca] }
        : especie
    )));
  }, [setDados]);

  // Mesma ideia da remoção: só o array de racas da espécie alvo é substituído (via
  // filter, que também devolve array novo); as outras espécies do array não são tocadas.
  const removerRaca = useCallback(async (especieId, raca) => {
    await removerRacaEspecie(especieId, raca);
    setDados((atual) => (atual || []).map((especie) => (
      especie.id === especieId
        ? { ...especie, racas: especie.racas.filter((r) => r !== raca) }
        : especie
    )));
  }, [setDados]);

  return { especies: dados || [], carregando, criar, remover, adicionarRaca, removerRaca };
}
