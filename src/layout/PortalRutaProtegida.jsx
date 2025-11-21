import { Outlet, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';
import useClienteAuth from '../hooks/useClienteAuth';
import Navbar from '../components/Navbar';

const PortalRutaProtegida = () => {
  const { cliente, cargando } = useClienteAuth();

  console.log('PortalRutaProtegida - Estado:', { 
    cargando, 
    clienteId: cliente?._id,
    cliente: cliente 
  });

  if (cargando) {
    console.log('Cargando autenticación...');
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (cliente?._id) {
    console.log('Cliente autenticado, mostrando contenido');
    return (
      <>
        <Navbar />
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-600"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </>
    );
  } else {
    console.log('Cliente no autenticado, redirigiendo a login');
    return <Navigate to="/portal/login" />;
  }
};

export default PortalRutaProtegida;
