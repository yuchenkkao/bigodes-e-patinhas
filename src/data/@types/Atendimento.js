/**
 * @typedef {Object} FichaAtendimento
 * @property {string} agendamentoId
 * @property {string} petId
 * @property {string} petNome
 * @property {string} especie
 * @property {string} [raca]
 * @property {string} [idade]
 * @property {string} tutorNome
 * @property {string} motivo
 */

/**
 * Um item de vacina aplicada/agendada durante o atendimento — resultado de cada uso do
 * fluxo em cascata (Passo 1: vacina do catálogo; Passo 2: lote dependente da vacina escolhida).
 * @typedef {Object} VacinaAtendimentoItem
 * @property {string} nome
 * @property {string} lote
 * @property {'Aplicada'|'Agendado'} status
 * @property {string} data
 */

/**
 * @typedef {Object} EvolucaoProntuario
 * @property {string} id
 * @property {string} [agendamentoId]
 * @property {string} petId
 * @property {string} data
 * @property {string} [veterinario]
 * @property {string} [motivo]
 * @property {string} pesoConsulta
 * @property {string[]} sinaisClinicos - tags digitadas no atendimento (sintomas/sinais clínicos)
 * @property {string[]} [vacinaVermifugo] - tags livres de vermífugos/observações de imunização
 * @property {string[]} [exames] - tags de exames solicitados
 * @property {string[]} prescricoes - tags de prescrições/condutas
 * @property {VacinaAtendimentoItem[]} [vacinas] - vacinas do catálogo aplicadas/agendadas neste atendimento
 * @property {string} [observacoes] - texto livre, sem estrutura de tags
 */

export {};
