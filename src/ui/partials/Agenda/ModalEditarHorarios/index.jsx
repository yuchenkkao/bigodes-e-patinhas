import { useState, useEffect } from 'react';
import { FaClock, FaCheck, FaTimes, FaLock } from 'react-icons/fa';
import './styles.css';

const HORARIOS_PADRAO = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
];

export default function ModalEditarHorarios({
  mostrarModalEditar,
  setMostrarModalEditar,
  dataSelecionada,
  horarios = [],
  idVeterinario = 1,
  recarregarHorarios
}) {
  const [selecionados, setSelecionados] = useState([]);
  const [ocupados, setOcupados] = useState([]);
  const [salvando, setSalvando] = useState(false);

  // Conversão segura de qualquer tipo de data para YYYY-MM-DD
  const formatarParaISO = (val) => {
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

  const formatarParaExibicao = (val) => {
    const iso = formatarParaISO(val);
    if (!iso || !iso.includes('-')) return '';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };

  useEffect(() => {
    if (mostrarModalEditar && Array.isArray(horarios)) {
      const ativos = horarios
        .filter((item) => item.isAtivo !== false && item.isativo !== false)
        .map((item) => item.horario || item.hora);

      const jaAgendados = horarios
        .filter((item) => item.agendado === true || item.isAgendado === true)
        .map((item) => item.horario || item.hora);

      setSelecionados(ativos);
      setOcupados(jaAgendados);
    }
  }, [mostrarModalEditar, horarios]);

  if (!mostrarModalEditar) return null;

  const fechar = () => setMostrarModalEditar(false);

  const toggleHora = (hora) => {
    if (ocupados.includes(hora)) {
      alert('Este horário já foi agendado por um cliente e não pode ser removido.');
      return;
    }

    if (selecionados.includes(hora)) {
      setSelecionados(selecionados.filter((h) => h !== hora));
    } else {
      setSelecionados([...selecionados, hora]);
    }
  };

  const handleSalvar = async () => {
    const dataISO = formatarParaISO(dataSelecionada);

    if (!dataISO) {
      alert('Selecione uma data válida.');
      return;
    }

    try {
      setSalvando(true);

      const response = await fetch('http://localhost:8080/api/grade-agenda/salvar-dia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idVeterinario: Number(idVeterinario),
          data: dataISO,
          horarios: selecionados
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.erro || 'Erro ao salvar disponibilidade.');
      }

      alert('Disponibilidade do veterinário salva com sucesso!');

      if (typeof recarregarHorarios === 'function') {
        await recarregarHorarios();
      }

      fechar();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Erro ao salvar horários de atendimento.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="modal-horarios-overlay">
      <div className="modal-horarios-card">
        <div className="modal-horarios-header">
          <h3><FaClock /> Gerenciar Horários de Atendimento</h3>
          <button type="button" className="btn-fechar" onClick={fechar}>
            <FaTimes />
          </button>
        </div>

        <p className="modal-data-subtitulo">
          Configuração para: <strong>{formatarParaExibicao(dataSelecionada)}</strong>
        </p>

        <div className="legenda-horarios">
          <div className="item-legenda">
            <span className="dot dot-verde"></span> Disponível
          </div>
          <div className="item-legenda">
            <span className="dot dot-cinza"></span> Indisponível
          </div>
          <div className="item-legenda">
            <span className="dot dot-vermelho"></span> Agendado
          </div>
        </div>

        <div className="acoes-atalho-horarios">
          <button type="button" onClick={() => setSelecionados(HORARIOS_PADRAO)} className="btn-atalho">Ativar Todos</button>
          <button type="button" onClick={() => setSelecionados(ocupados)} className="btn-atalho">Desativar Todos</button>
        </div>

        <div className="grid-slots-horarios">
          {HORARIOS_PADRAO.map((hora) => {
            const isOcupado = ocupados.includes(hora);
            const isAtivo = selecionados.includes(hora);

            let statusClass = 'indisponivel';
            if (isOcupado) statusClass = 'ocupado';
            else if (isAtivo) statusClass = 'disponivel';

            return (
              <button
                key={hora}
                type="button"
                onClick={() => toggleHora(hora)}
                className={`slot-hora-btn ${statusClass}`}
              >
                {hora}
                {isOcupado && <FaLock className="icon-lock" />}
              </button>
            );
          })}
        </div>

        <div className="modal-horarios-footer">
          <button type="button" className="btn-cancelar" onClick={fechar} disabled={salvando}>
            Cancelar
          </button>
          <button type="button" className="btn-confirmar-salvar" onClick={handleSalvar} disabled={salvando}>
            <FaCheck /> {salvando ? 'Salvando...' : 'Salvar Horários'}
          </button>
        </div>
      </div>
    </div>
  );
}