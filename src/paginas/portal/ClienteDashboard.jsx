import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    PawPrint,
    Calendar,
    FileText,
    Phone,
    Mail,
    MapPin,
    CalendarPlus,
    Clock,
    Info,
    Home
} from 'lucide-react';
import useClienteAuth from '../../hooks/useClienteAuth';
import clienteAxios from '../../config/axios';
import { Button } from '@/components/ui/button';
import { PageContainer, PageContent } from '@/components/ui/page-container';
import { StatsCard } from '@/components/ui/stats-card';
import { Card, CardContent } from '@/components/ui/card';
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

                const { data: pacientesData } = await clienteAxios(`/pacientes/portal/mis-pacientes`, config);
                setPacientes(pacientesData.slice(0, 3));

                const { data: citas } = await clienteAxios(`/citas/portal/mis-citas`, config);

                const hoy = new Date();
                const proximasCitas = citas.filter(
                    (cita) =>
                        new Date(cita.fecha) >= hoy &&
                        (cita.estado === 'pendiente' || cita.estado === 'confirmada')
                );

                setEstadisticas({
                    totalMascotas: pacientesData.length,
                    proximasCitas: proximasCitas.length,
                    ultimaConsulta: null,
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
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-lime-500"></div>
            </div>
        );
    }

    return (
        <PageContainer>
            <Header
                icon={<Home className="h-8 w-8 text-slate-900 dark:text-lime-500" />}
                title={`Bienvenido, ${cliente.nombre} ${cliente.apellido}`}
                subtitle="Panel de control de cliente"
            />

            <PageContent>
                {/* Información Personal y Estadísticas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Datos Personales */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6 space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                Información Personal
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-gray-400">Nombre Completo</p>
                                    <p className="text-base font-semibold text-slate-900 dark:text-white">
                                        {cliente.nombre} {cliente.apellido}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-gray-400">RUT</p>
                                    <p className="text-base font-semibold text-slate-900 dark:text-white">{cliente.rut}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 dark:border-gray-700 pt-6">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                Información de Contacto
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 text-muted-foreground dark:text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Email</p>
                                        <p className="text-base text-slate-900 dark:text-white">{cliente.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-muted-foreground dark:text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Teléfono</p>
                                        <p className="text-base text-slate-900 dark:text-white">{cliente.telefono}</p>
                                    </div>
                                </div>
                                {cliente.direccion && (
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-muted-foreground dark:text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-muted-foreground dark:text-gray-400">Dirección</p>
                                            <p className="text-base text-slate-900 dark:text-white">
                                                {cliente.direccion}
                                                {cliente.ciudad && `, ${cliente.ciudad}`}
                                                {cliente.comuna && `, ${cliente.comuna}`}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-transparent dark:border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-gray-400">Mis Mascotas</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{estadisticas.totalMascotas}</p>
                                </div>
                                <PawPrint className="h-10 w-10 text-blue-500 dark:text-blue-400" />
                            </div>
                            <Link to="/portal/mis-mascotas" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 mt-2">
                                Ver todas →
                            </Link>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-transparent dark:border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-gray-400">Próximas Citas</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{estadisticas.proximasCitas}</p>
                                </div>
                                <Calendar className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                            </div>
                            <Link to="/portal/mi-historial" className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 mt-2">
                                Ver calendario →
                            </Link>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-transparent dark:border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-gray-400">Última Consulta</p>
                                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                                        {estadisticas.ultimaConsulta || 'Sin registro'}
                                    </p>
                                </div>
                                <FileText className="h-10 w-10 text-green-500 dark:text-green-400" />
                            </div>
                            <Link to="/portal/mi-historial" className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1 mt-2">
                                Ver historial →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Información Importante */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
                                Información Importante
                            </h3>
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
                        </div>
                    </div>
                </div>
            </PageContent>
        </PageContainer>
    );
};

export default ClienteDashboard;
