const autorizacionesService = (() => {

  // Usuarios por defecto del sistema (usuario / contraseña / perfil)
  const usuariosPorDefecto = {
    gerente: {
      password: '1234',
      usuario: { nombre: 'Gerencia', sector: 'Gerencia', correo: 'gerencia@empresa.com' }
    },
    soporte: {
      password: '1234',
      usuario: { nombre: 'Soporte', sector: 'Soporte', correo: 'soporte@empresa.com' }
    }
  };

  const objToArray = (obj) => {
    return Object.keys(obj).map((key, idx) => {
      const { password, usuario } = obj[key];
      return {
        id: idx + 1,
        nombre: usuario?.nombre || key,
        user: key,
        password,
        perfil: usuario || null
      };
    });
  };

  const loadUsuarios = () => {
    const stored = localStorage.getItem('usuarios');
    if (!stored) {
      return objToArray(usuariosPorDefecto);
    }

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
      return objToArray(parsed);
    } catch {
      return objToArray(usuariosPorDefecto);
    }
  };

  const login = (user, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuarios = loadUsuarios();
        const encontrado = usuarios.find(
          ({ user: u, password: p }) => u === user && p === password
        );
        if (encontrado) {
          resolve(encontrado.perfil || { nombre: encontrado.nombre });
        } else {
          reject(new Error('Usuario o contraseña incorrectos'));
        }
      }, 800);
    });
  };

  return { login };

})();

export default autorizacionesService;
