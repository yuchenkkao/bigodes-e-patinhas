import { useCallback } from 'react';
import { useRequisicao } from './useRequisicao';
import { listarPets, buscarPetPorId, listarPetsPorTutor, criarPet } from '../services/petsService';

export function usePets() {
  const { dados, carregando, setDados } = useRequisicao(listarPets, []);

  const criar = useCallback(async (dadosPet) => {
    const pet = await criarPet(dadosPet);
    setDados((atual) => [...(atual || []), pet]);
    return pet;
  }, [setDados]);

  return { pets: dados || [], carregando, criar };
}

export function usePet(id) {
  const { dados, carregando } = useRequisicao(() => buscarPetPorId(id), [id]);
  return { pet: dados, carregando };
}

export function usePetsDoTutor(tutorId) {
  const { dados, carregando } = useRequisicao(
    () => (tutorId ? listarPetsPorTutor(tutorId) : Promise.resolve([])),
    [tutorId]
  );
  return { pets: dados || [], carregando };
}
