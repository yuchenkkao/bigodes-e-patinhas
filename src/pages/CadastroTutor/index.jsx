import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaHome, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import './styles.css';

export default function CadastroTutor() {

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('Foz do Iguaçu');


  const [mostrarModal, setMostrarModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !cpf || !telefone || !email) {
      alert('Por favor, preencha os campos obrigatórios (Nome, CPF, Telefone e E-mail)!');
      return;
    }

    // Estruturando o objeto simulado para envio posterior
    const novoTutor = { nome, cpf, telefone, email, endereco: { rua, numero, bairro, cidade } };
    console.log('Salvando novo tutor:', novoTutor);

    // Abre o modal de sucesso
    setMostrarModal(true);
  };

  const limparFormulario = () => {
    setNome('');
    setCpf('');
    setTelefone('');
    setEmail('');
    setRua('');
    setNumero('');
    setBairro('');
    setMostrarModal(false);
  };

  return (
    <div className="cadastro-tutor-container">
      
      <div className="back-link-container">
        <Link to="/tutores" className="btn-voltar-link">
          <FaArrowLeft /> Voltar para Tutores
        </Link>
      </div>

      <div className="cadastro-card">
        <div className="cadastro-header">
          <FaUser className="user-main-icon" />
          <h2>Cadastrar Novo Tutor</h2>
          <p>Insira os dados cadastrais e de contato do novo cliente.</p>
        </div>

        <form onSubmit={handleSubmit} className="cadastro-form">
          
          <h3 className="secao-titulo">Informações Pessoais</h3>
          
          <div className="form-group">
            <label htmlFor="nome">Nome Completo *</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input type="text" id="nome" placeholder="Ex: João da Silva Reis" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cpf">CPF *</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input type="text" id="cpf" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone / WhatsApp *</label>
              <div className="input-with-icon">
                <FaPhone className="input-icon" />
                <input type="text" id="telefone" placeholder="(45) 99999-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail de Contato</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input type="email" id="email" placeholder="exemplo@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          {/* Seção 2: Endereço Residencial */}
          <h3 className="secao-titulo">Endereço Residencial</h3>
          
          <div className="form-row">
            <div className="form-group flex-3">
              <label htmlFor="rua">Rua / Logradouro</label>
              <div className="input-with-icon">
                <FaHome className="input-icon" />
                <input type="text" id="rua" placeholder="Ex: Av. Brasil" value={rua} onChange={(e) => setRua(e.target.value)} />
              </div>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="numero">Número</label>
              <input type="text" id="numero" placeholder="Ex: 123" value={numero} onChange={(e) => setNumero(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bairro">Bairro</label>
              <input type="text" id="bairro" placeholder="Ex: Centro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="cidade">Cidade</label>
              <input type="text" id="cidade" placeholder="Ex: Foz do Iguaçu" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-salvar-tutor">Salvar</button>
          </div>

        </form>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FaCheckCircle className="modal-icon" />
            <h2>Tutor Cadastrado!</h2>
            <p>O perfil de <strong>{nome}</strong> foi indexado e está pronto para receber vínculos de pets.</p>
            
            <div className="modal-detalhes">
              <p>👤 <strong>Cliente:</strong> {nome}</p>
              <p>📞 <strong>Contato:</strong> {telefone}</p>
              <p>📍 <strong>Localidade:</strong> {bairro ? `${bairro}, ` : ''}{cidade}</p>
            </div>

            <button className="btn-modal-fechar" onClick={limparFormulario}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}