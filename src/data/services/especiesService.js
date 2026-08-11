/** @typedef {import('../@types/Especie').Especie} Especie */

/** @returns {Promise<Especie[]>} */
export async function listarEspecies() {
  return [];
}

/** @param {string} nome @returns {Promise<Especie>} */
export async function criarEspecie(nome) {
  return { nome, racas: [] };
}

/** @param {string} id @returns {Promise<void>} */
export async function removerEspecie(id) {}

/** @param {string} especieId @param {string} raca @returns {Promise<void>} */
export async function adicionarRacaEspecie(especieId, raca) {}

/** @param {string} especieId @param {string} raca @returns {Promise<void>} */
export async function removerRacaEspecie(especieId, raca) {}
