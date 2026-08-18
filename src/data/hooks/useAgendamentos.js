import { useState, useCallback, useEffect } from 'react';

const API_AGENDAMENTOS_URL = 'http://localhost:8080/api/agendamentos';

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const carregarAgendamentos = useCallback(async (filtros = {}) => {
    try {
      setCarregando(true);
      const queryParams = new URLSearchParams(filtros).toString();
      const url = queryParams ? `${API_AGENDAMENTOS_URL}?${queryParams}` : API_AGENDAMENTOS_URL;
      
      const res = await fetch(url);
      if (res.ok) {
        const dados = await res.json();
        setAgendamentos(dados);
      }
    } catch (err) {
      console.error('Erro ao carregar agendamentos:', err);
    } finally {
      setCarregando(false);
    }
  }, []);

  const criarAgendamento = useCallback(async ({ idVeterinario, idPet, idServico, data, horario, descricao }) => {
    const dataStr = data.toISOString().split('T')[0];
    const dataHoraStr = `${dataStr} ${horario}:00`;

    const res = await fetch(API_AGENDAMENTOS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idVeterinario: idVeterinario || 1,
        idPet: idPet || 1,
        idServico: idServico || 1,
        dataHora: dataHoraStr,
        descricao: descricao || 'Consulta Veterinária'
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.erro || 'Erro ao realizar reserva');
    }

    const resultado = await res.json();
    return resultado;
  }, []);

  const atualizarStatus = async (id, status) => {
    try {
      await fetch(`${API_AGENDAMENTOS_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setAgendamentos(prev =>
        prev.map(item => (item.id === id ? { ...item, status } : item))
      );
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  return {
    agendamentos,
    carregando,
    carregarAgendamentos,
    criar: criarAgendamento,
    atualizarStatus
  };
}

export function useMeusAgendamentos() {
  const { agendamentos, carregando, carregarAgendamentos, atualizarStatus } = useAgendamentos();

  useEffect(() => {
    carregarAgendamentos();
  }, [carregarAgendamentos]);

  return {
    agendamentos,
    carregando,
    recarregar: carregarAgendamentos,
    atualizarStatus,
    cancelarAgendamento: (id) => atualizarStatus(id, 'CANCELADO')
  };
}