import { useCallback, useState } from 'react';
import { useCids } from './useCids';
import { useTiposExame } from './useTiposExame';
import { useMedicamentos } from './useMedicamentos';

/**
 * Concentra a gestão de estado dos três arrays de objetos do Atendimento — CIDs
 * selecionados, exames solicitados (com resultado) e medicamentos prescritos (com
 * dosagem/frequência/duração/observação) — incluindo adicionar, remover e, principalmente,
 * atualizar um sub-campo de UM item específico sem afetar os demais itens do array.
 * O componente de UI só chama o que este hook expõe, nunca mexe nos arrays diretamente.
 */
export function useAtendimentoClinico() {
  const { cids: cidsDisponiveis } = useCids();
  const { tiposExame: tiposExameDisponiveis } = useTiposExame();
  const { medicamentos: medicamentosDisponiveis } = useMedicamentos();

  const [cidsSelecionados, setCidsSelecionados] = useState([]);
  const [exames, setExames] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);

  // --- CIDs: só adiciona/remove o objeto inteiro, não tem sub-campos editáveis ---
  const adicionarCid = useCallback((cid) => {
    if (!cid) return;
    setCidsSelecionados((atual) => (
      atual.some((c) => c.cidId === cid.id)
        ? atual
        : [...atual, { cidId: cid.id, codigo: cid.codigo, descricao: cid.descricao }]
    ));
  }, []);

  const removerCid = useCallback((cidId) => {
    setCidsSelecionados((atual) => atual.filter((c) => c.cidId !== cidId));
  }, []);

  // --- Exames: adicionar cria o item com resultado vazio; atualizarResultadoExame edita
  // apenas o item daquele índice, mantendo os demais exames do array intactos ---
  const adicionarExame = useCallback((tipoExame) => {
    if (!tipoExame) return;
    setExames((atual) => (
      atual.some((e) => e.exameId === tipoExame.id)
        ? atual
        : [...atual, { exameId: tipoExame.id, nome: tipoExame.nome, resultado: '' }]
    ));
  }, []);

  const atualizarResultadoExame = useCallback((indice, resultado) => {
    setExames((atual) => atual.map((item, i) => (i === indice ? { ...item, resultado } : item)));
  }, []);

  const removerExame = useCallback((indice) => {
    setExames((atual) => atual.filter((_, i) => i !== indice));
  }, []);

  // --- Medicamentos: mesma lógica dos exames, mas com 4 sub-campos por item; o campo a
  // atualizar é escolhido pelo nome (dosagem/frequencia/duracao/observacao) ---
  const adicionarMedicamento = useCallback((medicamento) => {
    if (!medicamento) return;
    setMedicamentos((atual) => (
      atual.some((m) => m.medicamentoId === medicamento.id)
        ? atual
        : [...atual, {
            medicamentoId: medicamento.id,
            nome: medicamento.nome,
            dosagem: '',
            frequencia: '',
            duracao: '',
            observacao: ''
          }]
    ));
  }, []);

  const atualizarCampoMedicamento = useCallback((indice, campo, valor) => {
    setMedicamentos((atual) => atual.map((item, i) => (i === indice ? { ...item, [campo]: valor } : item)));
  }, []);

  const removerMedicamento = useCallback((indice) => {
    setMedicamentos((atual) => atual.filter((_, i) => i !== indice));
  }, []);

  return {
    cidsDisponiveis,
    cidsSelecionados,
    adicionarCid,
    removerCid,

    tiposExameDisponiveis,
    exames,
    adicionarExame,
    atualizarResultadoExame,
    removerExame,

    medicamentosDisponiveis,
    medicamentos,
    adicionarMedicamento,
    atualizarCampoMedicamento,
    removerMedicamento
  };
}
