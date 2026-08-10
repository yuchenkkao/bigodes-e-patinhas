export const estadoInicialFiltrosAgendamentos = { pesquisa: '', status: 'todos' };

export function filtrosAgendamentosReducer(estado, acao) {
  switch (acao.type) {
    case 'DEFINIR_PESQUISA':
      return { ...estado, pesquisa: acao.payload };
    case 'DEFINIR_STATUS':
      return { ...estado, status: acao.payload };
    default:
      return estado;
  }
}
