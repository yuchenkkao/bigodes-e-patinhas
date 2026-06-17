import { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaUserEdit, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './styles.css';

export default function ModalEditarPerfil({ isOpen, onClose, usuarioAtual, onSalvar }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(() => {
    if (isOpen && usuarioAtual) {
      setNome(usuarioAtual.nome);
      setEmail(usuarioAtual.email);
      setTelefone(usuarioAtual.telefone);
      setEndereco(usuarioAtual.endereco);
    }
  }, [isOpen, usuarioAtual]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nome || !email || !telefone) {
      alert('Por favor, preencha os campos obrigatórios!');
      return;
    }

    onSalvar({
      ...usuarioAtual,
      nome,
      email,
      telefone,
      endereco
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-editar-perfil">
        
        <div className="modal-header-perfil">
          <div className="modal-titulo-perfil">
            <div className="icone-destaque-modal"><FaUserEdit /></div>
            <div>
              <h2>Editar Perfil</h2>
              <p>Mantenha suas informações de contato atualizadas.</p>
            </div>
          </div>
          <button type="button" className="btn-fechar-modal" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-editar-perfil">
          
          <div className="input-group-perfil">
            <label><FaUser /> Nome Completo *</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Maria Silva" />
          </div>

          <div className="input-group-perfil">
            <label><FaEnvelope /> E-mail de Contato *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ex: maria@email.com" />
          </div>

          <div className="input-group-perfil">
            <label><FaPhone /> Telefone / WhatsApp *</label>
            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(00) 00000-0000" />
          </div>

          <div className="input-group-perfil">
            <label><FaMapMarkerAlt /> Endereço Completo</label>
            <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Rua, Número - Bairro" />
          </div>

          <div className="modal-acoes-perfil">
            <button type="button" className="btn-cancelar-perfil" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-salvar-perfil"><FaSave /> Salvar Alterações</button>
          </div>

        </form>
      </div>
    </div>
  );
}