import { BrowserRouter as Router } from 'react-router-dom';
import { UsuarioProvider } from './context/UsuarioContext';
import Nav from './components/Nav';
import Footer from './components/Footer';
import AppRoutes from './routes/routes';

const App= () => {
  return (
    <UsuarioProvider>
      <Router>
        <Nav />
        <AppRoutes />
        <Footer />
      </Router>
    </UsuarioProvider>
  );
}

export default App;