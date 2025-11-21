import { useState, useEffect } from 'react';
import { Calendar, Clock, User, PawPrint, FileText, AlertCircle } from 'lucide-react';
import Alerta from './Alerta';

const FormularioCitaForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  alerta,
  isEditing = false,
  clientes = [],
  pacientes = [],
  veterinarios = []
}) => {
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

  const [mascotasDelCliente, setMascotasDelCliente] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  useEffect(() => {
    if (isEditing && initialData && initialData._id) {
      setFormData({
        cliente: initialData.cliente?._id || '',
        paciente: initialData.paciente?._id || '',
        veterinario: initialData.veterinario?._id || '',
        fecha: initialData.fecha ? new Date(initialData.fecha).toISOString().split('T')[0] : '',
        hora: initialData.hora || '',
        tipo: initialData.tipo || 'Consulta',
        motivo: initialData.motivo || '',
        observaciones: initialData.observaciones || '',
        estado: initialData.estado || 'Pendiente'
      });
    }
  }, [initialData, isEditing]);

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
      } else if (!isEditing) {
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
  }, [formData.cliente, clientes, pacientes, isEditing]);

  // Cuando cambia el paciente seleccionado
  useEffect(() => {
    if (formData.paciente) {
      const paciente = pacientes.find(p => p._id === formData.paciente);
      setPacienteSeleccionado(paciente);
    } else {
      setPacienteSeleccionado(null);
    }
  }, [formData.paciente, pacientes]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    onSubmit(citaData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {alerta?.msg && <Alerta alerta={alerta} />}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-gray-700 p-6 space-y-6">
        {/* Sección 1: Cliente */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <User className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
            Seleccionar Cliente
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                Cliente <span className="text-red-500">*</span>
              </label>
              <select
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-900 dark:text-white"
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
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">Información del Cliente</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-green-700 dark:text-green-400">Nombre:</span>
                    <span className="ml-2 text-green-900 dark:text-green-200 font-medium">
                      {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700 dark:text-green-400">Teléfono:</span>
                    <span className="ml-2 text-green-900 dark:text-green-200 font-medium">{clienteSeleccionado.telefono}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-green-700 dark:text-green-400">Email:</span>
                    <span className="ml-2 text-green-900 dark:text-green-200 font-medium">{clienteSeleccionado.email}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección 2: Mascota del Cliente */}
        {formData.cliente && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <PawPrint className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
              Seleccionar Mascota
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  Mascota <span className="text-red-500">*</span>
                </label>
                {mascotasDelCliente.length > 0 ? (
                  <select
                    name="paciente"
                    value={formData.paciente}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-900 dark:text-white"
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
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        Este cliente no tiene mascotas registradas. Por favor, registra una mascota primero.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Info del paciente seleccionado */}
              {pacienteSeleccionado && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Información de la Mascota</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-700 dark:text-slate-300">Nombre:</span>
                      <span className="ml-2 text-blue-900 dark:text-blue-200 font-medium">{pacienteSeleccionado.nombre}</span>
                    </div>
                    <div>
                      <span className="text-slate-700 dark:text-slate-300">Especie:</span>
                      <span className="ml-2 text-blue-900 dark:text-blue-200 font-medium">{pacienteSeleccionado.especie}</span>
                    </div>
                    <div>
                      <span className="text-slate-700 dark:text-slate-300">Raza:</span>
                      <span className="ml-2 text-blue-900 dark:text-blue-200 font-medium">{pacienteSeleccionado.raza || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-700 dark:text-slate-300">Sexo:</span>
                      <span className="ml-2 text-blue-900 dark:text-blue-200 font-medium">{pacienteSeleccionado.sexo || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sección 3: Veterinario */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <User className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
            Veterinario Asignado
          </h2>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
              Veterinario <span className="text-red-500">*</span>
            </label>
            <select
              name="veterinario"
              value={formData.veterinario}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-900 dark:text-white"
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

        {/* Sección 4: Fecha y Hora */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
            Fecha y Hora
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Fecha <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Hora <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                step="300"
                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
        </div>

        {/* Sección 5: Detalles de la Cita */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
            Detalles de la Cita
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Tipo de Cita <span className="text-red-500">*</span>
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-900 dark:text-white"
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
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                <AlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Estado <span className="text-red-500">*</span>
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-900 dark:text-white"
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
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Motivo de la Cita <span className="text-red-500">*</span>
              </label>
              <textarea
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-900 dark:text-white"
                placeholder="Describe el motivo de la cita..."
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Observaciones
              </label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-900 dark:text-white"
                placeholder="Notas adicionales sobre la cita..."
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border-2 border-slate-300 dark:border-gray-600 rounded-lg text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-colors font-medium text-sm"
          >
            {isEditing ? 'Actualizar Cita' : 'Agendar Cita'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCitaForm;
