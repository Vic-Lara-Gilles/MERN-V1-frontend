import LoadingSpinner from '../../components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    PawPrint,
    Calendar,
    FileText,
    User,
    Phone,
    Mail,
    MapPin,
    Clock,
    CalendarPlus,
    TrendingUp
} from 'lucide-react';
import useClienteAuth from '../../hooks/useClienteAuth';
import clienteAxios from '../../config/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

const ClienteDashboard = () => {
    const { cliente } = useClienteAuth();
    const [estadisticas, setEstadisticas] = useState({
        totalMascotas: 0,
        proximasCitas: 0,
        ultimaConsulta: null,
    });
    const [pacientes, setPacientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerEstadisticas = async () => {
            try {
                const token = localStorage.getItem('token_cliente');
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Obtener pacientes del cliente
                const { data: pacientesData } = await clienteAxios(`/pacientes/portal/mis-pacientes`, config);
                setPacientes(pacientesData.slice(0, 3)); // Solo las primeras 3 mascotas

                // Obtener citas del cliente
                const { data: citas } = await clienteAxios(`/citas/portal/mis-citas`, config);

                // Contar próximas citas (pendientes o confirmadas)
                const hoy = new Date();
                const proximasCitas = citas.filter(
                    (cita) =>
                        new Date(cita.fecha) >= hoy &&
                        (cita.estado === 'pendiente' || cita.estado === 'confirmada')
                );

                setEstadisticas({
                    totalMascotas: pacientesData.length,
                    proximasCitas: proximasCitas.length,
                    ultimaConsulta: null, // Se puede implementar más adelante
                });
            } catch (error) {
                console.log(error);
            }
            setCargando(false);
        };

        if (cliente._id) {
            obtenerEstadisticas();
        }
    }, [cliente]);

    if (cargando) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Bienvenida */}
                <Header />

                {/* Estadísticas */}
                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <Card className="hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Mis Mascotas
                            </CardTitle>
                            <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                <PawPrint className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold dark:text-white">{estadisticas.totalMascotas}</div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                Mascotas registradas
                            </p>
                            <Button variant="link" className="px-0 mt-2" asChild>
                                <Link to="/portal/mis-mascotas">
                                    Ver todas →
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Próximas Citas
                            </CardTitle>
                            <div className="h-10 w-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold dark:text-white">{estadisticas.proximasCitas}</div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                Citas confirmadas
                            </p>
                            <Button variant="link" className="px-0 mt-2" asChild>
                                <Link to="/portal/mi-historial">
                                    Ver calendario →
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Última Consulta
                            </CardTitle>
                            <div className="h-10 w-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-semibold dark:text-white">
                                {estadisticas.ultimaConsulta ? estadisticas.ultimaConsulta : 'Sin registro'}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                Historial médico
                            </p>
                            <Button variant="link" className="px-0 mt-2" asChild>
                                <Link to="/portal/mi-historial">
                                    Ver historial →
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Información Personal y Acciones */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Datos del Cliente */}
                    <Card className="lg:col-span-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 dark:text-white">
                                <User className="h-5 w-5" />
                                Mis Datos Personales
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                Información de contacto registrada
                            </CardDescription>ƒ
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Nombre Completo</p>
                                    <p className="text-base font-semibold text-slate-900 dark:text-white">
                                        {cliente.nombre} {cliente.apellido}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">RUT</p>
                                    <p className="text-base font-semibold text-slate-900 dark:text-white">{cliente.rut}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </p>
                                    <p className="text-base font-semibold text-slate-900 dark:text-white">{cliente.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                        <Phone className="h-4 w-4" />
                                        Teléfono
                                    </p>
                                    <p className="text-base font-semibold text-slate-900 dark:text-white">{cliente.telefono}</p>
                                </div>
                                {cliente.direccion && (
                                    <div className="md:col-span-2 space-y-1">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            Dirección
                                        </p>
                                        <p className="text-base font-semibold text-slate-900 dark:text-white">
                                            {cliente.direccion}
                                            {cliente.comuna && `, ${cliente.comuna}`}
                                            {cliente.ciudad && `, ${cliente.ciudad}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Acciones Rápidas */}
                    <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="dark:text-white">Acciones Rápidas</CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                Gestiona tus citas y mascotas
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full justify-start bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600" size="lg" asChild>
                                <Link to="/portal/mis-mascotas">
                                    <PawPrint className="h-5 w-5 mr-3" />
                                    Ver Mis Mascotas
                                </Link>
                            </Button>
                            <Button className="w-full justify-start bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600" size="lg" asChild>
                                <Link to="/portal/solicitar-cita">
                                    <CalendarPlus className="h-5 w-5 mr-3" />
                                    Solicitar Cita
                                </Link>
                            </Button>
                            <Button className="w-full justify-start bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600" size="lg" asChild>
                                <Link to="/portal/mi-historial">
                                    <Clock className="h-5 w-5 mr-3" />
                                    Ver Historial
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Resumen de Mascotas */}
                {pacientes.length > 0 && (
                    <Card className="mt-8 border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2 dark:text-white">
                                        <PawPrint className="h-5 w-5" />
                                        Mis Mascotas
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">
                                        {estadisticas.totalMascotas > 3
                                            ? `Mostrando 3 de ${estadisticas.totalMascotas} mascotas`
                                            : `${estadisticas.totalMascotas} ${estadisticas.totalMascotas === 1 ? 'mascota registrada' : 'mascotas registradas'}`
                                        }
                                    </CardDescription>
                                </div>
                                {estadisticas.totalMascotas > 3 && (
                                    <Button variant="outline" asChild className="dark:border-gray-600 dark:hover:bg-gray-700">
                                        <Link to="/portal/mis-mascotas">
                                            Ver todas
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-4">
                                {pacientes.map((mascota) => (
                                    <div key={mascota._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-gray-900">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white">{mascota.nombre}</h3>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{mascota.numeroHistoriaClinica}</p>
                                            </div>
                                            <div className="h-10 w-10 rounded-full bg-orange-600 dark:bg-orange-600 flex items-center justify-center">
                                                <PawPrint className="h-5 w-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Especie:</span>
                                                <span className="font-medium text-slate-900 dark:text-white">{mascota.especie}</span>
                                            </div>
                                            {mascota.raza && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Raza:</span>
                                                    <span className="font-medium text-slate-900 dark:text-white">{mascota.raza}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Sexo:</span>
                                                <span className="font-medium text-slate-900 dark:text-white">{mascota.sexo}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Información importante */}
                <Card className="mt-8 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
                    <CardHeader>
                        <CardTitle className="text-blue-900 dark:text-blue-300 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Información Importante
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span>Las citas solicitadas deben ser confirmadas por nuestra recepción</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span>Puedes ver el historial médico completo de tus mascotas</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span>Para cambios en tus datos personales, contacta con recepción</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span>En caso de emergencia, llámanos directamente al teléfono de la clínica</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default ClienteDashboard;
