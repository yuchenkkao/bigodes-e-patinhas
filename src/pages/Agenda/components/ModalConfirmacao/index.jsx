import { FaCheckCircle } from 'react-icons/fa';
import './styles.css';

export default function ModalConfirmacao({ mostrarModal, fecharModal, dataFormatada, horarioSelecionado }) {
  if (!mostrarModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaCheckCircle className="modal-icon" />
        <h2>Agendamento Concluído!</h2>
        <p>O atendimento do seu pet foi marcado com sucesso.</p>
        
        <div className="modal-detalhes">
          <p>📅 <strong>Data:</strong> {dataFormatada}</p>
          <p>⏰ <strong>Horário:</strong> {horarioSelecionado}h</p>
        </div>

        <button className="btn-modal-fechar" onClick={fecharModal}>
          Fechar
        </button>
      </div>
    </div>
  );
}