import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, PawPrint, User, Phone, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import useCitas from '../../hooks/useCitas';
import useAuth from '../../hooks/useAuth';

const AgendaVeterinario = () => {
  const { citas, obtenerCitas, cambiarEstadoCita, cargando } = useCitas();
  const { auth } = useAuth();
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    obtenerCitas();
  }, []);

  // Filtrar citas del veterinario para la fecha seleccionada
  const citasDia = citas.filter(cita => {
    const citaFecha = new Date(cita.fecha).toLocaleDateString('es-CL');
    const fechaBuscada = new Date(fechaSeleccionada).toLocaleDateString('es-CL');
    const esVeterinario = cita.veterinario?._id === auth._id;
    
    return citaFecha === fechaBuscada && esVeterinario;
  }).sort((a, b) => {
    // Ordenar por hora
    return a.horaInicio.localeCompare(b.horaInicio);
  });

  const handleCambiarEstado = async (id, nuevoEstado) => {
    await cambiarEstadoCita(id, nuevoEstado);
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      'pendiente': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertCircle },
      'confirmada': { bg: 'bg-blue-100', text: 'text-gray-900', icon: CheckCircle },
      'en-curso': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Clock },
      'completada': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      'cancelada': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };
    return badges[estado] || badges['pendiente'];
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTipoBadgeColor = (tipo) => {
    const colores = {
      'consulta': 'bg-blue-50 border-blue-200 text-gray-900',
      'vacunacion': 'bg-green-50 border-green-200 text-green-700',
      'cirugia': 'bg-red-50 border-red-200 text-red-700',
      'revision': 'bg-purple-50 border-purple-200 text-purple-700',
      'emergencia': 'bg-orange-50 border-orange-200 text-orange-700'
    };
    return colores[tipo] || 'bg-gray-50 border-gray-200 text-gray-700';
  };

  // Estadísticas del día
  const totalDia = citasDia.length;
  const completadasDia = citasDia.filter(c => c.estado === 'completada').length;
  const pendientesDia = citasDia.filter(c => c.estado === 'pendiente' || c.estado === 'confirmada').length;
  const enCursoDia = citasDia.filter(c => c.estado === 'en-curso').length;

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mi Agenda del Día</h1>
        <p className="text-gray-600 mt-2">
          Dr(a). {auth.nombre} - {auth.especialidad || 'Veterinario'}
        </p>
      </div>

      {/* Selector de Fecha */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4 inline mr-2" />
            Seleccionar Fecha:
          </label>
          <input
            type="date"
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={() => setFechaSeleccionada(new Date().toISOString().split('T')[0])}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Hoy
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {formatearFecha(fechaSeleccionada)}
        </div>
      </div>

      {/* Lista de Citas */}
      {citasDia.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay citas programadas
          </h3>
          <p className="text-gray-600">
            No tienes citas agendadas para {formatearFecha(fechaSeleccionada)}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {citasDia.map((cita) => {
            const estadoBadge = getEstadoBadge(cita.estado);
            const IconoEstado = estadoBadge.icon;

            return (
              <div
                key={cita._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  {/* Hora y Duración */}
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 rounded-lg p-3">
                      <Clock className="h-6 w-6 text-gray-900" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{cita.horaInicio}</div>
                      <div className="text-sm text-gray-600">{cita.duracion} minutos</div>
                    </div>
                  </div>

                  {/* Estado */}
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${estadoBadge.bg} ${estadoBadge.text} flex items-center gap-1`}>
                      <IconoEstado className="h-3 w-3" />
                      {cita.estado}
                    </span>
                    <span className={`px-3 py-1 rounded border text-xs font-semibold capitalize ${getTipoBadgeColor(cita.tipo)}`}>
                      {cita.tipo}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Paciente */}
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-100 rounded-lg p-2">
                      <PawPrint className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Paciente</div>
                      <div className="font-semibold text-gray-900">{cita.paciente?.nombre}</div>
                      <div className="text-sm text-gray-600">
                        {cita.paciente?.especie} - {cita.paciente?.raza || 'Sin raza especificada'}
                      </div>
                    </div>
                  </div>

                  {/* Propietario */}
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-lg p-2">
                      <User className="h-5 w-5 text-gray-900" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Propietario</div>
                      <div className="font-semibold text-gray-900">
                        {cita.cliente?.nombre} {cita.cliente?.apellido}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {cita.cliente?.telefono}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Motivo */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Motivo de Consulta:</div>
                  <div className="text-gray-900">{cita.motivo}</div>
                </div>

                {/* Notas */}
                {cita.notasInternas && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-sm text-yellow-800 mb-1 font-semibold">Notas Internas:</div>
                    <div className="text-yellow-900 text-sm">{cita.notasInternas}</div>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    {cita.estado === 'confirmada' && (
                      <button
                        onClick={() => handleCambiarEstado(cita._id, 'en-curso')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Iniciar Consulta
                      </button>
                    )}
                    {cita.estado === 'en-curso' && (
                      <button
                        onClick={() => handleCambiarEstado(cita._id, 'completada')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Marcar Completada
                      </button>
                    )}
                    {cita.estado === 'pendiente' && (
                      <button
                        onClick={() => handleCambiarEstado(cita._id, 'confirmada')}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Confirmar Cita
                      </button>
                    )}
                  </div>
                  <Link
                    to={`/admin/pacientes/${cita.paciente?._id}`}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Ver Historial
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AgendaVeterinario;
