/**
 * @typedef {Object} DistribuicaoItem
 * @property {string} nome
 * @property {number} quantidade
 * @property {number} porcentagem
 */

/**
 * @typedef {Object} MetricasGerais
 * @property {number} totalAtendimentos
 * @property {number} mediaDiaria
 * @property {number} totalVacinas
 * @property {string} especiePrincipal
 */

/**
 * @typedef {Object} RelatorioMensal
 * @property {MetricasGerais} metricasGerais
 * @property {DistribuicaoItem[]} tiposPets
 * @property {DistribuicaoItem[]} motivosConsulta
 * @property {DistribuicaoItem[]} vacinasAplicadas
 */

export {};
