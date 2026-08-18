import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaHome, FaCheckCircle, FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import './styles.css';
import { useTutores } from '../../data/hooks/useTutores';

export default function CadastroTutor() {
  const { criar } = useTutores();

  // Informações Pessoais
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  // Endereço (Hierarquia: Estado -> Cidade -> Bairro)
  const [estadoUf, setEstadoUf] = useState('');
  const [estadoNomeCompleto, setEstadoNomeCompleto] = useState('');
  const [cidadeId, setCidadeId] = useState('');
  const [cidadeNome, setCidadeNome] = useState('');
  const [bairro, setBairro] = useState('');

  // Campos Livres
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');

  // Listas de Localidades
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairrosIBGE, setBairrosIBGE] = useState([]);
  const [carregandoBairros, setCarregandoBairros] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  // 1. Carregar estados do IBGE
  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then((res) => res.json())
      .then((data) => setEstados(data))
      .catch((err) => console.error('Erro ao carregar estados do IBGE:', err));
  }, []);

  // 2. Mudança de Estado -> Carrega Cidades e salva o nome completo do estado
  const handleEstadoChange = (uf) => {
    setEstadoUf(uf);
    const estadoObj = estados.find((e) => e.sigla === uf);
    setEstadoNomeCompleto(estadoObj ? estadoObj.nome : uf);

    setCidadeId('');
    setCidadeNome('');
    setBairro('');
    setCidades([]);
    setBairrosIBGE([]);

    if (uf) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`)
        .then((res) => res.json())
        .then((data) => setCidades(data))
        .catch((err) => console.error('Erro ao carregar cidades:', err));
    }
  };

  // 3. Mudança de Cidade -> Busca Distritos e Subdistritos para bairros
  const handleCidadeChange = async (idCidadeSelecionada) => {
    setCidadeId(idCidadeSelecionada);
    setBairro('');
    setBairrosIBGE([]);

    const cidObj = cidades.find((c) => String(c.id) === String(idCidadeSelecionada));
    const nomeDaCidade = cidObj ? cidObj.nome : '';
    setCidadeNome(nomeDaCidade);

    if (idCidadeSelecionada) {
      setCarregandoBairros(true);
      try {
        const [resDistritos, resSubdistritos] = await Promise.all([
          fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${idCidadeSelecionada}/distritos?orderBy=nome`),
          fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${idCidadeSelecionada}/subdistritos?orderBy=nome`)
        ]);

        const distritos = await resDistritos.json();
        const subdistritos = await resSubdistritos.json();

        const listaCombinada = [
          ...(Array.isArray(distritos) ? distritos : []),
          ...(Array.isArray(subdistritos) ? subdistritos : [])
        ];

        const nomesUnicos = Array.from(new Set(listaCombinada.map((item) => item.nome))).map((nome) => ({
          nome
        }));

        setBairrosIBGE(nomesUnicos);
      } catch (err) {
        console.error('Erro ao carregar bairros/distritos:', err);
      } finally {
        setCarregandoBairros(false);
      }
    }
  };

  // 4. Formatação de CPF (000.000.000-00)
  const handleCpfChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    val = val.replace(/(\d{3})(\d)/, '$1.$2');
    val = val.replace(/(\d{3})(\d)/, '$1.$2');
    val = val.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(val);
  };

  // 5. Formatação de Telefone ((00) 00000-0000)
  const handleTelefoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    val = val.replace(/^(\d{2})(\d)/g, '($1) $2');
    val = val.replace(/(\d)(\d{4})$/, '$1-$2');
    setTelefone(val);
  };

  // 6. Formatação de CEP (00000-000)
  const handleCepChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    val = val.replace(/^(\d{5})(\d)/, '$1-$2');
    setCep(val);
  };

  // 7. Envio do formulário com nome do estado por extenso
  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawCpf = cpf.replace(/\D/g, '');
    const rawTelefone = telefone.replace(/\D/g, '');
    const rawCep = cep.replace(/\D/g, '');

    if (!nome.trim()) {
      alert('Informe o nome completo do tutor.');
      return;
    }
    if (rawCpf.length !== 11) {
      alert('CPF incompleto ou inválido. Digite os 11 dígitos.');
      return;
    }
    if (rawTelefone.length < 10) {
      alert('Telefone/WhatsApp incompleto. Digite DDD + número.');
      return;
    }
    if (!bairro.trim()) {
      alert('Informe o bairro do tutor.');
      return;
    }

    try {
      await criar({
        nome,
        cpf: rawCpf,
        telefone: rawTelefone,
        email,
        estadoNome: estadoNomeCompleto || estadoUf,
        cidadeNome: cidadeNome,
        bairroNome: bairro,
        ruaNome: rua,
        numeroEndereco: numero ? parseInt(numero, 10) : null,
        cep: rawCep
      });

      setMostrarModal(true);
    } catch (error) {
      console.error('Erro ao salvar tutor:', error);
      alert('Não foi possível cadastrar o tutor. ' + error.message);
    }
  };

  const limparFormulario = () => {
    setNome('');
    setCpf('');
    setTelefone('');
    setEmail('');
    setEstadoUf('');
    setEstadoNomeCompleto('');
    setCidadeId('');
    setCidadeNome('');
    setBairro('');
    setCep('');
    setRua('');
    setNumero('');
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
              <input
                type="text"
                id="nome"
                placeholder="Ex: Carlos Eduardo Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cpf">CPF *</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input
                  type="text"
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCpfChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone / WhatsApp *</label>
              <div className="input-with-icon">
                <FaPhone className="input-icon" />
                <input
                  type="text"
                  id="telefone"
                  placeholder="(11) 98765-4321"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail de Contato</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="cliente@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Seção 2: Localização em Cascata */}
          <h3 className="secao-titulo">Localização</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="estado">Estado *</label>
              <select
                id="estado"
                value={estadoUf}
                onChange={(e) => handleEstadoChange(e.target.value)}
                required
              >
                <option value="">-- Selecione o Estado --</option>
                {estados.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.nome} ({uf.sigla})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cidade">Cidade *</label>
              <select
                id="cidade"
                value={cidadeId}
                onChange={(e) => handleCidadeChange(e.target.value)}
                disabled={!estadoUf}
                required
              >
                <option value="">-- Selecione a Cidade --</option>
                {cidades.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bairro">
                Bairro * {carregandoBairros && <small>(carregando...)</small>}
              </label>
              <input
                type="text"
                id="bairro"
                list="lista-bairros"
                placeholder={cidadeId ? "Selecione na lista ou digite o bairro..." : "Selecione uma cidade primeiro"}
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                disabled={!cidadeId}
                required
              />
              <datalist id="lista-bairros">
                {bairrosIBGE.map((b, index) => (
                  <option key={index} value={b.nome} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Seção 3: Logradouro Livre */}
          <h3 className="secao-titulo">Logradouro</h3>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="cep">CEP</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  id="cep"
                  placeholder="00000-000"
                  value={cep}
                  onChange={handleCepChange}
                />
              </div>
            </div>

            <div className="form-group flex-3">
              <label htmlFor="rua">Rua / Avenida *</label>
              <div className="input-with-icon">
                <FaHome className="input-icon" />
                <input
                  type="text"
                  id="rua"
                  placeholder="Ex: Rua das Flores"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="numero">Número *</label>
              <input
                type="text"
                id="numero"
                placeholder="Ex: 123"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
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
            <p>O perfil de <strong>{nome}</strong> foi cadastrado com sucesso.</p>

            <div className="modal-detalhes">
              <p>👤 <strong>Cliente:</strong> {nome}</p>
              <p>📞 <strong>Contato:</strong> {telefone}</p>
              <p>📍 <strong>Localidade:</strong> {cidadeNome ? `${cidadeNome} - ${estadoUf}` : 'Não informada'}</p>
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