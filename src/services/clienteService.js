const URL_BASE = 'https://fakestoreapi.com/users';

const clienteService = {

  obtenerClientes: async () => {
    try {
      const respuesta = await fetch(URL_BASE);
      if (!respuesta.ok) throw new Error('Error al obtener clientes');
      const data = await respuesta.json();
      return data;
    } catch (error) {
      console.error(error);
      return []; 
    }
  },


  obtenerClientePorId: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/${id}`);
      if (!respuesta.ok) throw new Error('Error al obtener el cliente');
      const data = await respuesta.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },


  eliminarCliente: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/${id}`, {
        method: 'DELETE'
      });
      if (!respuesta.ok) throw new Error('Error al eliminar');
      const data = await respuesta.json();
      return data; 
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

export default clienteService;