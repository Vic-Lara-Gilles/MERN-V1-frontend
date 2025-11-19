import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, User, PawPrint, FileText, AlertCircle } from 'lucide-react';
import useCitas from '../hooks/useCitas';
import usePacientes from '../hooks/usePacientes';
import useClientes from '../hooks/useClientes';
import useAuth from '../hooks/useAuth';
import Alerta from './Alerta';

const FormularioCita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cita, obtenerCita, guardarCita, alerta } = useCitas();
  const { pacientes, obtenerPacientes } = usePacientes();
  const { clientes, obtenerClientes } = useClientes();
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    cliente: '',
    paciente: '',
    veterinario: '',
    fecha: '',
    hora: '',
    tipo: 'Consulta',
    motivo: '',
    observaciones: '',
    estado: 'Pendiente'
  });

  const [veterinarios, setVeterinarios] = useState([]);
  const [mascotasDelCliente, setMascotasDelCliente] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  useEffect(() => {
    obtenerPacientes();
    obtenerClientes();
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
        cliente: cita.cliente?._id || '',
        paciente: cita.paciente?._id || '',
        veterinario: cita.veterinario?._id || '',
        fecha: cita.fecha ? new Date(cita.fecha).toISOString().split('T')[0] : '',
        hora: cita.hora || '',
        tipo: cita.tipo || 'Consulta',
        motivo: cita.motivo || '',
        observaciones: cita.observaciones || '',
        estado: cita.estado || 'Pendiente'
      });
    }
  }, [cita, id]);

  // Cuando cambia el cliente, cargar sus mascotas
  useEffect(() => {
    if (formData.cliente) {
      const cliente = clientes.find(c => c._id === formData.cliente);
      setClienteSeleccionado(cliente);
      
      // Filtrar mascotas del cliente seleccionado
      const mascotas = pacientes.filter(p => 
        p.propietario?._id === formData.cliente || p.propietario === formData.cliente
      );
      setMascotasDelCliente(mascotas);
      
      // Si solo hay una mascota, seleccionarla automáticamente
      if (mascotas.length === 1) {
        setFormData(prev => ({
          ...prev,
          paciente: mascotas[0]._id
        }));
      } else if (!id) {
        // Si no es edición, limpiar el paciente seleccionado
        setFormData(prev => ({
          ...prev,
          paciente: ''
        }));
      }
    } else {
      setClienteSeleccionado(null);
      setMascotasDelCliente([]);
      setPacienteSeleccionado(null);
    }
  }, [formData.cliente, clientes, pacientes, id]);

  // Cuando cambia el paciente seleccionado
  useEffect(() => {
    if (formData.paciente) {
      const paciente = pacientes.find(p => p._id === formData.paciente);
      setPacienteSeleccionado(paciente);
    } else {
      setPacienteSeleccionado(null);
    }
  }, [formData.paciente, pacientes]);

  // Nueva función: obtener veterinarios desde el endpoint actualizado
  const obtenerVeterinarios = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setVeterinarios(data);
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

    // Debug: Mostrar datos del formulario
    console.log('=== DEBUG FORMULARIO ===');
    console.log('formData:', formData);
    console.log('fecha:', formData.fecha, 'tipo:', typeof formData.fecha);
    console.log('hora:', formData.hora, 'tipo:', typeof formData.hora);

    // Validación
    if (!formData.cliente || !formData.paciente || !formData.veterinario || 
        !formData.fecha || !formData.hora || !formData.motivo) {
      alert('Todos los campos marcados con * son obligatorios');
      return;
    }

    // Crear objeto de cita
    const citaData = {
      cliente: formData.cliente,
      paciente: formData.paciente,
      veterinario: formData.veterinario,
      fecha: formData.fecha,
      hora: formData.hora,
      tipo: formData.tipo,
      motivo: formData.motivo,
      observaciones: formData.observaciones,
      estado: formData.estado
    };

    console.log('citaData a enviar:', citaData);
    console.log('=== FIN DEBUG ===');

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
        {/* Sección 1: Cliente */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 text-gray-900 mr-2" />
            Seleccionar Cliente
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cliente <span className="text-red-500">*</span>
              </label>
              <select
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="">Seleccionar cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente._id} value={cliente._id}>
                    {cliente.nombre} {cliente.apellido} - {cliente.telefono}
                  </option>
                ))}
              </select>
            </div>

            {/* Info del cliente seleccionado */}
            {clienteSeleccionado && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Información del Cliente</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-green-700">Nombre:</span>
                    <span className="ml-2 text-green-900 font-medium">
                      {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700">Teléfono:</span>
                    <span className="ml-2 text-green-900 font-medium">{clienteSeleccionado.telefono}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-green-700">Email:</span>
                    <span className="ml-2 text-green-900 font-medium">{clienteSeleccionado.email}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección 2: Mascota del Cliente */}
        {formData.cliente && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <PawPrint className="h-5 w-5 text-gray-900 mr-2" />
              Seleccionar Mascota
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mascota <span className="text-red-500">*</span>
                </label>
                {mascotasDelCliente.length > 0 ? (
                  <select
                    name="paciente"
                    value={formData.paciente}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Seleccionar mascota</option>
                    {mascotasDelCliente.map(mascota => (
                      <option key={mascota._id} value={mascota._id}>
                        {mascota.nombre} - {mascota.especie} ({mascota.raza || 'Sin raza'})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <p className="text-sm text-yellow-800">
                        Este cliente no tiene mascotas registradas. Por favor, registra una mascota primero.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Info del paciente seleccionado */}
              {pacienteSeleccionado && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Información de la Mascota</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-900">Nombre:</span>
                      <span className="ml-2 text-blue-900 font-medium">{pacienteSeleccionado.nombre}</span>
                    </div>
                    <div>
                      <span className="text-gray-900">Especie:</span>
                      <span className="ml-2 text-blue-900 font-medium">{pacienteSeleccionado.especie}</span>
                    </div>
                    <div>
                      <span className="text-gray-900">Raza:</span>
                      <span className="ml-2 text-blue-900 font-medium">{pacienteSeleccionado.raza || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-900">Sexo:</span>
                      <span className="ml-2 text-blue-900 font-medium">{pacienteSeleccionado.sexo || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sección 3: Veterinario */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 text-gray-900 mr-2" />
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
                  Dr(a). {vet.usuario?.nombre || 'Sin nombre'}
                  {vet.especialidad ? ` - ${vet.especialidad}` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sección 4: Fecha y Hora */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 text-gray-900 mr-2" />
            Fecha y Hora
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                step="300"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Sección 5: Detalles de la Cita */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 text-gray-900 mr-2" />
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
                <option value="Consulta">Consulta General</option>
                <option value="Vacunación">Vacunación</option>
                <option value="Cirugía">Cirugía</option>
                <option value="Control">Control</option>
                <option value="Emergencia">Emergencia</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado <span className="text-red-500">*</span>
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="En curso">En curso</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
                <option value="No asistió">No asistió</option>
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
                Observaciones
              </label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Notas adicionales sobre la cita..."
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
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {id ? 'Actualizar Cita' : 'Agendar Cita'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCita;
