import { Calendar, User, FileText, Pill, TestTube, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TimelineConsultas = ({ consultas, pacienteId }) => {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatearFechaCorta = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!consultas || consultas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No hay consultas registradas
        </h3>
        <p className="text-gray-600 mb-6">
          Este paciente aún no tiene consultas médicas en el sistema
        </p>
        <Link
          to={`/admin/consultas/nueva?paciente=${pacienteId}`}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FileText className="h-5 w-5" />
          <span>Registrar Primera Consulta</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header con botón de nueva consulta */}
      <div className="flex justify-end mb-4">
        <Link
          to={`/admin/consultas/nueva?paciente=${pacienteId}`}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FileText className="h-5 w-5" />
          <span>Nueva Consulta</span>
        </Link>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Línea vertical del timeline */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Lista de consultas */}
        <div className="space-y-6">
          {consultas.map((consulta, index) => (
            <div key={consulta._id || index} className="relative pl-16">
              {/* Punto del timeline */}
              <div className="absolute left-6 top-2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow"></div>

              {/* Tarjeta de consulta */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                {/* Header de la consulta */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      {formatearFechaCorta(consulta.fecha)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(consulta.fecha).toLocaleTimeString('es-CL', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    consulta.estado === 'completada'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {consulta.estado === 'completada' ? 'Completada' : 'En tratamiento'}
                  </span>
                </div>

                {/* Veterinario */}
                {consulta.veterinario && (
                  <div className="flex items-center space-x-2 mb-3 text-sm text-gray-700">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>
                      Dr(a). {consulta.veterinario.nombre}
                      {consulta.veterinario.especialidad && (
                        <span className="text-gray-500 ml-1">
                          - {consulta.veterinario.especialidad}
                        </span>
                      )}
                    </span>
                  </div>
                )}

                {/* Motivo de consulta */}
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    Motivo de Consulta
                  </h4>
                  <p className="text-sm text-gray-700">{consulta.motivoConsulta}</p>
                </div>

                {/* Síntomas (si existen) */}
                {consulta.sintomas && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Síntomas
                    </h4>
                    <p className="text-sm text-gray-700">{consulta.sintomas}</p>
                  </div>
                )}

                {/* Signos vitales (si existen) */}
                {(consulta.peso || consulta.temperatura || consulta.frecuenciaCardiaca || consulta.frecuenciaRespiratoria) && (
                  <div className="mb-3 grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded">
                    {consulta.peso && (
                      <div className="text-xs">
                        <span className="text-gray-600">Peso:</span>
                        <span className="font-semibold text-gray-900 ml-1">{consulta.peso} kg</span>
                      </div>
                    )}
                    {consulta.temperatura && (
                      <div className="text-xs">
                        <span className="text-gray-600">Temp:</span>
                        <span className="font-semibold text-gray-900 ml-1">{consulta.temperatura}°C</span>
                      </div>
                    )}
                    {consulta.frecuenciaCardiaca && (
                      <div className="text-xs">
                        <span className="text-gray-600">FC:</span>
                        <span className="font-semibold text-gray-900 ml-1">{consulta.frecuenciaCardiaca} lpm</span>
                      </div>
                    )}
                    {consulta.frecuenciaRespiratoria && (
                      <div className="text-xs">
                        <span className="text-gray-600">FR:</span>
                        <span className="font-semibold text-gray-900 ml-1">{consulta.frecuenciaRespiratoria} rpm</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Diagnóstico */}
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    Diagnóstico
                  </h4>
                  <p className="text-sm text-gray-700">{consulta.diagnostico}</p>
                </div>

                {/* Tratamiento */}
                {consulta.tratamiento && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Tratamiento
                    </h4>
                    <p className="text-sm text-gray-700">{consulta.tratamiento}</p>
                  </div>
                )}

                {/* Medicamentos */}
                {consulta.medicamentos && consulta.medicamentos.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <Pill className="h-4 w-4 mr-1 text-indigo-600" />
                      Medicamentos
                    </h4>
                    <div className="space-y-2">
                      {consulta.medicamentos.map((med, idx) => (
                        <div key={idx} className="bg-indigo-50 p-2 rounded text-sm">
                          <p className="font-semibold text-gray-900">{med.nombre}</p>
                          <div className="grid grid-cols-3 gap-2 mt-1 text-xs text-gray-700">
                            {med.dosis && <span>Dosis: {med.dosis}</span>}
                            {med.frecuencia && <span>Frecuencia: {med.frecuencia}</span>}
                            {med.duracion && <span>Duración: {med.duracion}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exámenes */}
                {consulta.examenes && consulta.examenes.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <TestTube className="h-4 w-4 mr-1 text-purple-600" />
                      Exámenes
                    </h4>
                    <div className="space-y-2">
                      {consulta.examenes.map((exam, idx) => (
                        <div key={idx} className="bg-purple-50 p-2 rounded text-sm">
                          <p className="font-semibold text-gray-900">{exam.tipo}</p>
                          {exam.descripcion && (
                            <p className="text-xs text-gray-700 mt-1">{exam.descripcion}</p>
                          )}
                          {exam.resultado && (
                            <p className="text-xs text-gray-900 mt-1">
                              <span className="font-semibold">Resultado:</span> {exam.resultado}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Próxima revisión */}
                {consulta.proximaRevision && (
                  <div className="flex items-center space-x-2 text-sm bg-yellow-50 p-2 rounded mb-3">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-gray-700">
                      Próxima revisión: {formatearFechaCorta(consulta.proximaRevision)}
                    </span>
                  </div>
                )}

                {/* Observaciones */}
                {consulta.observaciones && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Observaciones
                    </h4>
                    <p className="text-sm text-gray-700 italic">{consulta.observaciones}</p>
                  </div>
                )}

                {/* Footer con acciones */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-3">
                  <div className="text-xs text-gray-500">
                    Consulta #{consulta._id ? consulta._id.slice(-6) : index + 1}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/consultas/${consulta._id}`}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Ver detalles
                    </Link>
                    {consulta.estado === 'en-tratamiento' && (
                      <Link
                        to={`/admin/consultas/editar/${consulta._id}`}
                        className="text-xs text-green-600 hover:text-green-700 font-medium"
                      >
                        Actualizar
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineConsultas;
