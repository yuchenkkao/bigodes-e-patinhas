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
 * Um CID escolhido via autocomplete e adicionado à lista de diagnósticos do atendimento.
 * @typedef {Object} CidSelecionado
 * @property {string} cidId
 * @property {string} codigo
 * @property {string} descricao
 */

/**
 * Um exame solicitado via autocomplete — "resultado" começa vazio e é preenchido depois,
 * item a item, no ExamResultCard correspondente.
 * @typedef {Object} ExameSolicitado
 * @property {string} exameId
 * @property {string} nome
 * @property {string} resultado
 */

/**
 * Um medicamento escolhido via autocomplete — dosagem/frequência/duração/observação começam
 * vazias e são preenchidas depois, item a item, no MedicationPrescriptionForm correspondente.
 * @typedef {Object} MedicamentoPrescrito
 * @property {string} medicamentoId
 * @property {string} nome
 * @property {string} dosagem
 * @property {string} frequencia
 * @property {string} duracao
 * @property {string} observacao
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
 * @property {VacinaAtendimentoItem[]} [vacinas] - vacinas do catálogo aplicadas/agendadas neste atendimento
 * @property {CidSelecionado[]} [cids] - diagnósticos (CID) selecionados neste atendimento
 * @property {ExameSolicitado[]} [exames] - exames solicitados, cada um com seu resultado
 * @property {MedicamentoPrescrito[]} [medicamentos] - medicamentos prescritos, cada um com dosagem/frequência/duração/observação
 * @property {string} [observacoes] - texto livre, sem estrutura de tags
 */

export {};
