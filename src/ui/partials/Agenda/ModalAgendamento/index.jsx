import { useState } from 'react';
import './styles.css';
import { useAuth } from '../../../../data/hooks/useAuth';
import { useTutores } from '../../../../data/hooks/useTutores';
import { usePets } from '../../../../data/hooks/usePets';
import { useVeterinarios } from '../../../../data/hooks/useVeterinarios';

export default function ModalAgendamento({ mostrarModal, fecharModal, dataSelecionada, horarioSelecionado, onSalvarAgendamento }) {
  const { papel: token } = useAuth();
  const { tutores } = useTutores();
  const { pets } = usePets();
  const { veterinarios } = useVeterinarios();

  // Estados simples para controlar os campos do formulário
  const [tutorId, setTutorId] = useState('');
  const [petId, setPetId] = useState('');
  const [veterinarioId, setVeterinarioId] = useState('');
  const [motivo, setMotivo] = useState('');

  if (!mostrarModal) return null;

  // Converte a data selecionada para o formato de texto padrão do seu sistema (Ex: "17/06/2026")
  const dataString = dataSelecionada ? dataSelecionada.toLocaleDateString('pt-BR') : '';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!petId || !veterinarioId || !motivo || (token !== 'cliente' && !tutorId)) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const tutorSelecionado = tutores.find((t) => t.id === tutorId);
    const petSelecionado = pets.find((p) => p.id === petId);
    const veterinarioSelecionado = veterinarios.find((v) => v.id === veterinarioId);

    onSalvarAgendamento({
      data: dataString,
      horario: horarioSelecionado,
      tutorId,
      tutorNome: tutorSelecionado?.nome,
      petId,
      petNome: petSelecionado?.nome,
      motivo,
      veterinarioId,
      veterinarioNome: veterinarioSelecionado?.nome,
      status: 'Agendado'
    });

    // Limpa o formulário e fecha
    setTutorId('');
    setPetId('');
    setVeterinarioId('');
    setMotivo('');
    fecharModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ textAlign: 'left' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Preencher Agendamento</h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>Informe os dados para concluir a reserva.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          
          {/* Campo do CLIENTE (TUTOR): Só aparece se NÃO for cliente logado */}
          {token !== 'cliente' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label><strong>Cliente / Tutor *</strong></label>
              <select value={tutorId} onChange={(e) => setTutorId(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ECE8CC' }}>
                <option value="">-- Selecione o Tutor --</option>
                {tutores.map((t) => (
                  <option key={t.id} value={t.id}>{t.nome}</option>
                ))}
              </select>
            </div>
          )}

          {/* Campo do ANIMAL (PET) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label><strong>Animal / Pet *</strong></label>
            <select value={petId} onChange={(e) => setPetId(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ECE8CC' }}>
              <option value="">-- Selecione o Paciente --</option>
              {pets.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          {/* Campo do VETERINÁRIO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label><strong>Médico Veterinário *</strong></label>
            <select value={veterinarioId} onChange={(e) => setVeterinarioId(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ECE8CC' }}>
              <option value="">-- Selecione o Profissional --</option>
              {veterinarios.map((v) => (
                <option key={v.id} value={v.id}>{v.nome}</option>
              ))}
            </select>
          </div>

          {/* Campo do MOTIVO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label><strong>Motivo da Consulta *</strong></label>
            <input
              type="text"
              placeholder="Ex: Vacinação, Clínico Geral, Retorno..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ECE8CC' }}
            />
          </div>

          {/* Caixa de detalhes igualzinha à do seu modal antigo */}
          <div className="modal-detalhes" style={{ marginTop: '10px', padding: '12px', backgroundColor: '#FAF8ED', borderRadius: '6px' }}>
            <p style={{ margin: '4px 0' }}>📅 <strong>Data:</strong> {dataString}</p>
            <p style={{ margin: '4px 0' }}>⏰ <strong>Horário:</strong> {horarioSelecionado}h</p>
          </div>

          {/* Botões de Ação usando as suas classes nativas */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="button" className="btn-modal-fechar" style={{ backgroundColor: '#bbb', color: '#333', margin: 0 }} onClick={fecharModal}>
              Cancelar
            </button>
            <button type="submit" className="btn-modal-fechar" style={{ margin: 0 }}>
              Confirmar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}