import './styles.css';

import { FaStethoscope } from 'react-icons/fa';
import { useServicosOferecidos } from '../../../data/hooks/useServicosOferecidos';

function ServicoCard({ titulo, descricao }) {
  return (
    <div className="servico-card">
      <div className="bola-icone">
        <FaStethoscope className="servico-icon" />
      </div>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
    </div>
  );
}

export default function Servicos() {
  const { servicos } = useServicosOferecidos();

  return (
    <section className="servicos-section">
      <h2>Conheça nossos serviços!</h2>

      <div className="cards-container">
        {servicos.map((servico) => (
          <ServicoCard
            key={servico.id}
            titulo={servico.nome}
            descricao={servico.descricao}
          />
        ))}
      </div>
    </section>
  );
}
