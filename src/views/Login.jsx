import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/userAuth';
import { Container, Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import '../css/indexstyle.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ usuario: '', password: '' });
  const [error, setError] = useState('');

  const { usuario, password } = form;

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
    <Container maxWidth="sm" className="login-container">
      <Paper elevation={6} className="login-card">
        <Box className="login-header">
          <Typography variant="h4" component="h1" gutterBottom>
            Iniciar sesión
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ingresa con tu usuario y contraseña para acceder al dashboard.
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
            value={usuario}
            onChange={manejarCambio}
          />

          <TextField
            className="login-field"
            fullWidth
            required
            type="password"
            label="Contraseña"
            name="password"
            value={password}
            onChange={manejarCambio}
          />

          <Button type="submit" variant="contained" fullWidth size="large" className="login-button">
            Entrar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
