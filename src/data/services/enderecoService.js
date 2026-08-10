/** @typedef {import('../@types/Endereco').Estado} Estado */
/** @typedef {import('../@types/Endereco').Cidade} Cidade */
/** @typedef {import('../@types/Endereco').Bairro} Bairro */
/** @typedef {import('../@types/Endereco').Endereco} Endereco */

/** @returns {Promise<Estado[]>} */
export async function listarEstados() {
  return [];
}

/** @param {string} estadoId @returns {Promise<Cidade[]>} */
export async function listarCidadesPorEstado(estadoId) {
  return [];
}

/** @param {string} cidadeId @returns {Promise<Bairro[]>} */
export async function listarBairrosPorCidade(cidadeId) {
  return [];
}

/**
 * Ponto de integração futura com um serviço de CEP (ex: ViaCEP): deve devolver o
 * endereço já resolvido para pré-preencher/filtrar os selects de Estado, Cidade e Bairro.
 * @param {string} cep @returns {Promise<Endereco|null>}
 */
export async function buscarEnderecoPorCep(cep) {
  return null;
}
