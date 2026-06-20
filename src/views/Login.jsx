import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/userAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    usuario: '',
    password: '',
    sector: 'Soporte'
  });
  
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const exito = login({
      usuario: form.usuario.toLowerCase(),
      password: form.password
    });

    if (exito) {
      setError(false);
      navigate('/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Acceso del Administrador</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nombre del Administrador:</label>
          <input 
            type="text" 
            name="usuario" 
            value={form.usuario} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Sector de la Empresa:</label>
          <select 
            name="sector" 
            value={form.sector} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="Soporte">Soporte</option>
            <option value="Gerencia">Gerencia</option>
          </select>
        </div>

        {error && <p style={{ color: 'red' }}>Usuario o Clave incorrectos (Prueba "gerente" o "soporte" / "1234")</p>}

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}