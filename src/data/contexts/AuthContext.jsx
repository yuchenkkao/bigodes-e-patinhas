import { createContext, useCallback, useState } from 'react';

const CHAVE_TOKEN = '@BigodesToken';

/** @type {import('react').Context<{papel: import('../@types/Usuario').Papel, logar: (papel: import('../@types/Usuario').Papel) => void, sair: () => void}>} */
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [papel, setPapel] = useState(localStorage.getItem(CHAVE_TOKEN) || 'visitante');

  const logar = useCallback((novoPapel) => {
    localStorage.setItem(CHAVE_TOKEN, novoPapel);
    setPapel(novoPapel);
  }, []);

  const sair = useCallback(() => {
    localStorage.removeItem(CHAVE_TOKEN);
    setPapel('visitante');
  }, []);

  return (
    <AuthContext.Provider value={{ papel, logar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}
