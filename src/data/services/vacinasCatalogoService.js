/** @typedef {import('../@types/VacinaCatalogo').VacinaCatalogo} VacinaCatalogo */

/** @returns {Promise<VacinaCatalogo[]>} */
export async function listarVacinasCatalogo() {
  return [];
}

/** @param {Partial<VacinaCatalogo>} dadosVacina @returns {Promise<VacinaCatalogo>} */
export async function criarVacinaCatalogo(dadosVacina) {
  return { lotes: [], ...dadosVacina };
}

/** @param {string} id @returns {Promise<void>} */
export async function removerVacinaCatalogo(id) {}
