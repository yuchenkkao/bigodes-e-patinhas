import { useState } from 'react';
import './styles.css';

export default function ModalAgendamento({ mostrarModal, fecharModal, dataSelecionada, horarioSelecionado, onSalvarAgendamento }) {
  const token = localStorage.getItem('@BigodesToken') || 'visitante';

  // Estados simples para controlar os campos do formulário
  const [tutor, setTutor] = useState('');
  const [pet, setPet] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const [motivo, setMotivo] = useState('');

  if (!mostrarModal) return null;

  // Converte a data selecionada para o formato de texto padrão do seu sistema (Ex: "17/06/2026")
  const dataString = dataSelecionada ? dataSelecionada.toLocaleDateString('pt-BR') : '';

  const handleSubmit = (e) => {
    e.preventDefault();

    // Se for cliente logado, define um tutor padrão automático. Se for atendente, usa o do select.
    const tutorFinal = token === 'cliente' ? 'Maria' : tutor;

    if (!pet || !veterinario || !motivo || (token !== 'cliente' && !tutorFinal)) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    // Envia o objeto EXATAMENTE com as chaves que o seu ResumoAgenda utiliza
    onSalvarAgendamento({
      id: Date.now(),
      data: dataString,
      hora: horarioSelecionado,
      tutor: tutorFinal,
      pet: pet,
      motivo: motivo,
      veterinario: veterinario,
      status: 'Agendado'
    });

    // Limpa o formulário e fecha
    setTutor('');
    setPet('');
    setVeterinario('');
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
              <select value={tutor} onChange={(e) => setTutor(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ECE8CC' }}>
                <option value="">-- Selecione o Tutor --</option>
                <option value="Maria">Maria</option>
                <option value="Carlos">Carlos</option>
                <option value="Ana">Ana</option>
                <option value="Carolina">Carolina</option>
                <option value="Marcos">Marcos</option>
              </select>
            </div>
          )}

          {/* Campo do ANIMAL (PET) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label><strong>Animal / Pet *</strong></label>
            <select value={pet} onChange={(e) => setPet(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ECE8CC' }}>
              <option value="">-- Selecione o Paciente --</option>
              <option value="Rex">Rex</option>
              <option value="Mingau">Mingau</option>
              <option value="Luna">Luna</option>
              <option value="Nikolas">Nikolas</option>
              <option value="Pipoca">Pipoca</option>
            </select>
          </div>

          {/* Campo do VETERINÁRIO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label><strong>Médico Veterinário *</strong></label>
            <select value={veterinario} onChange={(e) => setVeterinario(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ECE8CC' }}>
              <option value="">-- Selecione o Profissional --</option>
              <option value="Mariana">Mariana</option>
              <option value="Eduardo">Eduardo</option>
            </select>
          </div>

          {/* Campo do MOTIVO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label><strong>Motivo da Consulta *</strong></label>
            <select value={motivo} onChange={(e) => setMotivo(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ECE8CC' }}>
              <option value="">-- Selecione o Procedimento --</option>
              <option value="Vacinação">Vacinação</option>
              <option value="Clínico Geral">Clínico Geral</option>
              <option value="Saúde Bucal">Saúde Bucal</option>
              <option value="Castração">Castração</option>
              <option value="Retorno">Retorno</option>
            </select>
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