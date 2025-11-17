import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Printer,
  Calendar,
  User,
  PawPrint,
  Stethoscope,
  Heart,
  Thermometer,
  Weight,
  Activity,
  Pill,
  FileText,
  AlertCircle,
  Clock,
} from 'lucide-react';
import useConsultas from '../hooks/useConsultas';
import useAuth from '../hooks/useAuth';

const DetalleConsulta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerConsulta, cargando } = useConsultas();
  const { auth } = useAuth();
  const [consulta, setConsulta] = useState(null);

  useEffect(() => {
    const cargarConsulta = async () => {
      const data = await obtenerConsulta(id);
      setConsulta(data);
    };
    cargarConsulta();
  }, [id]);

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 'N/A';
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad > 0 ? `${edad} año${edad !== 1 ? 's' : ''}` : 'Menos de 1 año';
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

  const handleImprimir = () => {
    navigate(`/admin/consultas/imprimir/${id}`);
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!consulta) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">Consulta no encontrada</p>
          </div>
        </div>
      </div>
    );
  }

  const puedeEditar = auth.rol === 'admin' || 
    (auth.rol === 'veterinario' && consulta.veterinario?._id === auth._id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/consultas')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Detalle de Consulta</h1>
            <p className="text-gray-600">
              {formatearFecha(consulta.fecha)}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleImprimir}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Printer className="w-5 h-5" />
            Imprimir Receta
          </button>
          {puedeEditar && (
            <Link
              to={`/admin/consultas/editar/${id}`}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit className="w-5 h-5" />
              Editar
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info General */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Información General</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoBadge(consulta.estado)}`}>
                {getEstadoTexto(consulta.estado)}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <PawPrint className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Paciente</p>
                  <p className="font-semibold text-gray-900">{consulta.paciente?.nombre}</p>
                  <p className="text-sm text-gray-600">
                    {consulta.paciente?.especie} - {consulta.paciente?.raza || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Edad: {calcularEdad(consulta.paciente?.fechaNacimiento)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Propietario</p>
                  <p className="font-semibold text-gray-900">
                    {consulta.cliente?.nombre} {consulta.cliente?.apellido}
                  </p>
                  <p className="text-sm text-gray-600">{consulta.cliente?.telefono}</p>
                  <p className="text-sm text-gray-600">{consulta.cliente?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Stethoscope className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Veterinario</p>
                  <p className="font-semibold text-gray-900">
                    Dr(a). {consulta.veterinario?.nombre}
                  </p>
                  {consulta.veterinario?.especialidad && (
                    <p className="text-sm text-gray-600">{consulta.veterinario.especialidad}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Fecha de Consulta</p>
                  <p className="font-semibold text-gray-900">{formatearFecha(consulta.fecha)}</p>
                  {consulta.cita && (
                    <p className="text-xs text-gray-500">Vinculada a cita</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Motivo y Síntomas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Motivo de Consulta</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{consulta.motivoConsulta}</p>
            </div>

            {consulta.sintomas && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Síntomas Observados</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{consulta.sintomas}</p>
              </div>
            )}
          </div>

          {/* Signos Vitales */}
          {(consulta.peso || consulta.temperatura || consulta.frecuenciaCardiaca || consulta.frecuenciaRespiratoria) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Signos Vitales</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {consulta.peso && (
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Weight className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Peso</p>
                    <p className="text-2xl font-bold text-gray-900">{consulta.peso}</p>
                    <p className="text-xs text-gray-500">kg</p>
                  </div>
                )}

                {consulta.temperatura && (
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <Thermometer className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Temperatura</p>
                    <p className="text-2xl font-bold text-gray-900">{consulta.temperatura}</p>
                    <p className="text-xs text-gray-500">°C</p>
                  </div>
                )}

                {consulta.frecuenciaCardiaca && (
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <Heart className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">FC</p>
                    <p className="text-2xl font-bold text-gray-900">{consulta.frecuenciaCardiaca}</p>
                    <p className="text-xs text-gray-500">lpm</p>
                  </div>
                )}

                {consulta.frecuenciaRespiratoria && (
                  <div className="text-center p-4 bg-cyan-50 rounded-lg">
                    <Activity className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">FR</p>
                    <p className="text-2xl font-bold text-gray-900">{consulta.frecuenciaRespiratoria}</p>
                    <p className="text-xs text-gray-500">rpm</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Diagnóstico y Tratamiento */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Diagnóstico y Tratamiento</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                Diagnóstico
              </h3>
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                <p className="text-gray-700 whitespace-pre-wrap">{consulta.diagnostico}</p>
              </div>
            </div>

            {consulta.tratamiento && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tratamiento Indicado</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{consulta.tratamiento}</p>
              </div>
            )}
          </div>

          {/* Medicamentos */}
          {consulta.medicamentos && consulta.medicamentos.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Pill className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Medicamentos Prescritos</h2>
              </div>
              
              <div className="space-y-3">
                {consulta.medicamentos.map((med, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{med.nombre}</h3>
                        <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Dosis</p>
                            <p className="font-medium text-gray-900">{med.dosis}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Frecuencia</p>
                            <p className="font-medium text-gray-900">{med.frecuencia}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Duración</p>
                            <p className="font-medium text-gray-900">{med.duracion}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exámenes */}
          {consulta.examenes && consulta.examenes.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Exámenes y Análisis</h2>
              </div>
              
              <div className="space-y-3">
                {consulta.examenes.map((examen, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900">{examen.tipo}</h3>
                    {examen.descripcion && (
                      <p className="text-sm text-gray-600 mt-1">{examen.descripcion}</p>
                    )}
                    {examen.resultado && (
                      <div className="mt-2 bg-purple-50 p-3 rounded">
                        <p className="text-sm font-medium text-gray-700">Resultado:</p>
                        <p className="text-sm text-gray-900">{examen.resultado}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Observaciones */}
          {consulta.observaciones && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Observaciones Adicionales</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{consulta.observaciones}</p>
            </div>
          )}
        </div>

        {/* Columna Lateral */}
        <div className="space-y-6">
          {/* Próxima Revisión */}
          {consulta.proximaRevision && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-gray-900">Próxima Revisión</h3>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(consulta.proximaRevision).toLocaleDateString('es-CL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          {/* Acciones Rápidas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <Link
                to={`/admin/pacientes/${consulta.paciente?._id}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PawPrint className="w-5 h-5" />
                Ver Paciente
              </Link>
              <Link
                to={`/admin/clientes/${consulta.cliente?._id}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <User className="w-5 h-5" />
                Ver Cliente
              </Link>
              <Link
                to="/admin/consultas/nueva"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FileText className="w-5 h-5" />
                Nueva Consulta
              </Link>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-900 mb-3">Información del Registro</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Creado</p>
                <p>{formatearFecha(consulta.createdAt)}</p>
              </div>
              {consulta.updatedAt !== consulta.createdAt && (
                <div>
                  <p className="text-xs text-gray-500">Última modificación</p>
                  <p>{formatearFecha(consulta.updatedAt)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleConsulta;
