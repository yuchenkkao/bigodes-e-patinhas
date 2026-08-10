/** @typedef {import('../@types/Tutor').Tutor} Tutor */

/** @returns {Promise<Tutor[]>} */
export async function listarTutores() {
  return [];
}

/** @param {string} id @returns {Promise<Tutor|null>} */
export async function buscarTutorPorId(id) {
  return null;
}

/** @param {Partial<Tutor>} dadosTutor @returns {Promise<Tutor>} */
export async function criarTutor(dadosTutor) {
  return { ...dadosTutor };
}
