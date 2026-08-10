import { useEffect, useState } from 'react';

/**
 * Encapsula o ciclo carregando/dados de uma chamada assíncrona a um service.
 * @param {() => Promise<any>} requisicao
 * @param {Array} deps
 */
export function useRequisicao(requisicao, deps) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    requisicao().then((resultado) => {
      if (ativo) {
        setDados(resultado);
        setCarregando(false);
      }
    });
    return () => { ativo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { dados, carregando, setDados };
}
