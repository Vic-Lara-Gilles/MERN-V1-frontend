import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, Search, Filter, Eye, Edit, Trash2, Clock, User, PawPrint } from 'lucide-react';
import useCitas from '../hooks/useCitas';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';

const Citas = () => {
  const { citas, obtenerCitas, eliminarCita, cambiarEstadoCita, cargando, alerta } = useCitas();
  const { auth } = useAuth();
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  useEffect(() => {
    obtenerCitas();
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
      'pendiente': 'bg-yellow-100 text-yellow-800',
      'confirmada': 'bg-blue-100 text-gray-900',
      'en-curso': 'bg-purple-100 text-purple-800',
      'completada': 'bg-green-100 text-green-800',
      'cancelada': 'bg-red-100 text-red-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {alerta.msg && <Alerta alerta={alerta} />}

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda de Citas</h1>
          <p className="text-gray-600 mt-2">
            Gestiona las citas de la clínica veterinaria
          </p>
        </div>
        <Link
          to="/admin/citas/nueva"
          className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nueva Cita</span>
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="h-4 w-4 inline mr-1" />
              Buscar
            </label>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Paciente, cliente, veterinario..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="h-4 w-4 inline mr-1" />
              Estado
            </label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="en-curso">En Curso</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-1" />
              Fecha
            </label>
            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Lista de Citas */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {citasFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {busqueda || filtroEstado || filtroFecha ? 'No se encontraron citas' : 'No hay citas agendadas'}
            </h3>
            <p className="text-gray-600 mb-6">
              {busqueda || filtroEstado || filtroFecha 
                ? 'Intenta ajustar los filtros de búsqueda' 
                : 'Comienza agendando la primera cita'}
            </p>
            {!busqueda && !filtroEstado && !filtroFecha && (
              <Link
                to="/admin/citas/nueva"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Agendar Primera Cita</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Fecha y Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Veterinario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {citasFiltradas.map((cita) => (
                  <tr key={cita._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap w-1/6">
                      <div className="text-sm font-medium text-gray-900">
                        {formatearFecha(cita.fecha)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {cita.horaInicio} ({cita.duracion} min)
                      </div>
                    </td>
                    <td className="px-6 py-4 w-1/6">
                      <div className="flex items-center">
                        <PawPrint className="h-5 w-5 text-orange-500 mr-2 shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {cita.paciente?.nombre}
                          </div>
                          <div className="text-sm text-gray-500">
                            {cita.paciente?.especie}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 w-1/6">
                      <div className="text-sm text-gray-900">
                        {cita.cliente?.nombre} {cita.cliente?.apellido}
                      </div>
                      <div className="text-sm text-gray-500">
                        {cita.cliente?.telefono}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-1/6">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                        <span className="text-sm text-gray-900">
                          Dr(a). {cita.veterinario?.nombre}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-1/6">
                      <select
                        value={cita.estado}
                        onChange={(e) => handleCambiarEstado(cita._id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${getEstadoColor(cita.estado)} w-full`}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmada">Confirmada</option>
                        <option value="en-curso">En Curso</option>
                        <option value="completada">Completada</option>
                        <option value="cancelada">Cancelada</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-1/6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/citas/${cita._id}`}
                          className="text-gray-900 hover:text-indigo-900"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/admin/citas/editar/${cita._id}`}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleEliminar(cita._id, cita.paciente?.nombre)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
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
      <div className="mt-4 text-sm text-gray-600 text-center">
        Mostrando {citasFiltradas.length} de {totalCitas} citas
      </div>
    </div>
  );
};

export default Citas;
