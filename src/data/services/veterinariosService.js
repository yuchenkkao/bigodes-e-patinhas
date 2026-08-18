/** @typedef {import('../@types/Veterinario').Veterinario} Veterinario */

const API_URL = 'http://localhost:8080/api/veterinarios';

/** 
 * Busca a lista de veterinários cadastrados no banco
 * @returns {Promise<Veterinario[]>} 
 */
export async function listarVeterinarios() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) {
      throw new Error(`Erro ao buscar veterinários: ${resposta.statusText}`);
    }
    return await resposta.json();
  } catch (erro) {
    console.error('Erro no serviço listarVeterinarios:', erro);
    return [];
  }
}

/** 
 * Cria um novo veterinário
 * @param {Partial<Veterinario>} dadosVeterinario 
 * @returns {Promise<Veterinario>} 
 */
export async function criarVeterinario(dadosVeterinario) {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosVeterinario)
  });

  if (!resposta.ok) {
    throw new Error('Erro ao cadastrar veterinário.');
  }

  return await resposta.json();
}

/** 
 * Remove um veterinário pelo ID
 * @param {string | number} id 
 * @returns {Promise<void>} 
 */
export async function removerVeterinario(id) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!resposta.ok) {
    throw new Error('Erro ao remover veterinário.');
  }
}