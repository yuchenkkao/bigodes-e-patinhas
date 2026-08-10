import { useState } from 'react';
import { FaShieldAlt, FaTimes, FaPlus, FaCalendarPlus } from 'react-icons/fa';

import FormRegistrarDose from './FormRegistrarDose';
import FormAgendarDose from './FormAgendarDose';

import './styles.css';
import { useAuth } from '../../../../data/hooks/useAuth';

export default function ModalCarteirinha({ isOpen, onClose, nome, vacinas, onAdicionarVacina }) {
  const [formAberto, setFormAberto] = useState(null);

  const { papel: token } = useAuth();

  const vacinasDoAnimal = vacinas || [];

  const manipularSalvarVacina = (novaVacina) => {
    if (typeof onAdicionarVacina === 'function') {
      onAdicionarVacina(novaVacina);
    } else {
      console.error("Erro: Propriedade 'onAdicionarVacina' ausente no pai.");
    }
    setFormAberto(null); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-carteirinha">
        
        <div className="carteirinha-header">
          <div className="carteirinha-titulo">
            <FaShieldAlt className="shield-icon" />
            <div>
              <h2>Histórico de Imunização</h2>
              <p>Carteira digital de vacinas de <strong>{nome}</strong></p>
            </div>
          </div>
          <button type="button" className="btn-fechar-x" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {(token === 'veterinario') && formAberto === null && (
          <div className="botoes-acao-veterinario">
            <button className="btn-registrar-dose" onClick={() => setFormAberto('registrar')}>
              <FaPlus /> Vacina Aplicada
            </button>
            <button className="btn-agendar-dose" onClick={() => setFormAberto('agendar')}>
              <FaCalendarPlus /> Agendar Vacina
            </button>
          </div>
        )}

        {formAberto === 'registrar' && (
          <FormRegistrarDose 
            onSalvar={manipularSalvarVacina} 
            onCancelar={() => setFormAberto(null)} 
          />
        )}

        {formAberto === 'agendar' && (
          <FormAgendarDose 
            onSalvar={manipularSalvarVacina} 
            onCancelar={() => setFormAberto(null)} 
          />
        )}

        <div className="carteirinha-corpo-tabela">
          <table className="tabela-vacinas">
            <thead>
              <tr>
                <th>Vacina / Imunizante</th>
                <th>Data</th>
                <th>Lote</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vacinasDoAnimal.map((vacina, index) => {
                let classeStatus = 'status-alerta'; 
                if (vacina.status === 'Aplicada') classeStatus = 'status-ok'; 
                if (vacina.status === 'Agendado') classeStatus = 'status-pendente';

                return (
                  <tr key={index}>
                    <td className="vacina-nome-td"><strong>{vacina.nome}</strong></td>
                    <td>{vacina.data}</td>
                    <td><span className="lote-code">{vacina.lote}</span></td>
                    <td>
                      <span className={`badge-status-vacina ${classeStatus}`}>
                        {vacina.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}