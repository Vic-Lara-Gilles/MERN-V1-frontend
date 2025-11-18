import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegidaRol = ({ children, rolesPermitidos }) => {
    const { auth, cargando } = useAuth();

    if (cargando) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="mt-4 text-muted-foreground">Cargando...</p>
                </div>
            </div>
        );
    }

    // Si no está autenticado, redirigir al login
    if (!auth?._id) {
        return <Navigate to="/" />;
    }

    // Si no tiene el rol requerido, mostrar acceso denegado
    if (rolesPermitidos && !rolesPermitidos.includes(auth.rol)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-orange-50">
                <div className="max-w-md p-8 bg-white rounded-lg shadow-xl border-2 border-red-200">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-slate-900">Acceso Denegado</h2>
                        <p className="mt-2 text-slate-600">
                            No tienes permisos para acceder a esta sección.
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Tu rol: <span className="font-semibold text-slate-700">{auth.rol || 'Sin rol'}</span>
                        </p>
                        <button 
                            onClick={() => window.history.back()}
                            className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return children;
};

export default RutaProtegidaRol;
