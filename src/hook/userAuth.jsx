import { useContext } from 'react';
import { UsuarioContext } from '../context/UsuarioContext';

export const useAuth = () => {
  return useContext(UsuarioContext);
};