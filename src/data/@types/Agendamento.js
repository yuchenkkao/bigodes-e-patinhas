/**
 * @typedef {'Agendado'|'Concluído'|'Cancelado'|'Faltou'} StatusAgendamento
 */

/**
 * @typedef {Object} Horario
 * @property {string} hora
 * @property {boolean} ativo
 */

/**
 * @typedef {Object} Agendamento
 * @property {string} id
 * @property {string} data
 * @property {string} horario
 * @property {string} petId
 * @property {string} petNome
 * @property {string} [especie]
 * @property {string} tutorId
 * @property {string} tutorNome
 * @property {string} veterinarioId
 * @property {string} veterinarioNome
 * @property {string} motivo
 * @property {StatusAgendamento} status
 */

export {};
