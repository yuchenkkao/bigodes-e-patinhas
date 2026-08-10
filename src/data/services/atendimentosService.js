/** @typedef {import('../@types/Atendimento').FichaAtendimento} FichaAtendimento */
/** @typedef {import('../@types/Atendimento').EvolucaoProntuario} EvolucaoProntuario */

/** @param {string} agendamentoId @returns {Promise<FichaAtendimento|null>} */
export async function buscarFichaAtendimento(agendamentoId) {
  return null;
}

/** @param {string} petId @returns {Promise<EvolucaoProntuario[]>} */
export async function listarProntuario(petId) {
  return [];
}

/** @param {Partial<EvolucaoProntuario>} dadosEvolucao @returns {Promise<EvolucaoProntuario>} */
export async function registrarEvolucao(dadosEvolucao) {
  return { ...dadosEvolucao };
}
