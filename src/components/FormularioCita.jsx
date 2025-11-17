import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, User, PawPrint, FileText, AlertCircle } from 'lucide-react';
import useCitas from '../hooks/useCitas';
import usePacientes from '../hooks/usePacientes';
import useAuth from '../hooks/useAuth';
import Alerta from './Alerta';

const FormularioCita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cita, obtenerCita, guardarCita, alerta } = useCitas();
  const { pacientes, obtenerPacientes } = usePacientes();
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    paciente: '',
    veterinario: '',
    fecha: '',
    horaInicio: '',
    duracion: 30,
    motivo: '',
    tipo: 'consulta',
    notas: '',
    notasInternas: ''
  });

  const [veterinarios, setVeterinarios] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  useEffect(() => {
    obtenerPacientes();
    obtenerVeterinarios();
  }, []);

  useEffect(() => {
    if (id) {
      obtenerCita(id);
    }
  }, [id]);

  useEffect(() => {
    if (id && cita && cita._id) {
      setFormData({
        paciente: cita.paciente?._id || '',
        veterinario: cita.veterinario?._id || '',
        fecha: cita.fecha ? new Date(cita.fecha).toISOString().split('T')[0] : '',
        horaInicio: cita.horaInicio || '',
        duracion: cita.duracion || 30,
        motivo: cita.motivo || '',
        tipo: cita.tipo || 'consulta',
        notas: cita.notas || '',
        notasInternas: cita.notasInternas || ''
      });
    }
  }, [cita, id]);

  useEffect(() => {
    if (formData.paciente) {
      const paciente = pacientes.find(p => p._id === formData.paciente);
      setPacienteSeleccionado(paciente);
    } else {
      setPacienteSeleccionado(null);
    }
  }, [formData.paciente, pacientes]);

  const obtenerVeterinarios = async () => {
    try {
      const token = localStorage.getItem('apv_token');
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Filtrar solo veterinarios
        const vets = data.filter(user => user.rol === 'veterinario');
        setVeterinarios(vets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!formData.paciente || !formData.veterinario || !formData.fecha || 
        !formData.horaInicio || !formData.motivo) {
      alert('Todos los campos marcados con * son obligatorios');
      return;
    }

    // Crear objeto de cita
    const citaData = {
      ...formData,
      cliente: pacienteSeleccionado?.propietario?._id || pacienteSeleccionado?.propietario
    };

    const resultado = await guardarCita(citaData, id);

    if (resultado) {
      setTimeout(() => {
        navigate('/admin/citas');
      }, 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {alerta.msg && <Alerta alerta={alerta} />}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? 'Editar Cita' : 'Agendar Nueva Cita'}
        </h1>
        <p className="text-gray-600 mt-2">
          {id ? 'Modifica los datos de la cita' : 'Completa los datos para agendar una cita'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Sección 1: Paciente */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <PawPrint className="h-5 w-5 text-indigo-600 mr-2" />
            Información del Paciente
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paciente <span className="text-red-500">*</span>
              </label>
              <select
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="">Seleccionar paciente</option>
                {pacientes.map(paciente => (
                  <option key={paciente._id} value={paciente._id}>
                    {paciente.nombre} - {paciente.especie} 
                    {paciente.propietario && ` (${paciente.propietario.nombre} ${paciente.propietario.apellido})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Info del paciente seleccionado */}
            {pacienteSeleccionado && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Información del Paciente</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-blue-700">Especie:</span>
                    <span className="ml-2 text-blue-900 font-medium">{pacienteSeleccionado.especie}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Raza:</span>
                    <span className="ml-2 text-blue-900 font-medium">{pacienteSeleccionado.raza || 'N/A'}</span>
                  </div>
                  {pacienteSeleccionado.propietario && (
                    <>
                      <div>
                        <span className="text-blue-700">Propietario:</span>
                        <span className="ml-2 text-blue-900 font-medium">
                          {pacienteSeleccionado.propietario.nombre} {pacienteSeleccionado.propietario.apellido}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-700">Teléfono:</span>
                        <span className="ml-2 text-blue-900 font-medium">{pacienteSeleccionado.propietario.telefono}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección 2: Veterinario */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 text-indigo-600 mr-2" />
            Veterinario Asignado
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Veterinario <span className="text-red-500">*</span>
            </label>
            <select
              name="veterinario"
              value={formData.veterinario}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Seleccionar veterinario</option>
              {veterinarios.map(vet => (
                <option key={vet._id} value={vet._id}>
                  Dr(a). {vet.nombre}
                  {vet.especialidad && ` - ${vet.especialidad}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sección 3: Fecha y Hora */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
            Fecha y Hora
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora de Inicio <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="horaInicio"
                value={formData.horaInicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración (minutos)
              </label>
              <select
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="15">15 minutos</option>
                <option value="30">30 minutos</option>
                <option value="45">45 minutos</option>
                <option value="60">1 hora</option>
                <option value="90">1.5 horas</option>
                <option value="120">2 horas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sección 4: Detalles de la Cita */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 text-indigo-600 mr-2" />
            Detalles de la Cita
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Cita <span className="text-red-500">*</span>
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="consulta">Consulta General</option>
                <option value="vacunacion">Vacunación</option>
                <option value="cirugia">Cirugía</option>
                <option value="revision">Revisión</option>
                <option value="emergencia">Emergencia</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo de la Cita <span className="text-red-500">*</span>
              </label>
              <textarea
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Describe el motivo de la cita..."
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas para el Cliente
              </label>
              <textarea
                name="notas"
                value={formData.notas}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Indicaciones o información adicional..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas Internas (solo personal)
              </label>
              <textarea
                name="notasInternas"
                value={formData.notasInternas}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Notas para uso interno..."
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/admin/citas')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {id ? 'Actualizar Cita' : 'Agendar Cita'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCita;
