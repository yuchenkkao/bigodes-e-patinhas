import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaIdCard, FaStethoscope, FaClock, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import './styles.css';

export default function EquipeVeterinaria() {
  const navigate = useNavigate();

  const equipeVets = [
    {
      id: 1,
      nome: 'Dra. Mariana Silva',
      crmv: 'CRMV-PR 1234',
      especialidade:'Especialista no cuidado de filhotes, acompanhamento de desenvolvimento preventivo, imunização e tratamentos de odontologia preventiva (saúde bucal).',
    },
    {
      id: 2,
      nome: 'Dr. Eduardo Souza',
      crmv: 'CRMV-PR 5678',
      especialidade: 'Responsável pelo atendimento clínico geral complexo, diagnóstico por imagem laboratoriais e comando de procedimentos cirúrgicos de tecidos moles e castrações.',
    }
  ];

  return (
    <div className="equipe-page-container">
      
      <div className="equipe-header">
        <FaUserMd className="equipe-icon-principal" />
        <h2>Corpo Clínico Veterinário</h2>
        <p>Conheça os profissionais altamente qualificados e dedicados a oferecer o melhor cuidado para os seus melhores amigos.</p>
      </div>

      <div className="equipe-grid">
        {equipeVets.map((vet) => (
          <div key={vet.id} className="vet-card-corporativo">
            
            <div className="vet-card-header">
              <div className="vet-avatar-circulo">
                <FaUserMd />
              </div>
              <h3>{vet.nome}</h3>
              <span className="vet-crmv-tag">
                <FaIdCard /> {vet.crmv}
              </span>
            </div>

            <div className="vet-card-body">
              <div className="vet-info-linha-destaque">
                <FaStethoscope className="icon-sub-vet" />
                <div>
                  <strong>Especialidade Principal</strong>
                  <p>{vet.especialidade}</p>
                </div>
              </div>

            </div>


          </div>
        ))}
      </div>

    </div>
  );
}