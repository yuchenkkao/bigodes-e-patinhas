import { FaUserMd, FaIdCard, FaStethoscope } from 'react-icons/fa';
import './styles.css';
import { useVeterinarios } from '../../data/hooks/useVeterinarios';

export default function EquipeVeterinaria() {
  const { veterinarios: equipeVets } = useVeterinarios();

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