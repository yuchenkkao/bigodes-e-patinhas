/**
 * @typedef {Object} Estado
 * @property {string} id
 * @property {string} nome
 * @property {string} sigla
 */

/**
 * @typedef {Object} Cidade
 * @property {string} id
 * @property {string} nome
 * @property {string} estadoId
 */

/**
 * @typedef {Object} Bairro
 * @property {string} id
 * @property {string} nome
 * @property {string} cidadeId
 */

/**
 * @typedef {Object} Endereco
 * @property {string} cep
 * @property {string} numero
 * @property {string} [rua]
 * @property {string} [estadoId]
 * @property {string} [estadoNome]
 * @property {string} [cidadeId]
 * @property {string} [cidadeNome]
 * @property {string} [bairroId]
 * @property {string} [bairroNome]
 */

export {};
