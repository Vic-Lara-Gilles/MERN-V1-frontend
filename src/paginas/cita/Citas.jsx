import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, Search, Filter, Eye, Edit, Trash2, Clock, User, PawPrint } from 'lucide-react';
import useCitas from '../../hooks/useCitas';
import useAuth from '../../hooks/useAuth';
import Alerta from '../../components/Alerta';
import LoadingSpinner from '../../components/LoadingSpinner';
import Header from '../../components/Header';

const Citas = () => {
    const { citas, obtenerCitas, eliminarCita, cambiarEstadoCita, cargando, alerta } = useCitas();
    const { auth } = useAuth();
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');

    useEffect(() => {
        obtenerCitas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const citasFiltradas = citas.filter(cita => {
        const cumpleBusqueda = !busqueda ||
            cita.paciente?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
            cita.cliente?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
            cita.cliente?.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
            cita.veterinario?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
            cita.motivo?.toLowerCase().includes(busqueda.toLowerCase());

        const cumpleEstado = !filtroEstado || cita.estado === filtroEstado;

        const cumpleFecha = !filtroFecha ||
            new Date(cita.fecha).toLocaleDateString('es-CL') === new Date(filtroFecha).toLocaleDateString('es-CL');

        return cumpleBusqueda && cumpleEstado && cumpleFecha;
    });

    // Estadísticas
    const totalCitas = citas.length;
    const pendientes = citas.filter(c => c.estado === 'pendiente').length;
    const confirmadas = citas.filter(c => c.estado === 'confirmada').length;
    const completadas = citas.filter(c => c.estado === 'completada').length;

    // Citas de hoy
    const hoy = new Date().toLocaleDateString('es-CL');
    const citasHoy = citas.filter(c => new Date(c.fecha).toLocaleDateString('es-CL') === hoy);

    const handleEliminar = (id, pacienteNombre) => {
        if (window.confirm(`¿Eliminar cita de ${pacienteNombre}?`)) {
            eliminarCita(id);
        }
    };

    const handleCambiarEstado = async (id, nuevoEstado) => {
        await cambiarEstadoCita(id, nuevoEstado);
    };

    const getEstadoColor = (estado) => {
        const colores = {
            'pendiente': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
            'confirmada': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
            'en-curso': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400',
            'completada': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
            'cancelada': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
        };
        return colores[estado] || 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400';
    };

    const getTipoColor = (tipo) => {
        const colores = {
            'consulta': 'text-gray-900',
            'vacunacion': 'text-green-600',
            'cirugia': 'text-red-600',
            'revision': 'text-purple-600',
            'emergencia': 'text-orange-600'
        };
        return colores[tipo] || 'text-gray-600';
    };

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-CL', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (cargando) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            {alerta.msg && <Alerta alerta={alerta} />}

            <Header
                icon={<Calendar className="h-8 w-8 text-slate-900 dark:text-lime-500" />}
                title="Agenda de Citas"
                subtitle="Gestiona las citas de la clínica veterinaria"
                actions={
                    auth.rol !== 'veterinario' && (
                        <Link
                            to="/admin/citas/nueva"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-lime-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-lime-700 transition-colors text-sm font-medium"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Nueva Cita</span>
                        </Link>
                    )
                }
            />

            {/* Buscador y Filtros */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-transparent dark:border-gray-700 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-gray-400" />
                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Paciente, cliente, veterinario..."
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-gray-400" />
                        <select
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent appearance-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        >
                            <option value="">Todos los estados</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="confirmada">Confirmada</option>
                            <option value="en-curso">En Curso</option>
                            <option value="completada">Completada</option>
                            <option value="cancelada">Cancelada</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-gray-400" />
                        <input
                            type="date"
                            value={filtroFecha}
                            onChange={(e) => setFiltroFecha(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Lista de Citas */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 overflow-hidden">
                {citasFiltradas.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {busqueda || filtroEstado || filtroFecha ? 'No se encontraron citas' : 'No hay citas agendadas'}
                        </h3>
                        <p className="text-gray-600 dark:text-slate-300 mb-6">
                            {busqueda || filtroEstado || filtroFecha
                                ? 'Intenta ajustar los filtros de búsqueda'
                                : 'Comienza agendando la primera cita'}
                        </p>
                        {!busqueda && !filtroEstado && !filtroFecha && auth.rol !== 'veterinario' && (
                            <Link
                                to="/admin/citas/nueva"
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 dark:bg-lime-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-lime-700 transition-colors"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Agendar Primera Cita</span>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                                        Fecha y Hora
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                                        Paciente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                                        Veterinario
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {citasFiltradas.map((cita) => (
                                    <tr key={cita._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {formatearFecha(cita.fecha)}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-slate-300">
                                                {cita.horaInicio} ({cita.duracion} min)
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                                                    <PawPrint className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                        {cita.paciente?.nombre}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-slate-300">
                                                        {cita.paciente?.especie}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {cita.cliente?.nombre} {cita.cliente?.apellido}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-slate-300">
                                                    {cita.cliente?.telefono}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                Dr(a). {cita.veterinario?.usuario?.nombre}
                                            </div>
                                            {cita.veterinario?.especialidad && (
                                                <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                                                    {cita.veterinario.especialidad}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={cita.estado}
                                                onChange={(e) => handleCambiarEstado(cita._id, e.target.value)}
                                                className={`text-xs px-3 py-2 rounded-lg font-medium capitalize ${getEstadoColor(cita.estado)} border-0 focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 dark:focus:ring-lime-500 transition-all cursor-pointer hover:shadow-md w-full`}
                                            >
                                                <option value="pendiente">Pendiente</option>
                                                <option value="confirmada">Confirmada</option>
                                                <option value="en-curso">En Curso</option>
                                                <option value="completada">Completada</option>
                                                <option value="cancelada">Cancelada</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/admin/citas/${cita._id}`}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                    title="Ver detalles"
                                                >
                                                    <Eye className="h-4 w-4 text-slate-600 dark:text-gray-300" />
                                                </Link>
                                                <Link
                                                    to={`/admin/citas/editar/${cita._id}`}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit className="h-4 w-4 text-slate-600 dark:text-gray-300" />
                                                </Link>
                                                <button
                                                    onClick={() => handleEliminar(cita._id, cita.paciente?.nombre)}
                                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Resumen inferior */}
            <div className="mt-4 text-sm text-gray-600 dark:text-slate-300 text-center">
                Mostrando {citasFiltradas.length} de {totalCitas} citas
            </div>
        </div>
    );
};

export default Citas;
