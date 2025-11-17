import { Link, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { Button } from "@/components/ui/button"
import { LogOut, Users, KeyRound, UserCog, LayoutDashboard } from "lucide-react"

const Header = () => {

    const { cerrarSesion } = useAuth()
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        
        <header className="border-b bg-card">
            <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">Veterinaria</h1>
                            <p className="text-sm text-muted-foreground">Gestión de Pacientes</p>
                        </div>
                    </div>
                    
                    <nav className="flex flex-wrap justify-center items-center gap-2">
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

                        <Button 
                            variant={isActive("/admin/pacientes") ? "default" : "ghost"}
                            size="sm"
                            asChild
                        >
                            <Link to="/admin/pacientes" className="gap-2">
                                <Users className="h-4 w-4" />
                                Pacientes
                            </Link>
                        </Button>

                        <Button 
                            variant={isActive("/admin/perfil") ? "default" : "ghost"}
                            size="sm"
                            asChild
                        >
                            <Link to="/admin/perfil" className="gap-2">
                                <UserCog className="h-4 w-4" />
                                Perfil
                            </Link>
                        </Button>

                        <Button 
                            variant={isActive("/admin/cambiar-password") ? "default" : "ghost"}
                            size="sm"
                            asChild
                        >
                            <Link to="/admin/cambiar-password" className="gap-2">
                                <KeyRound className="h-4 w-4" />
                                Contraseña
                            </Link>
                        </Button>
                        
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={cerrarSesion}
                            className="gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Salir
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header