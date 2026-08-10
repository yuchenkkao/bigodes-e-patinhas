/** @typedef {import('../@types/Agendamento').Agendamento} Agendamento */
/** @typedef {import('../@types/Agendamento').Horario} Horario */
/** @typedef {import('../@types/Agendamento').StatusAgendamento} StatusAgendamento */

/** @returns {Promise<Horario[]>} */
export async function listarHorarios() {
  return [];
}

/** @param {string} hora @param {boolean} ativo @returns {Promise<void>} */
export async function atualizarHorario(hora, ativo) {}

/** @returns {Promise<Agendamento[]>} */
export async function listarAgendamentos() {
  return [];
}

/** @param {Partial<Agendamento>} dadosAgendamento @returns {Promise<Agendamento>} */
export async function criarAgendamento(dadosAgendamento) {
  return { status: 'Agendado', ...dadosAgendamento };
}

/** @param {string} id @param {StatusAgendamento} status @returns {Promise<void>} */
export async function atualizarStatusAgendamento(id, status) {}
