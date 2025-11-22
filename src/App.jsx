import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';
import RutaProtegidaRol from './layout/RutaProtegidaRol';

// Portal Cliente
import PortalLayout from './layout/PortalLayout';
import PortalRutaProtegida from './layout/PortalRutaProtegida';
const ClienteDashboard = lazy(() => import('./paginas/portal/ClienteDashboard'));
const MisMascotas = lazy(() => import('./paginas/portal/MisMascotas'));
const MiHistorial = lazy(() => import('./paginas/portal/MiHistorial'));
const SolicitarCita = lazy(() => import('./paginas/portal/SolicitarCita'));

// Página de selección
const SeleccionAcceso = lazy(() => import('./paginas/auth/Login'));

// Autenticación
const OlvidePassword = lazy(() => import('./paginas/auth/OlvidePassword'));
const ConfirmarCuenta = lazy(() => import('./paginas/auth/ConfirmarCuenta'));
const NuevoPassword = lazy(() => import('./paginas/auth/NuevoPassword'));

// Admin
const Dashboard = lazy(() => import('./paginas/admin/Dashboard'));
const Configuracion = lazy(() => import('./paginas/admin/Configuracion'));

// Clientes
const Clientes = lazy(() => import('./paginas/cliente/Clientes'));
const NuevoCliente = lazy(() => import('./paginas/cliente/NuevoCliente'));
const EditarCliente = lazy(() => import('./paginas/cliente/EditarCliente'));
const DetalleCliente = lazy(() => import('./paginas/cliente/DetalleCliente'));

// Pacientes
const Pacientes = lazy(() => import('./paginas/paciente/Pacientes'));
const NuevoPaciente = lazy(() => import('./paginas/paciente/NuevoPaciente'));
const EditarPaciente = lazy(() => import('./paginas/paciente/EditarPaciente'));
const DetallePaciente = lazy(() => import('./paginas/paciente/DetallePaciente'));

// Citas
const Citas = lazy(() => import('./paginas/cita/Citas'));
const NuevaCita = lazy(() => import('./paginas/cita/NuevaCita'));
const EditarCita = lazy(() => import('./paginas/cita/EditarCita'));
const AgendaVeterinario = lazy(() => import('./paginas/cita/AgendaVeterinario'));

// Consultas
const Consultas = lazy(() => import('./paginas/consulta/Consultas'));
const NuevaConsulta = lazy(() => import('./paginas/consulta/NuevaConsulta'));
const EditarConsulta = lazy(() => import('./paginas/consulta/EditarConsulta'));
const DetalleConsulta = lazy(() => import('./paginas/consulta/DetalleConsulta'));
const ImprimirReceta = lazy(() => import('./paginas/consulta/ImprimirReceta'));

// Reportes
const Reportes = lazy(() => import('./paginas/reporte/Reportes'));

// Usuarios
const Usuarios = lazy(() => import('./paginas/usuario/Usuarios'));
const FormularioUsuario = lazy(() => import('./paginas/usuario/FormularioUsuario'));
const UsuarioDetalle = lazy(() => import('./paginas/usuario/DetalleUsuario'));

import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';
import { ClientesProvider } from './context/ClientesProvider';
import { CitasProvider } from './context/CitasProvider';
import { ConsultasProvider } from './context/ConsultasProvider';
import { ClienteAuthProvider } from './context/ClienteAuthProvider';
import { NotificacionesProvider } from './context/NotificacionesProvider';
import LoadingSpinner from './components/LoadingSpinner';
import NotificacionesContainer from './components/NotificacionesContainer';
import NotificationFloatingButton from './components/NotificationFloatingButton';

function App() {
    return (
        <ClienteAuthProvider>
            <BrowserRouter>
                <AuthProvider>
                    <NotificacionesProvider>
                        <PacientesProvider>
                            <ClientesProvider>
                                <CitasProvider>
                                    <ConsultasProvider>
                                        <NotificacionesContainer />
                                        <NotificationFloatingButton />
                                        <Suspense fallback={<LoadingSpinner />}>
                                        <Routes>
                                            {/* Rutas de Autenticación */}
                                            <Route path="/" element={<SeleccionAcceso />} />
                                            <Route path="/olvide-password" element={<OlvidePassword />} />
                                            <Route path="/restablecer-password/:token" element={<NuevoPassword />} />
                                            <Route path="/confirmar/:token" element={<ConfirmarCuenta />} />

                                            {/* Rutas Cliente */}
                                            <Route path="/portal" element={<PortalLayout />}>
                                                <Route element={<PortalRutaProtegida />}>
                                                    <Route path="dashboard" element={<ClienteDashboard />} />
                                                    <Route path="mis-mascotas" element={<MisMascotas />} />
                                                    <Route path="mi-historial" element={<MiHistorial />} />
                                                    <Route path="solicitar-cita" element={<SolicitarCita />} />
                                                </Route>
                                            </Route>

                                            <Route path="/admin" element={<RutaProtegida />}>
                                                <Route index element={<Dashboard />} />

                                                {/* Rutas de Usuarios - Solo Admin */}
                                                <Route path="usuarios" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin']}>
                                                        <Usuarios />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="usuarios/:id" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin']}>
                                                        <UsuarioDetalle />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="usuarios/nuevo" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin']}>
                                                        <FormularioUsuario />
                                                    </RutaProtegidaRol>
                                                } />

                                                {/* Rutas de Clientes - Admin y Recepción */}
                                                <Route path="clientes" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'recepcion']}>
                                                        <Clientes />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="clientes/nuevo" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'recepcion']}>
                                                        <NuevoCliente />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="clientes/editar/:id" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'recepcion']}>
                                                        <EditarCliente />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="clientes/:id" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'recepcion']}>
                                                        <DetalleCliente />
                                                    </RutaProtegidaRol>
                                                } />

                                                {/* Rutas de Pacientes - Todos */}
                                                <Route path="pacientes" element={<Pacientes />} />
                                                <Route path="pacientes/nuevo" element={<NuevoPaciente />} />
                                                <Route path="pacientes/editar/:id" element={<EditarPaciente />} />
                                                <Route path="pacientes/:id" element={<DetallePaciente />} />

                                                {/* Rutas de Citas - Admin y Recepción */}
                                                <Route path="citas" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'recepcion', 'veterinario']}>
                                                        <Citas />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="citas/nueva" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'recepcion']}>
                                                        <NuevaCita />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="citas/editar/:id" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'recepcion']}>
                                                        <EditarCita />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="mi-agenda" element={
                                                    <RutaProtegidaRol rolesPermitidos={['veterinario']}>
                                                        <AgendaVeterinario />
                                                    </RutaProtegidaRol>
                                                } />

                                                {/* Rutas de Consultas */}
                                                <Route path="consultas" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'veterinario', 'recepcion']}>
                                                        <Consultas />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="consultas/nueva" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'veterinario']}>
                                                        <NuevaConsulta />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="consultas/editar/:id" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'veterinario']}>
                                                        <EditarConsulta />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="consultas/:id" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'veterinario', 'recepcion']}>
                                                        <DetalleConsulta />
                                                    </RutaProtegidaRol>
                                                } />
                                                <Route path="consultas/imprimir/:id" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'veterinario']}>
                                                        <ImprimirReceta />
                                                    </RutaProtegidaRol>
                                                } />

                                                {/* Reportes - Admin y Veterinario */}
                                                <Route path="reportes" element={
                                                    <RutaProtegidaRol rolesPermitidos={['admin', 'veterinario']}>
                                                        <Reportes />
                                                    </RutaProtegidaRol>
                                                } />

                                                {/* Configuración de Usuario */}
                                                <Route path="configuracion" element={<Configuracion />} />
                                            </Route>
                                        </Routes>
                                    </Suspense>
                                </ConsultasProvider>
                            </CitasProvider>
                        </ClientesProvider>
                    </PacientesProvider>
                </NotificacionesProvider>
            </AuthProvider>
        </BrowserRouter>
    </ClienteAuthProvider>
);
}

export default App;
