/** @typedef {import('../@types/Medicamento').Medicamento} Medicamento */

/** @returns {Promise<Medicamento[]>} */
export async function listarMedicamentos() {
  return [];
}

/** @param {Partial<Medicamento>} dadosMedicamento @returns {Promise<Medicamento>} */
export async function criarMedicamento(dadosMedicamento) {
  return { ...dadosMedicamento };
}

/** @param {string} id @returns {Promise<void>} */
export async function removerMedicamento(id) {}
