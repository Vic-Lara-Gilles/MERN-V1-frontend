import LoadingSpinner from '../../components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText } from 'lucide-react';
import useClienteAuth from '../../hooks/useClienteAuth';
import clienteAxios from '../../config/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageContainer, PageContent } from '@/components/ui/page-container';
import Header from '@/components/Header';

const MiHistorial = () => {
    const { cliente } = useClienteAuth();
    const [citas, setCitas] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [vistaActiva, setVistaActiva] = useState('citas');

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const token = localStorage.getItem('token_cliente');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const [citasRes, consultasRes] = await Promise.all([
                    clienteAxios(`/citas/portal/mis-citas`, config),
                    clienteAxios(`/consultas/portal/mis-consultas`, config),
                ]);

                setCitas(citasRes.data);
                setConsultas(consultasRes.data);
            } catch (error) {
                console.log(error);
            }
            setCargando(false);
        };
        if (cliente._id) obtenerDatos();
    }, [cliente]);

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getEstadoBadge = (estado) => {
        const badges = {
            pendiente: 'bg-yellow-100 text-yellow-800',
            confirmada: 'bg-blue-100 text-gray-900',
            'en-curso': 'bg-purple-100 text-purple-800',
            completada: 'bg-green-100 text-green-800',
            cancelada: 'bg-red-100 text-red-800',
        };
        return badges[estado] || 'bg-gray-100 text-gray-800';
    };

    return (
        <PageContainer>
            <Header
                icon={<Calendar className="h-8 w-8 text-slate-900 dark:text-lime-500" />}
                title="Mi Historial"
                subtitle="Citas y consultas médicas de tus mascotas"
            />

            <PageContent>
                {/* Tabs */}
                <div className="flex gap-4 border-b border-slate-200 dark:border-gray-700">
                    <button
                        onClick={() => setVistaActiva('citas')}
                        className={`pb-3 px-4 font-semibold transition-colors ${vistaActiva === 'citas'
                                ? 'text-slate-900 dark:text-lime-500 border-b-2 border-slate-900 dark:border-lime-500'
                                : 'text-muted-foreground dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Citas ({citas.length})
                    </button>
                    <button
                        onClick={() => setVistaActiva('consultas')}
                        className={`pb-3 px-4 font-semibold transition-colors ${vistaActiva === 'consultas'
                                ? 'text-slate-900 dark:text-lime-500 border-b-2 border-slate-900 dark:border-lime-500'
                                : 'text-muted-foreground dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        <FileText className="w-4 h-4 inline mr-2" />
                        Consultas ({consultas.length})
                    </button>
                </div>

                {cargando ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-lime-500"></div>
                    </div>
                ) : (
                    <>
                        {vistaActiva === 'citas' && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 overflow-hidden">
                                {citas.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <Calendar className="w-16 h-16 text-muted-foreground dark:text-gray-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No tienes citas registradas</h3>
                                        <p className="text-muted-foreground dark:text-slate-300 mb-4">Solicita una cita para tu mascota</p>
                                        <Button asChild className="bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700">
                                            <Link to="/portal/solicitar-cita">
                                                Solicitar Cita
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
                                            <thead className="bg-slate-50 dark:bg-gray-900">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Fecha</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Mascota</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Veterinario</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Motivo</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-gray-700">
                                                {citas.map((cita) => (
                                                    <tr key={cita._id} className="hover:bg-slate-50 dark:hover:bg-gray-700">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                                                            {formatearFecha(cita.fecha)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                                                            {cita.paciente?.nombre}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                                                            Dr(a). {cita.veterinario?.nombre}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-white max-w-xs truncate">
                                                            {cita.motivo}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <Badge variant="outline" className={getEstadoBadge(cita.estado)}>
                                                                {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {vistaActiva === 'consultas' && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700">
                                {consultas.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <FileText className="w-16 h-16 text-muted-foreground dark:text-gray-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No tienes consultas registradas</h3>
                                        <p className="text-muted-foreground dark:text-slate-300">El historial médico aparecerá aquí después de las consultas</p>
                                    </div>
                                ) : (
                                    <div className="p-6 space-y-4">
                                        {consultas.map((consulta) => (
                                            <div key={consulta._id} className="border border-slate-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{consulta.paciente?.nombre}</h3>
                                                        <p className="text-sm text-muted-foreground dark:text-gray-400">{formatearFecha(consulta.fecha)}</p>
                                                    </div>
                                                    <Badge variant="outline" className={
                                                        consulta.estado === 'completada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }>
                                                        {consulta.estado === 'completada' ? 'Completada' : 'En Tratamiento'}
                                                    </Badge>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-muted-foreground dark:text-gray-400 mb-1">Veterinario:</p>
                                                        <p className="font-semibold text-slate-900 dark:text-white">Dr(a). {consulta.veterinario?.nombre}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground dark:text-gray-400 mb-1">Motivo de Consulta:</p>
                                                        <p className="font-semibold text-slate-900 dark:text-white">{consulta.motivoConsulta.substring(0, 80)}...</p>
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <p className="text-muted-foreground dark:text-gray-400 mb-1">Diagnóstico:</p>
                                                        <p className="text-slate-900 dark:text-white">{consulta.diagnostico.substring(0, 150)}...</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </PageContent>
        </PageContainer>
    );
};

export default MiHistorial;
