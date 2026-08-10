/** @typedef {import('../@types/Usuario').Usuario} Usuario */
/** @typedef {import('../@types/Pet').Pet} Pet */
/** @typedef {import('../@types/Agendamento').Agendamento} Agendamento */

/** @returns {Promise<Usuario|null>} */
export async function buscarPerfil() {
  return null;
}

/** @param {Partial<Usuario>} dadosUsuario @returns {Promise<Usuario>} */
export async function atualizarPerfil(dadosUsuario) {
  return { ...dadosUsuario };
}

/** @returns {Promise<Pet[]>} */
export async function listarMeusPets() {
  return [];
}

/** @returns {Promise<Agendamento[]>} */
export async function listarHistoricoConsultas() {
  return [];
}
