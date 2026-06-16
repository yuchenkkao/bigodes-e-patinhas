import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, FaSave, FaPaw, FaUser, FaFileMedicalAlt, 
  FaWeight, FaNotesMedical, FaFlask, FaPills, FaLock 
} from 'react-icons/fa';
import { MdVaccines } from 'react-icons/md';
import './styles.css';

export default function Atendimento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('@BigodesToken') || 'visitante';

  const bancoAtendimentos = [
    { id: 1, petNome: 'Rex', especie: 'Cachorro', raca: 'Vira-lata (SRD)', idade: '2 anos', tutorNome: 'Maria Silva', motivo: 'Vacinação' },
    { id: 2, petNome: 'Mingau', especie: 'Gato', raca: 'Persa', idade: '1 ano', tutorNome: 'Carlos Souza', motivo: 'Saúde Bucal' },
    { id: 3, petNome: 'Luna', especie: 'Cachorro', raca: 'Poodle', idade: '3 anos', tutorNome: 'Ana Costa', motivo: 'Clínico Geral' },
  ];

  const pacienteAtual = bancoAtendimentos.find(atend => atend.id === Number(id)) || bancoAtendimentos[0];

  const [pesoConsulta, setPesoConsulta] = useState('');
  const [sinaisClinicos, setSinaisClinicos] = useState('');
  const [vacinaVermifugo, setVacinaVermifugo] = useState('');
  const [exames, setExames] = useState('');
  const [prescricoes, setPrescricoes] = useState('');

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

  const handleSalvarProntuario = (e) => {
    e.preventDefault();

    if (!pesoConsulta || !sinaisClinicos || !prescricoes) {
      alert('Por favor, preencha pelo menos o Peso, os Sinais Clínicos e as Prescrições/Condutas!');
      return;
    }

    const novaEvolucaoProntuario = {
      atendimentoId: id,
      petNome: pacienteAtual.petNome,
      data: new Date().toLocaleDateString('pt-BR'),
      pesoConsulta,
      sinaisClinicos,
      vacinaVermifugo: vacinaVermifugo || 'Nenhuma vacina aplicada nesta consulta.',
      exames: exames || 'Nenhum exame solicitado.',
      prescricoes
    };

    console.log('Salvando Prontuário Médico:', novaEvolucaoProntuario);
    alert(`Prontuário de ${pacienteAtual.petNome} salvo.`);
    
    navigate('/agenda');
  };

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

            {/* Campo 2: Anamnese e Sinais Clínicos */}
            <div className="input-group-clinico">
              <label><FaNotesMedical />Sinais clínicos e exame físico *</label>
              <textarea 
                rows="4"
                placeholder="Descreva o estado geral do animal, mucosas, frequência cardíaca, temperatura e observações clínicas relevantes..."
                value={sinaisClinicos}
                onChange={(e) => setSinaisClinicos(e.target.value)}
              />
            </div>

            <div className="input-group-clinico">
              <label><MdVaccines /> Vacinas, imunizantes ou vermífugos aplicados na sessão</label>
              <textarea 
                rows="2"
                placeholder="Se houver, especifique o nome da vacina, marca e número do lote..."
                value={vacinaVermifugo}
                onChange={(e) => setVacinaVermifugo(e.target.value)}
              />
            </div>

            <div className="input-group-clinico">
              <label><FaFlask /> Exames complementares solicitados</label>
              <textarea 
                rows="2"
                placeholder="Ex: Hemograma completo, Ultrassonografia abdominal, Raio-X coxofemoral..."
                value={exames}
                onChange={(e) => setExames(e.target.value)}
              />
            </div>

            <div className="input-group-clinico">
              <label><FaPills /> Prescrições Medicamentosas & Conduta Médica *</label>
              <textarea 
                rows="4"
                placeholder="Receituário detalhado, dosagens, horários de administração, recomendações de repouso ou retorno clínico..."
                value={prescricoes}
                onChange={(e) => setPrescricoes(e.target.value)}
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