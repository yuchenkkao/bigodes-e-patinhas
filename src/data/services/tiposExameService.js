/** @typedef {import('../@types/TipoExame').TipoExame} TipoExame */

/** @returns {Promise<TipoExame[]>} */
export async function listarTiposExame() {
  return [];
}

/** @param {string} nome @returns {Promise<TipoExame>} */
export async function criarTipoExame(nome) {
  return { nome };
}

/** @param {string} id @returns {Promise<void>} */
export async function removerTipoExame(id) {}
