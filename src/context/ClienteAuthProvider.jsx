import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

const ClienteAuthContext = createContext();

const ClienteAuthProvider = ({ children }) => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarCliente = async () => {
      const token = localStorage.getItem('token_cliente');
      if (!token) {
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
        const { data } = await clienteAxios('/clientes/perfil', config);
        setCliente(data);
      } catch (error) {
        console.log(error.response?.data?.msg);
        setCliente({});
      }

      setCargando(false);
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
