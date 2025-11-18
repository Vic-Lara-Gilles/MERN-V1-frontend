import { Link, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { Button } from "@/components/ui/button"
import { 
    LogOut, 
    Users, 
    KeyRound, 
    UserCog, 
    LayoutDashboard,
    UserCheck,
    PawPrint,
    Calendar,
    FileText,
    BarChart3,
    Settings
} from "lucide-react"

const Header = () => {

    const { cerrarSesion, auth, esAdmin, esVeterinario, esRecepcion } = useAuth()
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        
        <header className="border-b bg-card shadow-sm">
            <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                            <PawPrint className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Veterinaria
                            </h1>
                            <p className="text-xs text-muted-foreground font-medium">
                                {esAdmin() && "Panel de Administración"}
                                {esVeterinario() && "Panel Veterinario"}
                                {esRecepcion() && "Panel de Recepción"}
                            </p>
                        </div>
                    </div>
                    
                    <nav className="flex flex-wrap justify-center items-center gap-2">
                        {/* Sección Principal */}
                        <div className="flex items-center gap-2">
                            {/* Dashboard */}
                            <Button 
                                variant={isActive("/admin") ? "default" : "ghost"}
                                size="sm"
                                asChild
                            >
                                <Link to="/admin" className="gap-2">
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Link>
                            </Button>

                            {/* Usuarios - Solo Admin */}
                            {esAdmin() && (
                                <Button 
                                    variant={isActive("/admin/usuarios") ? "default" : "ghost"}
                                    size="sm"
                                    asChild
                                >
                                    <Link to="/admin/usuarios" className="gap-2">
                                        <Users className="h-4 w-4" />
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
                                >
                                    <Link to="/admin/clientes" className="gap-2">
                                        <UserCheck className="h-4 w-4" />
                                        Clientes
                                    </Link>
                                </Button>
                            )}

                            {/* Pacientes */}
                            <Button 
                                variant={isActive("/admin/pacientes") ? "default" : "ghost"}
                                size="sm"
                                asChild
                            >
                                <Link to="/admin/pacientes" className="gap-2">
                                    <PawPrint className="h-4 w-4" />
                                    Pacientes
                                </Link>
                            </Button>

                            {/* Citas */}
                            <Button 
                                variant={isActive("/admin/citas") ? "default" : "ghost"}
                                size="sm"
                                asChild
                            >
                                <Link to="/admin/citas" className="gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Citas
                                </Link>
                            </Button>
                        </div>

                        {/* Separador - Solo si hay secciones profesionales */}
                        {(esAdmin() || esVeterinario()) && (
                            <div className="h-8 w-px bg-border hidden lg:block" />
                        )}

                        {/* Sección Profesional - Admin y Veterinarios */}
                        {(esAdmin() || esVeterinario()) && (
                            <div className="flex items-center gap-2">
                                {/* Consultas */}
                                <Button 
                                    variant={isActive("/admin/consultas") ? "default" : "ghost"}
                                    size="sm"
                                    asChild
                                >
                                    <Link to="/admin/consultas" className="gap-2">
                                        <FileText className="h-4 w-4" />
                                        Consultas
                                    </Link>
                                </Button>

                                {/* Reportes */}
                                <Button 
                                    variant={isActive("/admin/reportes") ? "default" : "ghost"}
                                    size="sm"
                                    asChild
                                >
                                    <Link to="/admin/reportes" className="gap-2">
                                        <BarChart3 className="h-4 w-4" />
                                        Reportes
                                    </Link>
                                </Button>
                            </div>
                        )}

                        {/* Separador */}
                        <div className="h-8 w-px bg-border hidden lg:block" />

                        {/* Sección Usuario */}
                        <div className="flex items-center gap-2">
                            {/* Configuración */}
                            <Button 
                                variant={isActive("/admin/configuracion") ? "default" : "ghost"}
                                size="sm"
                                asChild
                            >
                                <Link to="/admin/configuracion" className="gap-2">
                                    <UserCog className="h-4 w-4" />
                                    Configuración
                                </Link>
                            </Button>
                            
                            {/* Salir */}
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={cerrarSesion}
                                className="gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Salir
                            </Button>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header