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
                    <h1 className="text-3xl font-bold text-slate-900">Panel Veterinario</h1>
                    <p className="text-muted-foreground mt-2">Gestión médica y pacientes</p>
                </div>
                <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                    Veterinario
                </div>
            </div>

            {/* Estadísticas médicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Pacientes Asignados</p>
                            <p className="text-3xl font-bold text-slate-900">32</p>
                        </div>
                        <PawPrint className="h-12 w-12 text-orange-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Citas Hoy</p>
                            <p className="text-3xl font-bold text-slate-900">5</p>
                        </div>
                        <Calendar className="h-12 w-12 text-purple-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Consultas Mes</p>
                            <p className="text-3xl font-bold text-slate-900">64</p>
                        </div>
                        <FileText className="h-12 w-12 text-indigo-500" />
                    </div>
                </div>
            </div>

            {/* Citas de hoy */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-slate-600" />
                        <h2 className="text-xl font-semibold text-slate-900">Agenda de Hoy</h2>
                    </div>
                    <Link 
                        to="/admin/citas" 
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        Ver todas →
                    </Link>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-blue-600">09:00</span>
                                <span className="text-xs text-muted-foreground">AM</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Max - Revisión general</p>
                                <p className="text-sm text-muted-foreground">Perro Labrador - María González</p>
                            </div>
                        </div>
                        <Link 
                            to="/admin/citas/1" 
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Ver Detalles
                        </Link>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-green-600">11:00</span>
                                <span className="text-xs text-muted-foreground">AM</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Luna - Vacunación</p>
                                <p className="text-sm text-muted-foreground">Gato Siamés - Carlos Ruiz</p>
                            </div>
                        </div>
                        <Link 
                            to="/admin/citas/2" 
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Ver Detalles
                        </Link>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-purple-600">14:00</span>
                                <span className="text-xs text-muted-foreground">PM</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Rocky - Seguimiento cirugía</p>
                                <p className="text-sm text-muted-foreground">Perro Bulldog - Ana Martínez</p>
                            </div>
                        </div>
                        <Link 
                            to="/admin/citas/3" 
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
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
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-500"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <PawPrint className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Mis Pacientes</h3>
                            <p className="text-sm text-muted-foreground">Ver historiales médicos</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/consultas/nueva" 
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Stethoscope className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Nueva Consulta</h3>
                            <p className="text-sm text-muted-foreground">Registrar atención médica</p>
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
                            <p className="text-sm text-muted-foreground">Ver registros anteriores</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/pacientes/seguimiento" 
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-red-500"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-red-100 rounded-lg">
                            <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Pacientes en Seguimiento</h3>
                            <p className="text-sm text-muted-foreground">Casos que requieren atención</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recordatorios */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                    <ClipboardList className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-yellow-900">Recordatorios</h3>
                        <ul className="mt-2 space-y-1 text-sm text-yellow-800">
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
