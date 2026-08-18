import { useState } from 'react';
import { FaCalendarCheck, FaTimes } from 'react-icons/fa';
import './styles.css';

export default function ModalAgendamento({
  mostrarModal,
  setMostrarModal,
  dataSelecionada,
  horarioSelecionado,
  idVeterinario = 1,
  onAgendamentoSucesso
}) {
  const [observacoes, setObservacoes] = useState('');
  const [salvando, setSalvando] = useState(false);

  if (!mostrarModal) return null;

  const fechar = () => setMostrarModal(false);

  const obterDataISO = (val) => {
    if (!val) return '';
    if (val instanceof Date) {
      const y = val.getFullYear();
      const m = String(val.getMonth() + 1).padStart(2, '0');
      const d = String(val.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    const str = String(val).trim();
    if (str.includes('/')) {
      const [d, m, y] = str.split('/');
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    return str.split('T')[0];
  };

  const handleConfirmar = async (e) => {
    e.preventDefault();
    const dataISO = obterDataISO(dataSelecionada);
    const horaFormatada = horarioSelecionado.length === 5 ? `${horarioSelecionado}:00` : horarioSelecionado;

    try {
      setSalvando(true);

      const response = await fetch('http://localhost:8080/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idVeterinario: Number(idVeterinario),
          idPet: 1,
          idServico: 1,
          dataHora: `${dataISO} ${horaFormatada}`,
          descricao: observacoes || 'Consulta Geral'
        })
      });

      if (!response.ok) {
        const erroData = await response.json().catch(() => ({}));
        throw new Error(erroData.erro || 'Erro ao agendar consulta.');
      }

      alert('Agendamento realizado com sucesso!');
      if (onAgendamentoSucesso) onAgendamentoSucesso();
      fechar();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Erro ao realizar agendamento.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="modal-agendamento-overlay">
      <div className="modal-agendamento-card">
        <div className="modal-agendamento-header">
          <h3><FaCalendarCheck /> Confirmar Agendamento</h3>
          <button type="button" className="btn-fechar" onClick={fechar}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleConfirmar}>
          <p className="modal-data-subtitulo">
            Reserva para <strong>{obterDataISO(dataSelecionada)}</strong> às <strong>{horarioSelecionado}h</strong>
          </p>

          <div className="campo-form">
            <label>Motivo da Consulta / Observações:</label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Ex: Check-up de rotina, vacinação..."
              rows="3"
            />
          </div>

          <div className="modal-agendamento-footer">
            <button type="button" className="btn-cancelar" onClick={fechar} disabled={salvando}>
              Cancelar
            </button>
            <button type="submit" className="btn-confirmar-salvar" disabled={salvando}>
              {salvando ? 'Reservando...' : 'Confirmar Reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}