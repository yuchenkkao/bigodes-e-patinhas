/** @typedef {import('../@types/Cid').Cid} Cid */

/** @returns {Promise<Cid[]>} */
export async function listarCids() {
  return [];
}

/** @param {Partial<Cid>} dadosCid @returns {Promise<Cid>} */
export async function criarCid(dadosCid) {
  return { ...dadosCid };
}

/** @param {string} id @returns {Promise<void>} */
export async function removerCid(id) {}
