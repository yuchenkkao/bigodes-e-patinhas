import { 
  FaWeight, FaStethoscope, FaLock, FaFileMedicalAlt, FaPlus,
  FaFlask, FaNotesMedical, FaPills
} from 'react-icons/fa';
import { MdVaccines } from 'react-icons/md';
import './styles.css';

export default function ProntuarioPet({ token, historico }) {
  return (
    <div className="pet-prontuario-section">
      {token === 'veterinario' ? (
        <>
          <div className="prontuario-header">
            <h3><FaFileMedicalAlt /> Prontuário Clínico Digital</h3>
            <button className="btn-nova-evolucao" onClick={() => alert('Nova evolução...')}>
              <FaPlus /> Nova Evolução
            </button>
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
                    <p className="campo-texto">{consulta.sinaisClinicos}</p>
                  </div>
                  <div className="campo-clinico-item">
                    <span className="campo-label"><MdVaccines /> Vacinas & Vermífugos Aplicados:</span>
                    <p className="campo-texto emfatizado-verde">{consulta.vacinaVermifugo}</p>
                  </div>
                  <div className="campo-clinico-item">
                    <span className="campo-label"><FaFlask /> Exames Solicitados:</span>
                    <p className="campo-texto">{consulta.exames}</p>
                  </div>
                  <div className="campo-clinico-item">
                    <span className="campo-label"><FaPills /> Prescrições & Conduta Médica:</span>
                    <p className="campo-texto emfatizado-azul">{consulta.prescricoes}</p>
                  </div>
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