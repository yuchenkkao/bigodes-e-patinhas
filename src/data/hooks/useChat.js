import { useCallback, useState } from 'react';
import { enviarMensagem } from '../services/chatService';

export function useChat() {
  const [mensagens, setMensagens] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  const enviar = useCallback(async (texto) => {
    const textoLimpo = texto.trim();
    if (!textoLimpo) return;

    // Mensagem do usuário aparece na hora, antes da resposta chegar (feedback imediato)
    setMensagens((atual) => [...atual, { autor: 'usuario', texto: textoLimpo }]);
    setEnviando(true);
    setErro(null);

    try {
      const resposta = await enviarMensagem(textoLimpo);
      setMensagens((atual) => [...atual, { autor: 'bigode', texto: resposta }]);
    } catch (e) {
      setErro('O Sr. Bigode não conseguiu responder agora. Verifique se o servidor está rodando.');
    } finally {
      setEnviando(false);
    }
  }, []);

  return { mensagens, enviando, erro, enviar };
}
