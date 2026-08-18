const API_URL = 'http://localhost:8080/api/pets';

export function normalizarPet(pet) {
  if (!pet) return null;
  return {
    ...pet,
    id: pet.id ?? pet.idPet ?? pet.id_Pet,
    nome: pet.nome ?? pet.nomePet ?? pet.nome_Pet ?? '',
    especie: pet.especie ?? pet.especiePet ?? pet.nome_Especie ?? pet.nomeEspecie ?? 'Pet',
    raca: pet.raca ?? pet.racaPet ?? pet.nome_Raca ?? pet.nomeRaca ?? 'SRD',
    idade: pet.idade ?? pet.idadePet ?? pet.idade_Pet ?? null,
    peso: pet.peso ?? pet.pesoPet ?? pet.peso_Pet ?? null,
    genero: pet.genero ?? pet.generoPet ?? pet.nome_Genero ?? pet.nomeGenero ?? '',
    idTutor: pet.idTutor ?? pet.id_Tutor ?? pet.tutor?.id ?? null,
    nomeTutor: pet.nomeTutor ?? pet.tutorNome ?? pet.nome_Tutor ?? pet.tutor?.nome ?? 'Não informado',
    telefoneTutor: pet.telefoneTutor ?? pet.telefone_Tutor ?? pet.tutor?.telefone ?? ''
  };
}

export async function listarPets() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar lista de pets.');
  const dados = await res.json();
  return Array.isArray(dados) ? dados.map(normalizarPet) : [];
}

export async function buscarPetPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Erro ao obter ficha do pet.');
  const dado = await res.json();
  return normalizarPet(dado);
}

export async function listarPetsPorTutor(idTutor) {
  if (!idTutor) return [];
  const res = await fetch(`${API_URL}/tutor/${idTutor}`);
  if (!res.ok) throw new Error('Erro ao buscar pets do tutor.');
  const dados = await res.json();
  return Array.isArray(dados) ? dados.map(normalizarPet) : [];
}

export async function criarPet(dadosPet) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosPet)
  });
  if (!res.ok) {
    const errorMsg = await res.text();
    throw new Error(errorMsg || 'Erro ao cadastrar pet.');
  }
  return await res.json();
}