/** @typedef {import('../@types/Servico').Servico} Servico */

/** @returns {Promise<Servico[]>} */
export async function listarServicos() {
  return [];
}

/** @param {Partial<Servico>} dadosServico @returns {Promise<Servico>} */
export async function criarServico(dadosServico) {
  return { ...dadosServico };
}

/** @param {string} id @returns {Promise<void>} */
export async function removerServico(id) {}
