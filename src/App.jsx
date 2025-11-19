import{ BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'
import RutaProtegidaRol from './layout/RutaProtegidaRol'

// Portal Cliente
import PortalLayout from './layout/PortalLayout'
import PortalRutaProtegida from './layout/PortalRutaProtegida'
import ClienteLogin from './paginas/ClienteLogin'
import ClienteDashboard from './paginas/ClienteDashboard'
import MisMascotas from './paginas/MisMascotas'
import MiHistorial from './paginas/MiHistorial'
import SolicitarCita from './paginas/SolicitarCita'

import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import NuevoPassword from './paginas/NuevoPassword'
import Dashboard from './paginas/Dashboard'
import AdministrarPacientes from './paginas/AdministrarPacientes'
import Configuracion from './paginas/Configuracion'
import Clientes from './paginas/Clientes'
import NuevoCliente from './paginas/NuevoCliente'
import EditarCliente from './paginas/EditarCliente'
import DetalleCliente from './paginas/DetalleCliente'
import Pacientes from './paginas/Pacientes'
import NuevoPaciente from './paginas/NuevoPaciente'
import EditarPaciente from './paginas/EditarPaciente'
import DetallePaciente from './paginas/DetallePaciente'
import Citas from './paginas/Citas'
import NuevaCita from './paginas/NuevaCita'
import EditarCita from './paginas/EditarCita'
import AgendaVeterinario from './paginas/AgendaVeterinario'
import Consultas from './paginas/Consultas'
import NuevaConsulta from './paginas/NuevaConsulta'
import EditarConsulta from './paginas/EditarConsulta'
import DetalleConsulta from './paginas/DetalleConsulta'
import ImprimirReceta from './paginas/ImprimirReceta'
import Reportes from './paginas/Reportes'
import Usuarios from './paginas/Usuarios'
import FormularioUsuario from './paginas/FormularioUsuario'

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider} from './context/PacientesProvider'
import { ClientesProvider } from './context/ClientesProvider'
import { CitasProvider } from './context/CitasProvider'
import { ConsultasProvider } from './context/ConsultasProvider'
import { ClienteAuthProvider } from './context/ClienteAuthProvider'


function App() {

    return (
        <ClienteAuthProvider>
            <BrowserRouter>
                <AuthProvider>
                    <PacientesProvider>
                        <ClientesProvider>
                            <CitasProvider>
                                <ConsultasProvider>
                                    <Routes>
                                        {/* Rutas Portal Cliente */}
                                        <Route path="/portal" element={<PortalLayout />}>
                                            <Route path="login" element={<ClienteLogin />} />
                                            <Route element={<PortalRutaProtegida />}>
                                                <Route path="dashboard" element={<ClienteDashboard />} />
                                                <Route path="mis-mascotas" element={<MisMascotas />} />
                                                <Route path="mi-historial" element={<MiHistorial />} />
                                                <Route path="solicitar-cita" element={<SolicitarCita />} />
                                            </Route>
                                        </Route>

                                        {/* Rutas Autenticación Interna */}
                                        <Route path="/" element={<AuthLayout />}>
                                            <Route index element={<Login />} />
                                            <Route path="registrar" element={<Registrar />} />
                                            <Route path="olvide-password" element={<OlvidePassword />} />
                                            <Route path="olvide-password/:token" element={<NuevoPassword />} />
                                            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                                        </Route>

                            <Route path= "/admin" element={<RutaProtegida />}>
                                <Route index element={<Dashboard />} />
                                
                                {/* Rutas de Usuarios - Solo Admin */}
                                <Route path="usuarios" element={
                                    <RutaProtegidaRol rolesPermitidos={['admin']}>
                                        <Usuarios />
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
                            </ConsultasProvider>
                        </CitasProvider>
                    </ClientesProvider>
                </PacientesProvider>
            </AuthProvider>
        </BrowserRouter>
        </ClienteAuthProvider>
    )
};

export default App;
