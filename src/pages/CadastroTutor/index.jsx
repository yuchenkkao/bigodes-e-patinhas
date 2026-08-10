import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaHome, FaCheckCircle, FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import './styles.css';
import { useTutores } from '../../data/hooks/useTutores';
import { useEstados, useCidadesPorEstado, useBairrosPorCidade, useBuscaCep } from '../../data/hooks/useEndereco';

export default function CadastroTutor() {

  const { criar } = useTutores();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  // Endereço: CEP e Número continuam texto livre; Estado, Cidade e Bairro viram seleção,
  // com Cidade/Bairro filtrados em cascata pelo Estado/Cidade escolhidos.
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [estadoId, setEstadoId] = useState('');
  const [cidadeId, setCidadeId] = useState('');
  const [bairroId, setBairroId] = useState('');

  const { estados } = useEstados();
  const { cidades } = useCidadesPorEstado(estadoId);
  const { bairros } = useBairrosPorCidade(cidadeId);
  const { buscarPorCep, buscando: buscandoCep } = useBuscaCep();

  const [mostrarModal, setMostrarModal] = useState(false);

  const cidadeSelecionada = cidades.find((c) => c.id === cidadeId);
  const bairroSelecionado = bairros.find((b) => b.id === bairroId);

  // Ao sair do campo CEP, tenta resolver o endereço automaticamente (stub hoje;
  // no futuro plugaria em um serviço real, ex: ViaCEP) e pré-preenche os selects.
  const handleCepBlur = async () => {
    if (!cep) return;
    const enderecoEncontrado = await buscarPorCep(cep);
    if (!enderecoEncontrado) return;
    setRua(enderecoEncontrado.rua || '');
    setEstadoId(enderecoEncontrado.estadoId || '');
    setCidadeId(enderecoEncontrado.cidadeId || '');
    setBairroId(enderecoEncontrado.bairroId || '');
  };

  // Ao trocar o estado manualmente, limpa cidade/bairro (que dependiam do estado anterior)
  useEffect(() => {
    setCidadeId('');
    setBairroId('');
  }, [estadoId]);

  // Ao trocar a cidade manualmente, limpa o bairro (que dependia da cidade anterior)
  useEffect(() => {
    setBairroId('');
  }, [cidadeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !cpf || !telefone || !email) {
      alert('Por favor, preencha os campos obrigatórios (Nome, CPF, Telefone e E-mail)!');
      return;
    }

    const estadoSelecionado = estados.find((uf) => uf.id === estadoId);

    await criar({
      nome,
      cpf,
      telefone,
      email,
      endereco: {
        cep,
        rua,
        numero,
        estadoId,
        estadoNome: estadoSelecionado?.nome,
        cidadeId,
        cidadeNome: cidadeSelecionada?.nome,
        bairroId,
        bairroNome: bairroSelecionado?.nome
      }
    });

    setMostrarModal(true);
  };

  const limparFormulario = () => {
    setNome('');
    setCpf('');
    setTelefone('');
    setEmail('');
    setCep('');
    setRua('');
    setNumero('');
    setEstadoId('');
    setCidadeId('');
    setBairroId('');
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
            <div className="form-group flex-1">
              <label htmlFor="cep">CEP {buscandoCep && <span className="cep-buscando">(buscando...)</span>}</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  id="cep"
                  placeholder="Ex: 85850-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  onBlur={handleCepBlur}
                />
              </div>
            </div>

            <div className="form-group flex-3">
              <label htmlFor="rua">Rua / Logradouro</label>
              <div className="input-with-icon">
                <FaHome className="input-icon" />
                {/* Pré-preenchido pela busca de CEP quando disponível; segue editável manualmente */}
                <input type="text" id="rua" placeholder="Ex: Av. Brasil" value={rua} onChange={(e) => setRua(e.target.value)} />
              </div>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="numero">Número</label>
              <input type="text" id="numero" placeholder="Ex: 123" value={numero} onChange={(e) => setNumero(e.target.value)} />
            </div>
          </div>

          {/* Estado, Cidade e Bairro agora são seleções — Cidade e Bairro em cascata,
              e todos prontos para serem filtrados/pré-selecionados a partir do CEP no futuro */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <select id="estado" value={estadoId} onChange={(e) => setEstadoId(e.target.value)}>
                <option value="">-- Selecione o Estado --</option>
                {estados.map((uf) => (
                  <option key={uf.id} value={uf.id}>{uf.nome}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cidade">Cidade</label>
              <select id="cidade" value={cidadeId} onChange={(e) => setCidadeId(e.target.value)} disabled={!estadoId}>
                <option value="">-- Selecione a Cidade --</option>
                {cidades.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bairro">Bairro</label>
              <select id="bairro" value={bairroId} onChange={(e) => setBairroId(e.target.value)} disabled={!cidadeId}>
                <option value="">-- Selecione o Bairro --</option>
                {bairros.map((b) => (
                  <option key={b.id} value={b.id}>{b.nome}</option>
                ))}
              </select>
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
              <p>📍 <strong>Localidade:</strong> {bairroSelecionado ? `${bairroSelecionado.nome}, ` : ''}{cidadeSelecionada?.nome}</p>
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