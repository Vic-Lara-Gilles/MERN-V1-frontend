import { Link } from "react-router-dom";
import { 
    PawPrint, 
    Calendar, 
    FileText,
    Stethoscope,
    ClipboardList,
    AlertCircle
} from "lucide-react";

const DashboardVeterinario = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Panel Veterinario</h1>
                    <p className="text-muted-foreground dark:text-slate-300 mt-2">Gestión médica y pacientes</p>
                </div>
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                    Veterinario
                </div>
            </div>

            {/* Estadísticas médicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-orange-500 dark:border-orange-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Pacientes Asignados</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">32</p>
                        </div>
                        <PawPrint className="h-12 w-12 text-orange-500 dark:text-orange-400" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-purple-500 dark:border-purple-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Citas Hoy</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">5</p>
                        </div>
                        <Calendar className="h-12 w-12 text-purple-500 dark:text-purple-400" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-indigo-500 dark:border-indigo-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Consultas Mes</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">64</p>
                        </div>
                        <FileText className="h-12 w-12 text-indigo-500 dark:text-indigo-400" />
                    </div>
                </div>
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
                        className="text-slate-900 dark:text-lime-500 hover:text-slate-700 dark:hover:text-lime-400 text-sm font-medium"
                    >
                        Ver todas →
                    </Link>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">09:00</span>
                                <span className="text-xs text-muted-foreground dark:text-slate-300">AM</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">Max - Revisión general</p>
                                <p className="text-sm text-muted-foreground dark:text-slate-300">Perro Labrador - María González</p>
                            </div>
                        </div>
                        <Link 
                            to="/admin/citas/1" 
                            className="px-4 py-2 bg-slate-900 dark:bg-lime-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-lime-700"
                        >
                            Ver Detalles
                        </Link>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500 dark:border-green-400">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-green-600 dark:text-green-400">11:00</span>
                                <span className="text-xs text-muted-foreground dark:text-slate-300">AM</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">Luna - Vacunación</p>
                                <p className="text-sm text-muted-foreground dark:text-slate-300">Gato Siamés - Carlos Ruiz</p>
                            </div>
                        </div>
                        <Link 
                            to="/admin/citas/2" 
                            className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800"
                        >
                            Ver Detalles
                        </Link>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500 dark:border-purple-400">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">14:00</span>
                                <span className="text-xs text-muted-foreground dark:text-slate-300">PM</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">Rocky - Seguimiento cirugía</p>
                                <p className="text-sm text-muted-foreground dark:text-slate-300">Perro Bulldog - Ana Martínez</p>
                            </div>
                        </div>
                        <Link 
                            to="/admin/citas/3" 
                            className="px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800"
                        >
                            Ver Detalles
                        </Link>
                    </div>
                </div>
            </div>

            {/* Accesos rápidos médicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                    to="/admin/pacientes" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                            <PawPrint className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Mis Pacientes</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Ver historiales médicos</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/consultas/nueva" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Stethoscope className="h-6 w-6 text-slate-900 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Nueva Consulta</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Registrar atención médica</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/consultas" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                            <FileText className="h-6 w-6 text-slate-900 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Historial de Consultas</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Ver registros anteriores</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/pacientes/seguimiento" 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent dark:border-gray-700 hover:border-red-500 dark:hover:border-red-400"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Pacientes en Seguimiento</h3>
                            <p className="text-sm text-muted-foreground dark:text-slate-300">Casos que requieren atención</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recordatorios */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                    <ClipboardList className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-yellow-900 dark:text-yellow-300">Recordatorios</h3>
                        <ul className="mt-2 space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                            <li>• Revisar resultados de laboratorio de Max (Lab-001)</li>
                            <li>• Llamar a María González sobre tratamiento de Luna</li>
                            <li>• Actualizar protocolo de vacunación para cachorros</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardVeterinario;
