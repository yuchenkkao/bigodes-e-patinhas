import { useContext } from 'react';
import { AutenticacaoContext } from '../contexts/AutenticacaoContext';

export function useAuth() {
  return useContext(AutenticacaoContext);
}
