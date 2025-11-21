import { useLocation } from 'react-router-dom';
import {
    ShieldCheck,
    Stethoscope,
    UserCheck,
    PawPrint,
    Sparkles
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useClienteAuth from '../hooks/useClienteAuth';

const Header = () => {
    const location = useLocation();
    const isPortal = location.pathname.startsWith('/portal');

    const { auth, esAdmin, esVeterinario, esRecepcion } = useAuth();
    const { cliente } = useClienteAuth();

    // Determinar el usuario actual y su rol
    const usuario = isPortal ? cliente : auth;

    // Determinar el ícono según el rol
    const getIcono = () => {
        if (isPortal) {
            return <PawPrint className="h-8 w-8" />;
        }
        if (esAdmin()) {
            return <ShieldCheck className="h-8 w-8" />;
        }
        if (esVeterinario()) {
            return <Stethoscope className="h-8 w-8" />;
        }
        if (esRecepcion()) {
            return <UserCheck className="h-8 w-8" />;
        }
        return <Sparkles className="h-8 w-8" />;
    };

    // Determinar el título según el rol
    const getTitulo = () => {
        if (isPortal) {
            return 'Portal del Cliente';
        }
        if (esAdmin()) {
            return 'Panel de Administración';
        }
        if (esVeterinario()) {
            return 'Panel Veterinario';
        }
        if (esRecepcion()) {
            return 'Panel de Recepción';
        }
        return 'Panel de Control';
    };

    // Determinar el subtítulo según el rol
    const getSubtitulo = () => {
        if (isPortal) {
            return 'Gestiona la información de tus mascotas y consulta su historial médico';
        }
        if (esAdmin()) {
            return 'Panel de control completo de tu clínica veterinaria';
        }
        if (esVeterinario()) {
            return 'Gestiona tus consultas, pacientes y agenda médica';
        }
        if (esRecepcion()) {
            return 'Administra citas, clientes y recepción de la clínica';
        }
        return 'Panel de control de tu clínica veterinaria';
    };

    // Determinar color de gradiente según el rol
    const getGradientClass = () => {
        if (isPortal) {
            return 'from-lime-600 to-lime-500';
        }
        return 'from-slate-900 to-slate-700 dark:from-lime-600 dark:to-lime-500';
    };

    return (
        <div className="mb-8 bg-linear-to-r from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-start gap-4">
                {/* Ícono del rol */}
                <div className={`h-16 w-16 rounded-xl bg-linear-to-br ${getGradientClass()} flex items-center justify-center shadow-lg shrink-0`}>
                    <div className="text-white">
                        {getIcono()}
                    </div>
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                            ¡Bienvenido, {usuario?.nombre}!
                        </h1>
                    </div>

                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                        {getTitulo()}
                    </p>

                    <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                        {getSubtitulo()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;
