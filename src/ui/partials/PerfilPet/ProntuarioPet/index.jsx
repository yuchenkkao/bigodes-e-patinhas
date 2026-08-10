import { Link } from 'react-router-dom';
import {
  FaWeight, FaStethoscope, FaLock, FaFileMedicalAlt, FaPlus,
  FaFlask, FaNotesMedical, FaPills, FaStickyNote
} from 'react-icons/fa';
import { MdVaccines } from 'react-icons/md';
import './styles.css';

// Renderiza um array de tags simples (sinais clínicos, vermífugos) como chips somente leitura
function ListaTags({ itens }) {
  if (!itens || itens.length === 0) {
    return <p className="campo-texto campo-vazio">Nenhum registro.</p>;
  }
  return (
    <div className="lista-tags-prontuario">
      {itens.map((item, indice) => (
        <span key={`${item}-${indice}`} className="tag-chip-prontuario">{item}</span>
      ))}
    </div>
  );
}

// Renderiza o array de vacinas do catálogo aplicadas/agendadas neste atendimento (nome + lote + status)
function ListaVacinas({ itens }) {
  if (!itens || itens.length === 0) {
    return <p className="campo-texto campo-vazio">Nenhuma vacina registrada neste atendimento.</p>;
  }
  return (
    <div className="lista-tags-prontuario">
      {itens.map((item, indice) => (
        <span key={`${item.nome}-${item.lote}-${indice}`} className="tag-chip-prontuario tag-chip-vacina-prontuario">
          {item.nome} · Lote {item.lote} · {item.status === 'Agendado' ? `Agendada ${item.data}` : `Aplicada ${item.data}`}
        </span>
      ))}
    </div>
  );
}

// Renderiza os CIDs (diagnósticos) selecionados neste atendimento
function ListaCids({ itens }) {
  if (!itens || itens.length === 0) {
    return <p className="campo-texto campo-vazio">Nenhum diagnóstico registrado.</p>;
  }
  return (
    <div className="lista-tags-prontuario">
      {itens.map((cid) => (
        <span key={cid.cidId} className="tag-chip-prontuario">{cid.codigo} — {cid.descricao}</span>
      ))}
    </div>
  );
}

// Exames: nome lado a lado com o resultado, um por linha
function ListaExames({ itens }) {
  if (!itens || itens.length === 0) {
    return <p className="campo-texto campo-vazio">Nenhum exame solicitado.</p>;
  }
  return (
    <div className="lista-exames-prontuario">
      {itens.map((exame, indice) => (
        <div key={`${exame.exameId}-${indice}`} className="linha-exame-prontuario">
          <strong>{exame.nome}</strong>
          <span>{exame.resultado || 'Resultado pendente'}</span>
        </div>
      ))}
    </div>
  );
}

// Medicamentos: lista com dosagem e frequência em destaque, duração/observação como detalhe
function ListaMedicamentos({ itens }) {
  if (!itens || itens.length === 0) {
    return <p className="campo-texto campo-vazio">Nenhum medicamento prescrito.</p>;
  }
  return (
    <div className="lista-medicamentos-prontuario">
      {itens.map((medicamento, indice) => (
        <div key={`${medicamento.medicamentoId}-${indice}`} className="linha-medicamento-prontuario">
          <div className="linha-medicamento-topo">
            <strong>{medicamento.nome}</strong>
            <span className="badge-dosagem-prontuario">{medicamento.dosagem} · {medicamento.frequencia}</span>
          </div>
          {(medicamento.duracao || medicamento.observacao) && (
            <p className="linha-medicamento-detalhe">
              {medicamento.duracao && <>Duração: {medicamento.duracao}. </>}
              {medicamento.observacao}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ProntuarioPet({ token, historico, petId }) {
  return (
    <div className="pet-prontuario-section">
      {token === 'veterinario' ? (
        <>
          <div className="prontuario-header">
            <h3><FaFileMedicalAlt /> Prontuário Clínico Digital</h3>
            <Link to={`/atendimento/${petId}`} className="btn-nova-evolucao">
              <FaPlus /> Novo Atendimento
            </Link>
          </div>

          <div className="linha-do-tempo-medica">
            {historico.map((consulta) => (
              <div key={consulta.id} className="card-evolucao">
                <div className="evolucao-top">
                  <div className="evolucao-meta">
                    <span className="evolucao-data">{consulta.data}</span>
                    <span className="evolucao-vet"><FaStethoscope /> {consulta.veterinario}</span>
                  </div>
                  <span className="badge-motivo-consulta">{consulta.motivo}</span>
                </div>

                <div className="evolucao-corpo-campos">
                  <div className="campo-clinico-linha">
                    <div className="campo-item">
                      <span className="campo-label"><FaWeight /> Peso no Atendimento:</span>
                      <p className="campo-texto weight-text">{consulta.pesoConsulta} kg</p>
                    </div>
                  </div>
                  <div className="campo-clinico-item">
                    <span className="campo-label"><FaNotesMedical /> Sinais Clínicos / Anamnese:</span>
                    <ListaTags itens={consulta.sinaisClinicos} />
                  </div>
                  <div className="campo-clinico-item">
                    <span className="campo-label"><FaNotesMedical /> Diagnósticos (CID):</span>
                    <ListaCids itens={consulta.cids} />
                  </div>
                  <div className="campo-clinico-item">
                    <span className="campo-label"><MdVaccines /> Vermífugos e Observações de Imunização:</span>
                    <ListaTags itens={consulta.vacinaVermifugo} />
                  </div>
                  <div className="campo-clinico-item">
                    <span className="campo-label"><MdVaccines /> Vacinas Aplicadas/Agendadas:</span>
                    <ListaVacinas itens={consulta.vacinas} />
                  </div>
                  <div className="campo-clinico-item">
                    <span className="campo-label"><FaFlask /> Exames Solicitados / Resultado:</span>
                    <ListaExames itens={consulta.exames} />
                  </div>
                  <div className="campo-clinico-item">
                    <span className="campo-label"><FaPills /> Medicamentos Prescritos:</span>
                    <ListaMedicamentos itens={consulta.medicamentos} />
                  </div>
                  {consulta.observacoes && (
                    <div className="campo-clinico-item">
                      <span className="campo-label"><FaStickyNote /> Observações do Atendimento:</span>
                      <p className="campo-texto campo-observacoes">{consulta.observacoes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="prontuario-bloqueado">
          <div className="lock-circle"><FaLock /></div>
          <h3>Histórico Clínico Restrito</h3>
          <p>Os registros de prontuários, receitas e diagnósticos são acessíveis <strong>apenas para Médicos Veterinários</strong>.</p>
        </div>
      )}
    </div>
  );
}