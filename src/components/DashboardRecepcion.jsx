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
                    <h1 className="text-3xl font-bold text-slate-900">Panel de Recepción</h1>
                    <p className="text-muted-foreground mt-2">Gestión de citas y clientes</p>
                </div>
                <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                    Recepción
                </div>
            </div>

            {/* Estadísticas de recepción */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Clientes Totales</p>
                            <p className="text-3xl font-bold text-slate-900">45</p>
                        </div>
                        <UserCheck className="h-12 w-12 text-green-500" />
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

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Pendientes</p>
                            <p className="text-3xl font-bold text-slate-900">3</p>
                        </div>
                        <Clock className="h-12 w-12 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Mascotas Reg.</p>
                            <p className="text-3xl font-bold text-slate-900">87</p>
                        </div>
                        <PawPrint className="h-12 w-12 text-orange-500" />
                    </div>
                </div>
            </div>

            {/* Acciones rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                    to="/admin/citas/nueva" 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-white"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold">Agendar Cita</h3>
                            <p className="text-purple-100 mt-1">Registrar nueva cita</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-lg">
                            <Plus className="h-8 w-8" />
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/clientes/nuevo" 
                    className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-white"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold">Nuevo Cliente</h3>
                            <p className="text-green-100 mt-1">Registrar cliente y mascota</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-lg">
                            <UserCheck className="h-8 w-8" />
                        </div>
                    </div>
                </Link>
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
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                        Ver calendario completo →
                    </Link>
                </div>
                
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border-l-4 border-slate-300">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center min-w-[80px]">
                                <span className="text-xl font-bold text-slate-600">09:00 AM</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-slate-900">Max - Revisión general</p>
                                <p className="text-sm text-muted-foreground">Dr. Martínez • María González</p>
                                <p className="text-xs text-muted-foreground mt-1">Tel: +34 612 345 678</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                                <Phone className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                Pendiente
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center min-w-[80px]">
                                <span className="text-xl font-bold text-green-600">11:00 AM</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-slate-900">Luna - Vacunación</p>
                                <p className="text-sm text-muted-foreground">Dra. López • Carlos Ruiz</p>
                                <p className="text-xs text-muted-foreground mt-1">Tel: +34 698 765 432</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                                <Phone className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                Confirmada
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border-l-4 border-slate-300">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center min-w-[80px]">
                                <span className="text-xl font-bold text-slate-600">14:00 PM</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-slate-900">Rocky - Seguimiento cirugía</p>
                                <p className="text-sm text-muted-foreground">Dr. Martínez • Ana Martínez</p>
                                <p className="text-xs text-muted-foreground mt-1">Tel: +34 645 123 789</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                                <Phone className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                Pendiente
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center min-w-[80px]">
                                <span className="text-xl font-bold text-green-600">16:00 PM</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-slate-900">Bella - Control</p>
                                <p className="text-sm text-muted-foreground">Dra. López • Pedro Sánchez</p>
                                <p className="text-xs text-muted-foreground mt-1">Tel: +34 678 234 567</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                                <Phone className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
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
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-500"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <UserCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Directorio Clientes</h3>
                            <p className="text-sm text-muted-foreground">Ver todos los clientes</p>
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
                            <h3 className="font-semibold text-slate-900">Registro de Mascotas</h3>
                            <p className="text-sm text-muted-foreground">Ver pacientes</p>
                        </div>
                    </div>
                </Link>

                <Link 
                    to="/admin/citas/calendario" 
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-500"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Vista Calendario</h3>
                            <p className="text-sm text-muted-foreground">Agenda semanal/mensual</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DashboardRecepcion;
