import { Outlet, Navigate } from 'react-router-dom';
import useClienteAuth from '../hooks/useClienteAuth';

const PortalRutaProtegida = () => {
  const { cliente, cargando } = useClienteAuth();

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return cliente?._id ? <Outlet /> : <Navigate to="/portal/login" />;
};

export default PortalRutaProtegida;
