import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Calendar,
  PawPrint,
  User,
  Stethoscope,
  Filter,
  Activity,
} from 'lucide-react';
import useConsultas from '../hooks/useConsultas';
import useAuth from '../hooks/useAuth';

const Consultas = () => {
  const { consultas, eliminarConsulta, obtenerEstadisticas, cargando } = useConsultas();
  const { auth } = useAuth();

  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  const estadisticas = obtenerEstadisticas();

  // Filtrar consultas
  const consultasFiltradas = consultas.filter((consulta) => {
    const matchBusqueda =
      busqueda === '' ||
      consulta.paciente?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      consulta.cliente?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      consulta.cliente?.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
      consulta.veterinario?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      consulta.diagnostico?.toLowerCase().includes(busqueda.toLowerCase()) ||
      consulta.motivoConsulta?.toLowerCase().includes(busqueda.toLowerCase());

    const matchEstado =
      filtroEstado === '' || consulta.estado === filtroEstado;

    const matchFecha =
      filtroFecha === '' ||
      new Date(consulta.fecha).toISOString().split('T')[0] === filtroFecha;

    return matchBusqueda && matchEstado && matchFecha;
  });

  const handleEliminar = async (id) => {
    await eliminarConsulta(id);
  };

  const limpiarFiltros = () => {
    setBusqueda('');
    setFiltroEstado('');
    setFiltroFecha('');
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      completada: 'bg-green-100 text-green-800',
      'en-tratamiento': 'bg-yellow-100 text-yellow-800',
    };
    return badges[estado] || 'bg-gray-100 text-gray-800';
  };

  const getEstadoTexto = (estado) => {
    const textos = {
      completada: 'Completada',
      'en-tratamiento': 'En Tratamiento',
    };
    return textos[estado] || estado;
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Consultas Médicas</h1>
          <p className="text-gray-600 mt-2">Historial de consultas y atenciones veterinarias</p>
        </div>
        {(auth.rol === 'admin' || auth.rol === 'veterinario') && (
          <Link
            to="/admin/consultas/nueva"
            className="flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            <Plus className="w-5 h-5" />
            Nueva Consulta
          </Link>
        )}
      </div>

      {/* Filtros */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              <Search className="w-4 h-4 inline mr-1" />
              Búsqueda
            </label>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por paciente, cliente, veterinario, diagnóstico..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Estado</label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="completada">Completada</option>
              <option value="en-tratamiento">En Tratamiento</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Fecha</label>
            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {(busqueda || filtroEstado || filtroFecha) && (
          <div className="mt-4">
            <button
              onClick={limpiarFiltros}
              className="text-gray-900 hover:text-gray-900 font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Tabla de consultas */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {consultasFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No hay consultas registradas
            </h3>
            <p className="text-gray-500 mb-4">
              {busqueda || filtroEstado || filtroFecha
                ? 'No se encontraron consultas con los filtros aplicados.'
                : 'Comienza registrando tu primera consulta médica.'}
            </p>
            {(auth.rol === 'admin' || auth.rol === 'veterinario') &&
              !busqueda &&
              !filtroEstado &&
              !filtroFecha && (
                <Link
                  to="/admin/consultas/nueva"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  <Plus className="w-5 h-5" />
                  Registrar Primera Consulta
                </Link>
              )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paciente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Propietario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Veterinario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Motivo / Diagnóstico
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {consultasFiltradas.map((consulta) => (
                    <tr key={consulta._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {new Date(consulta.fecha).toLocaleDateString('es-CL', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <PawPrint className="w-4 h-4 text-gray-900" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {consulta.paciente?.nombre}
                            </div>
                            <div className="text-xs text-gray-500">
                              {consulta.paciente?.especie}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-purple-600" />
                          <div>
                            <div className="text-sm text-gray-900">
                              {consulta.cliente?.nombre} {consulta.cliente?.apellido}
                            </div>
                            <div className="text-xs text-gray-500">
                              {consulta.cliente?.telefono}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-900">
                            Dr(a). {consulta.veterinario?.nombre}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">
                          {consulta.motivoConsulta?.substring(0, 50)}
                          {consulta.motivoConsulta?.length > 50 ? '...' : ''}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {consulta.diagnostico?.substring(0, 60)}
                          {consulta.diagnostico?.length > 60 ? '...' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoBadge(
                            consulta.estado
                          )}`}
                        >
                          {getEstadoTexto(consulta.estado)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/consultas/${consulta._id}`}
                            className="text-gray-900 hover:text-blue-900"
                            title="Ver detalles"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          {(auth.rol === 'admin' ||
                            (auth.rol === 'veterinario' &&
                              consulta.veterinario?._id === auth._id)) && (
                            <>
                              <Link
                                to={`/admin/consultas/editar/${consulta._id}`}
                                className="text-green-600 hover:text-green-900"
                                title="Editar"
                              >
                                <Edit className="w-5 h-5" />
                              </Link>
                              {auth.rol === 'admin' && (
                                <button
                                  onClick={() => handleEliminar(consulta._id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Eliminar"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación / Contador */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{consultasFiltradas.length}</span> de{' '}
                <span className="font-medium">{consultas.length}</span> consultas
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Consultas;
