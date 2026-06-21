// Panel principal con métricas globales
import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import clienteService from '../services/clienteService';
import { useAuth } from '../hook/userAuth';
import LoginCard from '../components/LoginCard';
import '../css/indexstyle.css';

const Dashboard = () => {
  const { auth } = useAuth();
  const [estadisticas, setEstadisticas] = useState({ total: 0, eliminados: 0 });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    clienteService
      .obtenerEstadisticas()
      .then(setEstadisticas)
      .finally(() => setCargando(false));
  }, []);

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <Box className="dashboard-intro">
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard Principal
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Métricas globales del sistema de administración.
        </Typography>
      </Box>

      <Box className="dashboard-grid">
        {cargando ? (
          <Box className="dashboard-loader">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Card elevation={3} className="metric-card">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total de clientes
                </Typography>
                <Typography variant="h3" component="p">
                  {estadisticas.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clientes activos en el sistema.
                </Typography>
              </CardContent>
            </Card>

            <Card elevation={3} className="metric-card">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Clientes eliminados
                </Typography>
                <Typography variant="h3" component="p" className="metric-eliminados">
                  {estadisticas.eliminados}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clientes dados de baja de la base de datos.
                </Typography>
              </CardContent>
            </Card>
          </>
        )}

        {!auth?.estaLogeado && <LoginCard />}
      </Box>
    </Container>
  );
};

export default Dashboard;
