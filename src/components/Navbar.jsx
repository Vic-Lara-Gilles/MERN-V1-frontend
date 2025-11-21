import { Link, useLocation } from 'react-router-dom';
import {
    PawPrint,
    LogOut,
    Home,
    FileText,
    CalendarPlus,
    Users,
    UserCog,
    LayoutDashboard,
    UserCheck,
    Calendar,
    BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import useClienteAuth from '../hooks/useClienteAuth';
import useAuth from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const location = useLocation();
    const isPortal = location.pathname.startsWith('/portal');
    const navigate = useNavigate();

    const { cerrarSesionCliente } = useClienteAuth();
    const { cerrarSesion, esAdmin, esVeterinario, esRecepcion } = useAuth();

    const isActive = (path) => location.pathname === path;

    // Handler para cerrar sesión y redirigir
    const handleCerrarSesionCliente = () => {
        cerrarSesionCliente();
        navigate('/portal');
    };

    // Determinar título y subtítulo según el contexto
    const getTitulo = () => {
        if (isPortal) return 'Portal Cliente';
        return 'Clínica Veterinaria';
    };

    const getSubtitulo = () => {
        if (isPortal) return 'Clínica Veterinaria';
        if (esAdmin()) return 'Panel de Administración';
        if (esVeterinario()) return 'Panel Veterinario';
        if (esRecepcion()) return 'Panel de Recepción';
        return 'Sistema de Gestión';
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo y título */}
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-lime-600 dark:bg-lime-500 flex items-center justify-center">
                        <PawPrint className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{getTitulo()}</h1>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{getSubtitulo()}</p>
                    </div>
                </div>

                {/* Navegación */}
                <nav className="flex items-center gap-2">
                    {isPortal ? (
                        <>
                            {/* Navegación Portal Cliente */}
                            <Button
                                variant={isActive("/portal/dashboard") ? "default" : "ghost"}
                                size="sm"
                                asChild
                                className={isActive("/portal/dashboard") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                            >
                                <Link to="/portal/dashboard">
                                    <Home className="h-4 w-4 mr-2" />
                                    Inicio
                                </Link>
                            </Button>
                            <Button
                                variant={isActive("/portal/mis-mascotas") ? "default" : "ghost"}
                                size="sm"
                                asChild
                                className={isActive("/portal/mis-mascotas") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                            >
                                <Link to="/portal/mis-mascotas">
                                    <PawPrint className="h-4 w-4 mr-2" />
                                    Mascotas
                                </Link>
                            </Button>
                            <Button
                                variant={isActive("/portal/mi-historial") ? "default" : "ghost"}
                                size="sm"
                                asChild
                                className={isActive("/portal/mi-historial") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                            >
                                <Link to="/portal/mi-historial">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Historial
                                </Link>
                            </Button>
                            <Button
                                variant={isActive("/portal/solicitar-cita") ? "default" : "ghost"}
                                size="sm"
                                asChild
                                className={isActive("/portal/solicitar-cita") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                            >
                                <Link to="/portal/solicitar-cita">
                                    <CalendarPlus className="h-4 w-4 mr-2" />
                                    Solicitar
                                </Link>
                            </Button>

                            {/* Separador */}
                            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

                            {/* Theme Toggle */}
                            <ThemeToggle />

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCerrarSesionCliente}
                                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Salir
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* Navegación Panel Administración */}
                            <Button
                                variant={isActive("/admin") ? "default" : "ghost"}
                                size="sm"
                                asChild
                                className={isActive("/admin") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                            >
                                <Link to="/admin">
                                    <LayoutDashboard className="h-4 w-4 mr-2" />
                                    Dashboard
                                </Link>
                            </Button>

                            {/* Usuarios - Solo Admin */}
                            {esAdmin() && (
                                <Button
                                    variant={isActive("/admin/usuarios") ? "default" : "ghost"}
                                    size="sm"
                                    asChild
                                    className={isActive("/admin/usuarios") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                                >
                                    <Link to="/admin/usuarios">
                                        <Users className="h-4 w-4 mr-2" />
                                        Usuarios
                                    </Link>
                                </Button>
                            )}

                            {/* Clientes - Admin y Recepción */}
                            {(esAdmin() || esRecepcion()) && (
                                <Button
                                    variant={isActive("/admin/clientes") ? "default" : "ghost"}
                                    size="sm"
                                    asChild
                                    className={isActive("/admin/clientes") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                                >
                                    <Link to="/admin/clientes">
                                        <UserCheck className="h-4 w-4 mr-2" />
                                        Clientes
                                    </Link>
                                </Button>
                            )}

                            {/* Pacientes */}
                            <Button
                                variant={isActive("/admin/pacientes") ? "default" : "ghost"}
                                size="sm"
                                asChild
                                className={isActive("/admin/pacientes") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                            >
                                <Link to="/admin/pacientes">
                                    <PawPrint className="h-4 w-4 mr-2" />
                                    Pacientes
                                </Link>
                            </Button>

                            {/* Citas */}
                            <Button
                                variant={isActive("/admin/citas") ? "default" : "ghost"}
                                size="sm"
                                asChild
                                className={isActive("/admin/citas") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                            >
                                <Link to="/admin/citas">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Citas
                                </Link>
                            </Button>

                            {/* Consultas - Admin y Veterinarios */}
                            {(esAdmin() || esVeterinario()) && (
                                <Button
                                    variant={isActive("/admin/consultas") ? "default" : "ghost"}
                                    size="sm"
                                    asChild
                                    className={isActive("/admin/consultas") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                                >
                                    <Link to="/admin/consultas">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Consultas
                                    </Link>
                                </Button>
                            )}

                            {/* Reportes - Admin y Veterinarios */}
                            {(esAdmin() || esVeterinario()) && (
                                <Button
                                    variant={isActive("/admin/reportes") ? "default" : "ghost"}
                                    size="sm"
                                    asChild
                                    className={isActive("/admin/reportes") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                                >
                                    <Link to="/admin/reportes">
                                        <BarChart3 className="h-4 w-4 mr-2" />
                                        Reportes
                                    </Link>
                                </Button>
                            )}

                            {/* Configuración */}
                            <Button
                                variant={isActive("/admin/configuracion") ? "default" : "ghost"}
                                size="sm"
                                asChild
                                className={isActive("/admin/configuracion") ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600" : ""}
                            >
                                <Link to="/admin/configuracion">
                                    <UserCog className="h-4 w-4 mr-2" />
                                    Config
                                </Link>
                            </Button>

                            {/* Separador */}
                            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

                            {/* Theme Toggle */}
                            <ThemeToggle />

                            {/* Salir */}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={cerrarSesion}
                                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Salir
                            </Button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
