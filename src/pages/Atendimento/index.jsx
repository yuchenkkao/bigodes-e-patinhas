import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FaArrowLeft, FaSave, FaPaw, FaUser, FaFileMedicalAlt,
  FaWeight, FaNotesMedical, FaFlask, FaPills, FaLock, FaPlus, FaTimes
} from 'react-icons/fa';
import { MdVaccines } from 'react-icons/md';
import './styles.css';
import { useAuth } from '../../data/hooks/useAuth';
import { useAtendimento } from '../../data/hooks/useAtendimento';
import { useAtendimentoVacinacao } from '../../data/hooks/useAtendimentoVacinacao';
import { useVacinas } from '../../data/hooks/useVacinas';
import MultiTagInput from '../../ui/components/MultiTagInput';
import CascadingSelect from '../../ui/components/CascadingSelect';

export default function Atendimento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { papel: token } = useAuth();

  const { ficha: pacienteAtual, salvarEvolucao } = useAtendimento(id);
  // Sincroniza as vacinas registradas neste atendimento com a carteirinha do pet (usada em PerfilPet)
  const { adicionarVacina } = useVacinas(pacienteAtual?.petId);

  const [pesoConsulta, setPesoConsulta] = useState('');
  // Campos dinâmicos: cada um é um array de strings alimentado pelo MultiTagInput (tag a tag)
  const [sinaisClinicos, setSinaisClinicos] = useState([]);
  const [vacinaVermifugo, setVacinaVermifugo] = useState([]);
  const [exames, setExames] = useState([]);
  const [prescricoes, setPrescricoes] = useState([]);
  // Campo novo: texto livre de múltiplas linhas, sem estrutura de tags
  const [observacoes, setObservacoes] = useState('');

  // Seção de vacinação em cascata (vacina do catálogo -> lote dependente) — toda a lógica
  // de filtragem/limpeza e o array de itens vive no hook, este componente só consome
  const {
    vacinasCatalogo,
    vacinaCatalogoId,
    selecionarVacina,
    lote,
    setLote,
    lotesDisponiveis,
    statusDose,
    setStatusDose,
    dataAgendada,
    setDataAgendada,
    itensVacinacao,
    adicionarItem: adicionarItemVacinacao,
    removerItem: removerItemVacinacao
  } = useAtendimentoVacinacao();

  if (token !== 'veterinario') {
    return (
      <div className="atendimento-bloqueado-container">
        <div className="lock-box">
          <FaLock />
        </div>
        <h2>Acesso Restrito</h2>
        <p>Esta tela é de uso exclusivo para <strong>Médicos Veterinários</strong> autorizados.</p>
        <Link to="/agenda" className="btn-voltar-trava"><FaArrowLeft /> Voltar para a Agenda</Link>
      </div>
    );
  }

  const handleSalvarProntuario = async (e) => {
    e.preventDefault();

    if (!pesoConsulta || sinaisClinicos.length === 0 || prescricoes.length === 0) {
      alert('Por favor, preencha pelo menos o Peso, os Sinais Clínicos e as Prescrições/Condutas!');
      return;
    }

    await salvarEvolucao({
      agendamentoId: id,
      petId: pacienteAtual.petId,
      data: new Date().toLocaleDateString('pt-BR'),
      pesoConsulta,
      sinaisClinicos,
      vacinaVermifugo,
      exames,
      prescricoes,
      vacinas: itensVacinacao,
      observacoes
    });

    // Cada vacina registrada/agendada neste atendimento também vira um registro na carteirinha do pet
    await Promise.all(itensVacinacao.map((item) => adicionarVacina(item)));

    alert(`Prontuário de ${pacienteAtual.petNome} salvo.`);

    navigate('/agenda');
  };

  if (token === 'veterinario' && !pacienteAtual) {
    return (
      <div className="atendimento-bloqueado-container">
        <div className="lock-box">
          <FaPaw />
        </div>
        <h2>Paciente não localizado</h2>
        <p>Não foi possível carregar os dados deste atendimento.</p>
        <Link to="/agenda" className="btn-voltar-trava"><FaArrowLeft /> Voltar para a Agenda</Link>
      </div>
    );
  }

  return (
    <div className="atendimento-page-container">
      
      <div className="atendimento-back-nav">
        <button type="button" className="btn-flat-voltar" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Cancelar Atendimento
        </button>
      </div>

      <div className="atendimento-layout-grid">
        
        <div className="mini-card-paciente">
          <div className="badge-status-atendendo">🔴 Em Atendimento</div>
          <div className="avatar-paciente-atend"><FaPaw /></div>
          <h2>{pacienteAtual.petNome}</h2>
          <span className="especie-tag-atend">{pacienteAtual.especie}</span>

          <div className="metadados-paciente-atend">
            <p><strong>Raça:</strong> {pacienteAtual.raca}</p>
            <p><strong>Idade:</strong> {pacienteAtual.idade}</p>
            <p className="motivo-destacado"><strong>Motivo Principal:</strong> <br /> {pacienteAtual.motivo}</p>
          </div>

          <div className="tutor-box-atend">
            <FaUser />
            <div>
              <span>Tutor Responsável</span>
              <h4>{pacienteAtual.tutorNome}</h4>
            </div>
          </div>
        </div>

        <div className="formulario-prontuario-card">
          <div className="form-prontuario-header">
            <FaFileMedicalAlt className="icon-titulo-pront" />
            <div>
              <h3>Nova Evolução Clínica Digital</h3>
              <p>Preencha os campos abaixo com os dados coletados durante o exame físico do paciente.</p>
            </div>
          </div>

          <form onSubmit={handleSalvarProntuario} className="form-clinico-corpo">
            
            <div className="input-group-clinico">
              <label><FaWeight /> Peso atual no atendimento (kg) *</label>
              <input 
                type="number" 
                step="0.01"
                placeholder="Ex: 14.20" 
                value={pesoConsulta}
                onChange={(e) => setPesoConsulta(e.target.value)}
              />
            </div>

            {/* Campo 2: Anamnese e Sinais Clínicos — tag a tag via MultiTagInput (botão "+" ou Enter) */}
            <div className="input-group-clinico">
              <label><FaNotesMedical /> Sinais clínicos e exame físico *</label>
              <MultiTagInput
                placeholder="Digite um sinal/sintoma e pressione Enter ou +"
                tags={sinaisClinicos}
                onChange={setSinaisClinicos}
              />
            </div>

            <div className="input-group-clinico">
              <label><MdVaccines /> Vermífugos e outras observações de imunização</label>
              <MultiTagInput
                placeholder="Ex: Vermífugo Drontal Plus..."
                tags={vacinaVermifugo}
                onChange={setVacinaVermifugo}
              />
            </div>

            {/* Registro/Agendamento de vacina do catálogo — fluxo em cascata: Passo 1 escolhe a
                vacina, Passo 2 (lote) só habilita depois e mostra só os lotes daquela vacina;
                trocar a vacina limpa o lote automaticamente (regra aplicada dentro do hook) */}
            <div className="input-group-clinico secao-vacinacao">
              <label><MdVaccines /> Registrar Vacina do Catálogo (Aplicada ou Agendada)</label>

              <CascadingSelect
                parentLabel="Passo 1 — Vacina"
                parentPlaceholder="-- Selecione a vacina --"
                parentOptions={vacinasCatalogo.map((v) => ({ value: v.id, label: v.nome }))}
                parentValue={vacinaCatalogoId}
                onParentChange={selecionarVacina}
                childLabel="Passo 2 — Lote"
                childPlaceholder="Selecione ou digite o lote"
                childOptions={lotesDisponiveis}
                childValue={lote}
                onChildChange={setLote}
              />

              <div className="vacinacao-status-linha">
                <label className="radio-label-vacinacao">
                  <input
                    type="radio"
                    name="statusDose"
                    checked={statusDose === 'Aplicada'}
                    onChange={() => setStatusDose('Aplicada')}
                  />
                  Aplicada agora
                </label>
                <label className="radio-label-vacinacao">
                  <input
                    type="radio"
                    name="statusDose"
                    checked={statusDose === 'Agendado'}
                    onChange={() => setStatusDose('Agendado')}
                  />
                  Agendar para depois
                </label>

                {statusDose === 'Agendado' && (
                  <input
                    type="date"
                    className="input-data-agendada"
                    value={dataAgendada}
                    onChange={(e) => setDataAgendada(e.target.value)}
                  />
                )}

                <button type="button" className="btn-adicionar-vacinacao" onClick={adicionarItemVacinacao}>
                  <FaPlus /> Adicionar
                </button>
              </div>

              {itensVacinacao.length > 0 && (
                <div className="lista-itens-vacinacao">
                  {itensVacinacao.map((item, indice) => (
                    <span key={`${item.nome}-${item.lote}-${indice}`} className="tag-chip-vacinacao">
                      {item.nome} · Lote {item.lote} · {item.status === 'Agendado' ? `Agendada ${item.data}` : 'Aplicada'}
                      <button type="button" onClick={() => removerItemVacinacao(indice)} aria-label={`Remover ${item.nome}`}>
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="input-group-clinico">
              <label><FaFlask /> Exames complementares solicitados</label>
              <MultiTagInput
                placeholder="Ex: Hemograma completo, Raio-X coxofemoral..."
                tags={exames}
                onChange={setExames}
              />
            </div>

            <div className="input-group-clinico">
              <label><FaPills /> Prescrições Medicamentosas & Conduta Médica *</label>
              <MultiTagInput
                placeholder="Ex: Posatex Gotas 1x ao dia por 10 dias..."
                tags={prescricoes}
                onChange={setPrescricoes}
              />
            </div>

            {/* Novo campo: texto livre de múltiplas linhas, sem tags */}
            <div className="input-group-clinico">
              <label><FaNotesMedical /> Observações do Atendimento</label>
              <textarea
                rows="4"
                placeholder="Observações gerais sobre o atendimento, comportamento do animal, orientações ao tutor..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
            </div>

            <div className="form-atendimento-botoes">
              <button type="button" className="btn-cancelar-atend" onClick={() => navigate(-1)}>
                Descartar
              </button>
              <button type="submit" className="btn-salvar-atend">
                <FaSave /> Finalizar e Salvar Prontuário
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}