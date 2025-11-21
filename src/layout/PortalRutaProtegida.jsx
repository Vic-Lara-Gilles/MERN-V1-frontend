import { Outlet, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';
import useClienteAuth from '../hooks/useClienteAuth';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

const PortalRutaProtegida = () => {
    const { cliente, cargando } = useClienteAuth();

    console.log('PortalRutaProtegida - Estado:', {
        cargando,
        clienteId: cliente?._id,
        cliente: cliente
    });

    if (cargando) {
        return <LoadingSpinner />;
    }

    if (cliente?._id) {
        console.log('Cliente autenticado, mostrando contenido');
        return (
            <>
                <Navbar />
                <Suspense fallback={<LoadingSpinner />}>
                    <Outlet />
                </Suspense>
            </>
        );
    } else {
        console.log('Cliente no autenticado, redirigiendo a /portal');
        return <Navigate to="/" />;
    }
};

export default PortalRutaProtegida;
