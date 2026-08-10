/** @typedef {import('../@types/Pet').Pet} Pet */

/** @returns {Promise<Pet[]>} */
export async function listarPets() {
  return [];
}

/** @param {string} id @returns {Promise<Pet|null>} */
export async function buscarPetPorId(id) {
  return null;
}

/** @param {string} tutorId @returns {Promise<Pet[]>} */
export async function listarPetsPorTutor(tutorId) {
  return [];
}

/** @param {Partial<Pet>} dadosPet @returns {Promise<Pet>} */
export async function criarPet(dadosPet) {
  return { ...dadosPet };
}
