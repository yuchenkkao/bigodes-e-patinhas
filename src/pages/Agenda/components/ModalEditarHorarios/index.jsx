import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './styles.css';

export default function ModalEditarHorarios({ mostrarModalEditar, setMostrarModalEditar, horarios, toggleHorario }) {
  if (!mostrarModalEditar) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-largo">
        <h2>Habilitar/Desabilitar Horários</h2>
        <p>Clique nos horários para alternar a visibilidade deles para os clientes.</p>
        
        <div className="grid-edicao-horarios">
          {horarios.map((item) => (
            <button
              key={item.hora}
              onClick={() => toggleHorario(item.hora)}
              className={`btn-editar-status ${item.ativo ? 'ativo' : 'inativo'}`}
            >
              {item.hora}
              {item.ativo ? <FaEye /> : <FaEyeSlash />}
            </button>
          ))}
        </div>

        <button className="btn-modal-salvar" onClick={() => setMostrarModalEditar(false)}>
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}