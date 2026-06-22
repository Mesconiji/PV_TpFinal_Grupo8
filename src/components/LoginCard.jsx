import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography, Alert } from '@mui/material';
import { useAuth } from '../hook/userAuth';
import '../css/indexstyle.css';

const LoginCard = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ usuario: '', password: '' });
  const [error, setError] = useState('');

  const manejarCambio = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const exito = await login(form);
    if (exito) {
      navigate('/dashboard');
      return;
    }

    setError('Usuario o contraseña incorrectos. Intenta nuevamente.');
  };

  return (
    <Paper elevation={6} className="login-card">
      <Box className="login-header">
        <Typography variant="h5" component="h2" gutterBottom>
          Acceso al sistema
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ingresa tu usuario y contraseña para continuar.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" className="login-alert">
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={manejarSubmit} noValidate className="login-form">
        <TextField
          className="login-field"
          fullWidth
          required
          label="Usuario"
          name="usuario"
          value={form.usuario}
          onChange={manejarCambio}
        />

        <TextField
          className="login-field"
          fullWidth
          required
          type="password"
          label="Contraseña"
          name="password"
          value={form.password}
          onChange={manejarCambio}
        />

        <Button type="submit" variant="contained" fullWidth className="login-button">
          Iniciar sesión
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginCard;
