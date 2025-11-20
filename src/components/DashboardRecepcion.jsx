import { Link } from "react-router-dom";
import { 
    Calendar, 
    UserCheck, 
    PawPrint,
    Clock,
    Plus,
    Phone
} from "lucide-react";

const DashboardRecepcion = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Panel de Recepción</h1>
                    <p className="text-muted-foreground dark:text-slate-300 mt-2">Gestión de citas y clientes</p>
                </div>
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-semibold">
                    Recepción
                </div>
            </div>

            {/* Estadísticas de recepción */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500 dark:border-green-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Clientes Totales</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">45</p>
                        </div>
                        <UserCheck className="h-12 w-12 text-green-500 dark:text-green-400" />
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

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500 dark:border-blue-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Pendientes</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">3</p>
                        </div>
                        <Clock className="h-12 w-12 text-blue-500 dark:text-blue-400" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-orange-500 dark:border-orange-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Mascotas Reg.</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">87</p>
                        </div>
                        <PawPrint className="h-12 w-12 text-orange-500 dark:text-orange-400" />
                    </div>
                </div>
            </div>

            {/* Acciones rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                    to="/admin/citas/nueva" 
                    className="bg-linear-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-white"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold">Agendar Cita</h3>
                            <p className="text-purple-100 dark:text-purple-200 mt-1">Registrar nueva cita</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-lg">
                            <Plus className="h-8 w-8" />
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/clientes/nuevo" 
                    className="bg-linear-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-white"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold">Nuevo Cliente</h3>
                            <p className="text-green-100 dark:text-green-200 mt-1">Registrar cliente y mascota</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-lg">
                            <UserCheck className="h-8 w-8" />
                        </div>
                    </div>
                </Link>
            </div>

            {/* Citas de hoy */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-transparent dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Agenda de Hoy</h2>
                    </div>
                    <Link 
                        to="/admin/citas" 
                        className="text-purple-600 dark:text-lime-500 hover:text-purple-700 dark:hover:text-lime-400 text-sm font-medium"
                    >
                        Ver calendario completo →
                    </Link>
                </div>
                
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-slate-300 dark:border-slate-600">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center min-w-20">
                                <span className="text-xl font-bold text-slate-600 dark:text-slate-300">09:00 AM</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-slate-900 dark:text-white">Max - Revisión general</p>
                                <p className="text-sm text-muted-foreground dark:text-slate-300">Dr. Martínez • María González</p>
                                <p className="text-xs text-muted-foreground dark:text-slate-400 mt-1">Tel: +34 612 345 678</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50">
                                <Phone className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
                                Pendiente
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500 dark:border-green-400">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center min-w-20">
                                <span className="text-xl font-bold text-green-600 dark:text-green-400">11:00 AM</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-slate-900 dark:text-white">Luna - Vacunación</p>
                                <p className="text-sm text-muted-foreground dark:text-slate-300">Dra. López • Carlos Ruiz</p>
                                <p className="text-xs text-muted-foreground dark:text-slate-400 mt-1">Tel: +34 698 765 432</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50">
                                <Phone className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                                Confirmada
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-slate-300 dark:border-slate-600">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center min-w-20">
                                <span className="text-xl font-bold text-slate-600 dark:text-slate-300">14:00 PM</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-slate-900 dark:text-white">Rocky - Seguimiento cirugía</p>
                                <p className="text-sm text-muted-foreground dark:text-slate-300">Dr. Martínez • Ana Martínez</p>
                                <p className="text-xs text-muted-foreground dark:text-slate-400 mt-1">Tel: +34 645 123 789</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50">
                                <Phone className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
                                Pendiente
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500 dark:border-green-400">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center min-w-20">
                                <span className="text-xl font-bold text-green-600 dark:text-green-400">16:00 PM</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-slate-900 dark:text-white">Bella - Control</p>
                                <p className="text-sm text-muted-foreground dark:text-slate-300">Dra. López • Pedro Sánchez</p>
                                <p className="text-xs text-muted-foreground dark:text-slate-400 mt-1">Tel: +34 678 234 567</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50">
                                <Phone className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                                Confirmada
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Accesos directos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link 
                    to="/admin/clientes" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Directorio Clientes</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Ver todos los clientes</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/pacientes" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                            <PawPrint className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Registro de Mascotas</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Ver pacientes</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/citas/calendario" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Vista Calendario</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Agenda semanal/mensual</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DashboardRecepcion;
