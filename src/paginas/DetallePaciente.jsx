import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Calendar, 
  User, 
  Heart, 
  Activity,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import usePacientes from '../hooks/usePacientes';
import useClientes from '../hooks/useClientes';
import useConsultas from '../hooks/useConsultas';
import Alerta from '../components/Alerta';
import TimelineConsultas from '../components/TimelineConsultas';

const DetallePaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { paciente, obtenerPaciente, cargando, alerta } = usePacientes();
  const { obtenerConsultasPaciente } = useConsultas();
  const [cliente, setCliente] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [cargandoConsultas, setCargandoConsultas] = useState(false);

  useEffect(() => {
    obtenerPaciente(id);
  }, [id]);

  useEffect(() => {
    if (paciente && paciente.propietario) {
      setCliente(paciente.propietario);
    }
  }, [paciente]);

  useEffect(() => {
    const cargarConsultas = async () => {
      if (id) {
        setCargandoConsultas(true);
        const consultasData = await obtenerConsultasPaciente(id);
        setConsultas(consultasData || []);
        setCargandoConsultas(false);
      }
    };
    cargarConsultas();
  }, [id]);

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

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
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

  if (!paciente) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">Paciente no encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {alerta.msg && <Alerta alerta={alerta} />}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/pacientes')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{paciente.nombre}</h1>
            <p className="text-gray-600">Historia Clínica: {paciente.numeroHistoriaClinica || 'N/A'}</p>
          </div>
        </div>
        <Link
          to={`/admin/pacientes/editar/${id}`}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Edit className="h-5 w-5" />
          <span>Editar</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información Básica */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Heart className="h-5 w-5 text-gray-900 mr-2" />
              Información Básica
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Especie</p>
                <p className="font-semibold text-gray-900">{paciente.especie || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Raza</p>
                <p className="font-semibold text-gray-900">{paciente.raza || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sexo</p>
                <p className="font-semibold text-gray-900">{paciente.sexo || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Edad</p>
                <p className="font-semibold text-gray-900">{calcularEdad(paciente.fechaNacimiento)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha de Nacimiento</p>
                <p className="font-semibold text-gray-900">{formatearFecha(paciente.fechaNacimiento)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Color</p>
                <p className="font-semibold text-gray-900">{paciente.color || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Peso</p>
                <p className="font-semibold text-gray-900">{paciente.peso ? `${paciente.peso} kg` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Esterilizado</p>
                <p className="font-semibold text-gray-900 flex items-center">
                  {paciente.esterilizado ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                      Sí
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-600 mr-1" />
                      No
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Información Médica */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 text-gray-900 mr-2" />
              Información Médica
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Microchip</p>
                <p className="font-semibold text-gray-900">{paciente.microchip || 'No registrado'}</p>
              </div>
              
              {paciente.alergias && paciente.alergias.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Alergias</p>
                  <div className="flex flex-wrap gap-2">
                    {paciente.alergias.map((alergia, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                      >
                        {alergia}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {paciente.condicionesMedicas && paciente.condicionesMedicas.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Condiciones Médicas</p>
                  <div className="flex flex-wrap gap-2">
                    {paciente.condicionesMedicas.map((condicion, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                      >
                        {condicion}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(!paciente.alergias || paciente.alergias.length === 0) &&
               (!paciente.condicionesMedicas || paciente.condicionesMedicas.length === 0) && (
                <div className="text-gray-500 italic">
                  No hay alergias o condiciones médicas registradas
                </div>
              )}
            </div>
          </div>

          {/* Timeline de Consultas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-gray-900 mr-2" />
              Historial de Consultas
            </h2>
            <TimelineConsultas consultas={consultas} pacienteId={id} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Estadísticas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Estadísticas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-900 mr-2" />
                  <span className="text-sm text-gray-700">Citas Totales</span>
                </div>
                <span className="font-bold text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">Consultas</span>
                </div>
                <span className="font-bold text-green-600">{consultas.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-700">Última Visita</span>
                </div>
                <span className="font-bold text-purple-600 text-xs">
                  {consultas.length > 0 ? formatearFecha(consultas[0].fecha) : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Información del Propietario */}
          {cliente && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 text-gray-900 mr-2" />
                Propietario
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-semibold text-gray-900">
                    {cliente.nombre} {cliente.apellido}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">RUT</p>
                  <p className="font-semibold text-gray-900">{cliente.rut}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{cliente.telefono}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{cliente.email}</span>
                </div>
                {cliente.direccion && (
                  <div className="flex items-start space-x-2 text-gray-700">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <span className="text-sm">{cliente.direccion}</span>
                  </div>
                )}
                <Link
                  to={`/admin/clientes/${cliente._id}`}
                  className="block w-full text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors mt-4"
                >
                  Ver Perfil Completo
                </Link>
              </div>
            </div>
          )}

          {/* Acciones Rápidas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <Link
                to="/admin/citas/nueva"
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Calendar className="h-5 w-5" />
                <span>Agendar Cita</span>
              </Link>
              <Link
                to="/admin/consultas/nueva"
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span>Nueva Consulta</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePaciente;
