/** @typedef {import('../@types/Especie').Especie} Especie */

/** @returns {Promise<Especie[]>} */
export async function listarEspecies() {
  return [];
}

/** @param {string} nome @returns {Promise<Especie>} */
export async function criarEspecie(nome) {
  return { nome };
}

/** @param {string} id @returns {Promise<void>} */
export async function removerEspecie(id) {}
