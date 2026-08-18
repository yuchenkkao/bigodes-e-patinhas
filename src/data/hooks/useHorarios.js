import { useState, useCallback } from 'react';
import { buscarGradeDoDia, salvarGradeDoDia } from '../services/gradeAgendaService';

function formatarDataISO(dataObj) {
  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const dia = String(dataObj.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export function useHorarios() {
  const [horarios, setHorarios] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const carregarHorarios = useCallback(async (idVeterinario, dataObj) => {
    if (!dataObj) return;
    try {
      setCarregando(true);
      const dataStr = formatarDataISO(dataObj);
      const dados = await buscarGradeDoDia(idVeterinario || 1, dataStr);
      setHorarios(dados);
    } catch (err) {
      console.error('Erro ao carregar horários:', err);
      setHorarios([]);
    } finally {
      setCarregando(false);
    }
  }, []);

  const salvarHorarios = async (idVeterinario, dataObj, listaHorarios) => {
    const dataStr = formatarDataISO(dataObj);
    await salvarGradeDoDia(idVeterinario || 1, dataStr, listaHorarios);
    await carregarHorarios(idVeterinario || 1, dataObj);
  };

  return {
    horarios,
    setHorarios,
    carregando,
    carregarHorarios,
    salvarHorarios
  };
}