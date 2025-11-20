import { Outlet, Navigate } from 'react-router-dom';
import useClienteAuth from '../hooks/useClienteAuth';

const PortalRutaProtegida = () => {
  const { cliente, cargando } = useClienteAuth();

  console.log('🛡️ PortalRutaProtegida - Estado:', { 
    cargando, 
    clienteId: cliente?._id,
    cliente: cliente 
  });

  if (cargando) {
    console.log('⏳ Cargando autenticación...');
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (cliente?._id) {
    console.log('✅ Cliente autenticado, mostrando contenido');
    return <Outlet />;
  } else {
    console.log('❌ Cliente no autenticado, redirigiendo a login');
    return <Navigate to="/portal/login" />;
  }
};

export default PortalRutaProtegida;
