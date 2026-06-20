import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hook/userAuth';

export default function Nav() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!auth || !auth.estaLogeado) return null;

  return (
    <nav style={{
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px 20px', 
      backgroundColor: '#1976d2', 
      color: 'white'
    }}>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <strong>Admin Panel</strong>
        <Link to="/dashboard" style={{ color: 'white', marginRight: '10px', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/clientes" style={{ color: 'white', textDecoration: 'none' }}>Lista de Clientes</Link>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span>
          {auth.usuario?.nombre} — <strong>{auth.usuario?.sector}</strong>
        </span>
        <button 
          onClick={handleLogout}
          style={{
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}