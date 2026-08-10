/** @typedef {import('../@types/Veterinario').Veterinario} Veterinario */

/** @returns {Promise<Veterinario[]>} */
export async function listarVeterinarios() {
  return [];
}

/** @param {Partial<Veterinario>} dadosVeterinario @returns {Promise<Veterinario>} */
export async function criarVeterinario(dadosVeterinario) {
  return { ...dadosVeterinario };
}

/** @param {string} id @returns {Promise<void>} */
export async function removerVeterinario(id) {}
