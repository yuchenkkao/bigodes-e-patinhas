/** @typedef {import('../@types/Vacina').Vacina} Vacina */

/** @param {string} petId @returns {Promise<Vacina[]>} */
export async function listarVacinas(petId) {
  return [];
}

/** @param {string} petId @param {Partial<Vacina>} dadosVacina @returns {Promise<Vacina>} */
export async function criarVacina(petId, dadosVacina) {
  return { petId, ...dadosVacina };
}
