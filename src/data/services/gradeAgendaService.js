const API_URL = 'http://localhost:8080/api/grade-agenda';

export async function buscarGradeDoDia(idVeterinario, dataFormatada) {
  const res = await fetch(`${API_URL}?idVeterinario=${idVeterinario}&data=${dataFormatada}`);
  if (!res.ok) throw new Error('Erro ao buscar grade de horários.');
  return await res.json();
}

export async function salvarGradeDoDia(idVeterinario, dataFormatada, listaHorarios) {
  const res = await fetch(`${API_URL}/salvar-dia`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idVeterinario,
      data: dataFormatada,
      horarios: listaHorarios
    })
  });
  if (!res.ok) throw new Error('Erro ao salvar horários de atendimento.');
  return await res.json();
}