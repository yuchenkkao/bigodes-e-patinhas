import { useState } from 'react';
import { FaPaw, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useChat } from '../../../data/hooks/useChat';
import './styles.css';

// Ícone de mascote como placeholder (react-icons) — sem inventar um arquivo de imagem que
// não existe no projeto; troque por <img src={fotoDoSrBigode} /> se/quando houver a arte.
export default function PainelConversaSrBigode() {
  const [aberto, setAberto] = useState(false);
  const [textoAtual, setTextoAtual] = useState('');
  const { mensagens, enviando, erro, enviar } = useChat();

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!textoAtual.trim() || enviando) return;
    enviar(textoAtual);
    setTextoAtual('');
  };

  return (
    <div className="sr-bigode-widget">
      {aberto && (
        <div className="sr-bigode-janela">
          <div className="sr-bigode-cabecalho">
            <div className="sr-bigode-cabecalho-info">
              <span className="sr-bigode-avatar-mini"><FaPaw /></span>
              <div>
                <strong>Sr. Bigode</strong>
                <span className="sr-bigode-status">Assistente da clínica</span>
              </div>
            </div>
            <button type="button" className="sr-bigode-fechar" onClick={() => setAberto(false)} aria-label="Fechar chat">
              <FaTimes />
            </button>
          </div>

          <div className="sr-bigode-mensagens">
            {mensagens.length === 0 && (
              <p className="sr-bigode-boas-vindas">
                Miau! Eu sou o Sr. Bigode 🐾 Pergunte sobre consultas, pets ou tutores da clínica.
              </p>
            )}

            {/* Mensagens do usuário à direita, do Sr. Bigode à esquerda (classe muda por autor) */}
            {mensagens.map((msg, indice) => (
              <div key={indice} className={`sr-bigode-mensagem sr-bigode-mensagem-${msg.autor}`}>
                {msg.texto}
              </div>
            ))}

            {enviando && (
              <div className="sr-bigode-mensagem sr-bigode-mensagem-bigode sr-bigode-digitando">
                Sr. Bigode está digitando...
              </div>
            )}

            {erro && <p className="sr-bigode-erro">{erro}</p>}
          </div>

          <form className="sr-bigode-form" onSubmit={handleEnviar}>
            <input
              type="text"
              placeholder="Digite sua pergunta..."
              value={textoAtual}
              onChange={(e) => setTextoAtual(e.target.value)}
            />
            <button type="submit" disabled={enviando} aria-label="Enviar mensagem">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="sr-bigode-bolinha"
        onClick={() => setAberto((atual) => !atual)}
        aria-label="Abrir chat com o Sr. Bigode"
      >
        <FaPaw />
      </button>
    </div>
  );
}
