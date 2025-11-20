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
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Panel de Administración</h1>
                    <p className="text-muted-foreground dark:text-slate-300 mt-2">Vista completa del sistema</p>
                </div>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
                    Administrador
                </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500 dark:border-blue-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Total Usuarios</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">12</p>
                        </div>
                        <Users className="h-12 w-12 text-blue-500 dark:text-blue-400" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500 dark:border-green-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Clientes Activos</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">45</p>
                        </div>
                        <UserCheck className="h-12 w-12 text-green-500 dark:text-green-400" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-orange-500 dark:border-orange-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Pacientes</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">87</p>
                        </div>
                        <PawPrint className="h-12 w-12 text-orange-500 dark:text-orange-400" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-purple-500 dark:border-purple-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Citas Hoy</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">8</p>
                        </div>
                        <Calendar className="h-12 w-12 text-purple-500 dark:text-purple-400" />
                    </div>
                </div>
            </div>

            {/* Accesos rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link 
                    to="/admin/usuarios" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Gestionar Usuarios</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Admin, Veterinarios, Recepción</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/clientes" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-500 dark:hover:border-green-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Gestionar Clientes</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Dueños de mascotas</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/pacientes" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-500 dark:hover:border-orange-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                            <PawPrint className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Administrar Pacientes</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Mascotas registradas</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/citas" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-500 dark:hover:border-purple-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Calendario de Citas</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Ver y gestionar agenda</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/consultas" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                            <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Historial de Consultas</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Ver registros médicos</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/reportes" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-pink-500 dark:hover:border-pink-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Reportes y Estadísticas</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Análisis del sistema</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Actividad reciente */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-transparent dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                    <Activity className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Actividad Reciente</h2>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-gray-700">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">Nuevo cliente registrado</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">María González - hace 5 min</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">Nuevo</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-gray-700">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">Cita completada</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Dr. Martínez - hace 15 min</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">Completado</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">Nuevo usuario creado</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Recepcionista Ana López - hace 1 hora</p>
                        </div>
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">Sistema</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
