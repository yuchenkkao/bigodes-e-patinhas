/** @typedef {import('../@types/Tutor').Tutor} Tutor */

const API_URL = 'http://localhost:8080/api/tutores';

function normalizarTutor(tutor) {
  if (!tutor) return null;
  return {
    ...tutor,
    id: tutor.id ?? tutor.idTutor,
    idTutor: tutor.idTutor ?? tutor.id,
    nome: tutor.nome ?? tutor.nomeTutor ?? '',
    nomeTutor: tutor.nomeTutor ?? tutor.nome ?? '',
    cpf: tutor.cpf ?? tutor.CPF ?? '',
    telefone: tutor.telefone ?? tutor.telefoneTutor ?? '',
    telefoneTutor: tutor.telefoneTutor ?? tutor.telefone ?? '',
    email: tutor.email ?? tutor.emailTutor ?? '',
    emailTutor: tutor.emailTutor ?? tutor.email ?? '',
    endereco: tutor.endereco || {
      rua: tutor.rua || tutor.nomeRua || '',
      numero: tutor.numero || tutor.numeroEndereco || '',
      bairro: tutor.bairro || tutor.nomeBairro || '',
      cidade: tutor.cidade || tutor.nomeCidade || '',
      estado: tutor.estado || tutor.nomeEstado || '',
      cep: tutor.cep || tutor.CEP || ''
    }
  };
}

/** @returns {Promise<Tutor[]>} */
export async function listarTutores() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erro ao listar tutores do banco.');
  }
  const dados = await response.json();
  return Array.isArray(dados) ? dados.map(normalizarTutor) : [];
}

/** @param {string|number} id @returns {Promise<Tutor|null>} */
export async function buscarTutorPorId(id) {
  if (!id || id === 'undefined' || id === 'null') {
    return null;
  }

  const response = await fetch(`${API_URL}/${id}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error('Erro ao buscar tutor.');
  }
  const dados = await response.json();
  return normalizarTutor(dados);
}

/** @param {any} dadosTutor @returns {Promise<Tutor>} */
export async function criarTutor(dadosTutor) {
  const payload = {
    nomeTutor: dadosTutor.nome || dadosTutor.nomeTutor || '',
    cpf: dadosTutor.cpf || dadosTutor.CPF || '',
    telefone: dadosTutor.telefone || dadosTutor.telefoneTutor || '',
    email: dadosTutor.email || dadosTutor.emailTutor || '',
    estadoNome: dadosTutor.estadoNome || dadosTutor.endereco?.estado || '',
    cidadeNome: dadosTutor.cidadeNome || dadosTutor.endereco?.cidade || '',
    bairroNome: dadosTutor.bairroNome || dadosTutor.endereco?.bairro || '',
    ruaNome: dadosTutor.ruaNome || dadosTutor.rua || dadosTutor.endereco?.rua || '',
    numeroEndereco: dadosTutor.numeroEndereco || (dadosTutor.numero ? parseInt(dadosTutor.numero, 10) : null) || (dadosTutor.endereco?.numero ? parseInt(dadosTutor.endereco.numero, 10) : null),
    cep: dadosTutor.cep || dadosTutor.endereco?.cep || ''
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Erro ao salvar tutor e endereço.');
  }

  const tutorSalvo = await response.json();
  return normalizarTutor(tutorSalvo);
}