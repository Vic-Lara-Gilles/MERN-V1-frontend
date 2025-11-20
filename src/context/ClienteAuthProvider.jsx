import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

const ClienteAuthContext = createContext();

const ClienteAuthProvider = ({ children }) => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarCliente = async () => {
      console.log('🔄 ClienteAuthProvider - Iniciando autenticación');
      const token = localStorage.getItem('token_cliente');
      console.log('🔑 Token encontrado:', token ? 'Sí' : 'No');
      
      if (!token) {
        console.log('⚠️ No hay token, saltando autenticación');
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        console.log('📡 Obteniendo perfil del cliente');
        const { data } = await clienteAxios('/clientes/portal/perfil', config);
        console.log('✅ Perfil obtenido:', data);
        setCliente(data);
      } catch (error) {
        console.error('❌ Error al obtener perfil:', error);
        console.error('❌ Error response:', error.response?.data);
        setCliente({});
      }

      setCargando(false);
      console.log('✅ Autenticación completada');
    };
    autenticarCliente();
  }, []);

  const cerrarSesionCliente = () => {
    localStorage.removeItem('token_cliente');
    setCliente({});
  };

  return (
    <ClienteAuthContext.Provider
      value={{
        cliente,
        setCliente,
        cargando,
        cerrarSesionCliente,
      }}
    >
      {children}
    </ClienteAuthContext.Provider>
  );
};

export { ClienteAuthProvider };

export default ClienteAuthContext;
