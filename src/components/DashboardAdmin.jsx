import { Link } from "react-router-dom";
import { 
    Users, 
    UserCheck, 
    PawPrint, 
    Calendar, 
    FileText,
    Activity,
    TrendingUp
} from "lucide-react";

const DashboardAdmin = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Panel de Administración</h1>
                    <p className="text-muted-foreground mt-2">Vista completa del sistema</p>
                </div>
                <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold">
                    Administrador
                </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Usuarios</p>
                            <p className="text-3xl font-bold text-slate-900">12</p>
                        </div>
                        <Users className="h-12 w-12 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Clientes Activos</p>
                            <p className="text-3xl font-bold text-slate-900">45</p>
                        </div>
                        <UserCheck className="h-12 w-12 text-green-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Pacientes</p>
                            <p className="text-3xl font-bold text-slate-900">87</p>
                        </div>
                        <PawPrint className="h-12 w-12 text-orange-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Citas Hoy</p>
                            <p className="text-3xl font-bold text-slate-900">8</p>
                        </div>
                        <Calendar className="h-12 w-12 text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Accesos rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link 
                    to="/admin/usuarios" 
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Gestionar Usuarios</h3>
                            <p className="text-sm text-muted-foreground">Admin, Veterinarios, Recepción</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/clientes" 
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-500"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <UserCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Gestionar Clientes</h3>
                            <p className="text-sm text-muted-foreground">Dueños de mascotas</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/pacientes" 
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-500"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <PawPrint className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Administrar Pacientes</h3>
                            <p className="text-sm text-muted-foreground">Mascotas registradas</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/citas" 
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-500"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Calendario de Citas</h3>
                            <p className="text-sm text-muted-foreground">Ver y gestionar agenda</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/consultas" 
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-indigo-500"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-indigo-100 rounded-lg">
                            <FileText className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Historial de Consultas</h3>
                            <p className="text-sm text-muted-foreground">Ver registros médicos</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/reportes" 
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-pink-500"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-pink-100 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-pink-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Reportes y Estadísticas</h3>
                            <p className="text-sm text-muted-foreground">Análisis del sistema</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Actividad reciente */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-2 mb-4">
                    <Activity className="h-5 w-5 text-slate-600" />
                    <h2 className="text-xl font-semibold text-slate-900">Actividad Reciente</h2>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b">
                        <div>
                            <p className="font-medium text-slate-900">Nuevo cliente registrado</p>
                            <p className="text-sm text-muted-foreground">María González - hace 5 min</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Nuevo</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                        <div>
                            <p className="font-medium text-slate-900">Cita completada</p>
                            <p className="text-sm text-muted-foreground">Dr. Martínez - hace 15 min</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Completado</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-slate-900">Nuevo usuario creado</p>
                            <p className="text-sm text-muted-foreground">Recepcionista Ana López - hace 1 hora</p>
                        </div>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Sistema</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
