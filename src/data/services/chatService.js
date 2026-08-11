const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

/**
 * Envia a mensagem do usuário para o backend do Sr. Bigode e devolve o texto da resposta.
 * @param {string} mensagem
 * @returns {Promise<string>}
 */
export async function enviarMensagem(mensagem) {
  const resposta = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensagem })
  });

  if (!resposta.ok) {
    throw new Error(`Falha ao falar com o Sr. Bigode (status ${resposta.status})`);
  }

  const dados = await resposta.json();
  return dados.resposta;
}
