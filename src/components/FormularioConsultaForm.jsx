import { useState, useEffect } from 'react';
import {
  Stethoscope,
  Heart,
  Thermometer,
  Weight,
  Activity,
  Pill,
  FileText,
  AlertCircle,
  Plus,
  Trash2,
  PawPrint,
} from 'lucide-react';
import Alerta from './Alerta';

const FormularioConsultaForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  alerta,
  isEditing = false,
  pacientes = [],
  citas = []
}) => {
  const [formData, setFormData] = useState({
    paciente: '',
    cita: '',
    fecha: new Date().toISOString().split('T')[0],
    motivoConsulta: '',
    sintomas: '',
    peso: '',
    temperatura: '',
    frecuenciaCardiaca: '',
    frecuenciaRespiratoria: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: '',
    proximaRevision: '',
    estado: 'completada',
  });

  const [medicamentos, setMedicamentos] = useState([]);
  const [examenes, setExamenes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        paciente: initialData.paciente?._id || initialData.paciente || '',
        cita: initialData.cita?._id || initialData.cita || '',
        fecha: initialData.fecha ? initialData.fecha.split('T')[0] : new Date().toISOString().split('T')[0],
        motivoConsulta: initialData.motivoConsulta || '',
        sintomas: initialData.sintomas || '',
        peso: initialData.peso || '',
        temperatura: initialData.temperatura || '',
        frecuenciaCardiaca: initialData.frecuenciaCardiaca || '',
        frecuenciaRespiratoria: initialData.frecuenciaRespiratoria || '',
        diagnostico: initialData.diagnostico || '',
        tratamiento: initialData.tratamiento || '',
        observaciones: initialData.observaciones || '',
        proximaRevision: initialData.proximaRevision ? initialData.proximaRevision.split('T')[0] : '',
        estado: initialData.estado || 'completada',
      });
      setMedicamentos(initialData.medicamentos || []);
      setExamenes(initialData.examenes || []);
    }
  }, [initialData, isEditing]);

  useEffect(() => {
    if (formData.paciente) {
      const paciente = pacientes.find((p) => p._id === formData.paciente);
      setPacienteSeleccionado(paciente);
    }
  }, [formData.paciente, pacientes]);

  useEffect(() => {
    if (formData.cita) {
      const cita = citas.find((c) => c._id === formData.cita);
      setCitaSeleccionada(cita);
      if (cita && !formData.paciente) {
        setFormData((prev) => ({
          ...prev,
          paciente: cita.paciente._id || cita.paciente,
          motivoConsulta: cita.motivo || '',
        }));
      }
    }
  }, [formData.cita, citas]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const agregarMedicamento = () => {
    setMedicamentos([
      ...medicamentos,
      { nombre: '', dosis: '', frecuencia: '', duracion: '' },
    ]);
  };

  const actualizarMedicamento = (index, campo, valor) => {
    const nuevosMedicamentos = [...medicamentos];
    nuevosMedicamentos[index][campo] = valor;
    setMedicamentos(nuevosMedicamentos);
  };

  const eliminarMedicamento = (index) => {
    setMedicamentos(medicamentos.filter((_, i) => i !== index));
  };

  const agregarExamen = () => {
    setExamenes([
      ...examenes,
      { tipo: '', descripcion: '', resultado: '' },
    ]);
  };

  const actualizarExamen = (index, campo, valor) => {
    const nuevosExamenes = [...examenes];
    nuevosExamenes[index][campo] = valor;
    setExamenes(nuevosExamenes);
  };

  const eliminarExamen = (index) => {
    setExamenes(examenes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.paciente || !formData.motivoConsulta || !formData.diagnostico) {
      return;
    }

    const consultaData = {
      ...formData,
      medicamentos: medicamentos.filter((m) => m.nombre),
      examenes: examenes.filter((e) => e.tipo),
    };

    onSubmit(consultaData);
  };

  // Filtrar citas completadas del paciente seleccionado
  const citasDelPaciente = citas.filter(
    (c) => (c.paciente?._id || c.paciente) === formData.paciente && c.estado === 'completada'
  );

  return (
    <div className="max-w-6xl mx-auto">
      {alerta?.msg && <Alerta alerta={alerta} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección 1: Información del Paciente */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <PawPrint className="w-5 h-5 text-gray-900" />
            <h2 className="text-xl font-semibold text-gray-800">Información del Paciente</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Paciente <span className="text-red-500">*</span>
              </label>
              <select
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente._id} value={paciente._id}>
                    {paciente.nombre} - {paciente.especie} ({paciente.propietario?.nombre} {paciente.propietario?.apellido})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Cita Asociada (opcional)
              </label>
              <select
                name="cita"
                value={formData.cita}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sin cita asociada</option>
                {citasDelPaciente.map((cita) => (
                  <option key={cita._id} value={cita._id}>
                    {new Date(cita.fecha).toLocaleDateString('es-CL')} - {cita.motivo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {pacienteSeleccionado && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Especie:</span>
                  <span className="ml-2 text-gray-600">{pacienteSeleccionado.especie}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Raza:</span>
                  <span className="ml-2 text-gray-600">{pacienteSeleccionado.raza || 'N/A'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Edad:</span>
                  <span className="ml-2 text-gray-600">
                    {pacienteSeleccionado.fechaNacimiento
                      ? `${Math.floor((new Date() - new Date(pacienteSeleccionado.fechaNacimiento)) / (1000 * 60 * 60 * 24 * 365))} años`
                      : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Propietario:</span>
                  <span className="ml-2 text-gray-600">
                    {pacienteSeleccionado.propietario?.nombre} {pacienteSeleccionado.propietario?.apellido}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Teléfono:</span>
                  <span className="ml-2 text-gray-600">{pacienteSeleccionado.propietario?.telefono}</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Fecha de Consulta <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="completada">Completada</option>
                <option value="en-tratamiento">En Tratamiento</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sección 2: Motivo y Síntomas */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Motivo y Evaluación Inicial</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Motivo de la Consulta <span className="text-red-500">*</span>
              </label>
              <textarea
                name="motivoConsulta"
                value={formData.motivoConsulta}
                onChange={handleChange}
                rows="3"
                placeholder="Ej: Control de rutina, vacunación, síntomas de enfermedad..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Síntomas Observados
              </label>
              <textarea
                name="sintomas"
                value={formData.sintomas}
                onChange={handleChange}
                rows="3"
                placeholder="Describe los síntomas que presenta el paciente..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sección 3: Signos Vitales */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-800">Signos Vitales</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Weight className="inline w-4 h-4 mr-1" />
                Peso (kg)
              </label>
              <input
                type="number"
                step="0.1"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 5.5"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Thermometer className="inline w-4 h-4 mr-1" />
                Temperatura (°C)
              </label>
              <input
                type="number"
                step="0.1"
                name="temperatura"
                value={formData.temperatura}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 38.5"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Heart className="inline w-4 h-4 mr-1" />
                Frec. Cardíaca (lpm)
              </label>
              <input
                type="number"
                name="frecuenciaCardiaca"
                value={formData.frecuenciaCardiaca}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 120"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Activity className="inline w-4 h-4 mr-1" />
                Frec. Respiratoria (rpm)
              </label>
              <input
                type="number"
                name="frecuenciaRespiratoria"
                value={formData.frecuenciaRespiratoria}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 30"
              />
            </div>
          </div>
        </div>

        {/* Sección 4: Diagnóstico y Tratamiento */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Diagnóstico y Tratamiento</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Diagnóstico <span className="text-red-500">*</span>
              </label>
              <textarea
                name="diagnostico"
                value={formData.diagnostico}
                onChange={handleChange}
                rows="3"
                placeholder="Describe el diagnóstico médico..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tratamiento Recomendado
              </label>
              <textarea
                name="tratamiento"
                value={formData.tratamiento}
                onChange={handleChange}
                rows="3"
                placeholder="Describe el tratamiento a seguir..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sección 5: Medicamentos */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Medicamentos</h2>
            </div>
            <button
              type="button"
              onClick={agregarMedicamento}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Agregar Medicamento
            </button>
          </div>

          {medicamentos.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No hay medicamentos agregados</p>
          ) : (
            <div className="space-y-4">
              {medicamentos.map((medicamento, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      value={medicamento.nombre}
                      onChange={(e) => actualizarMedicamento(index, 'nombre', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nombre del medicamento"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dosis</label>
                    <input
                      type="text"
                      value={medicamento.dosis}
                      onChange={(e) => actualizarMedicamento(index, 'dosis', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: 10mg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frecuencia</label>
                    <input
                      type="text"
                      value={medicamento.frecuencia}
                      onChange={(e) => actualizarMedicamento(index, 'frecuencia', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: Cada 8 horas"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
                      <input
                        type="text"
                        value={medicamento.duracion}
                        onChange={(e) => actualizarMedicamento(index, 'duracion', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: 7 días"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => eliminarMedicamento(index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección 6: Exámenes */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-800">Exámenes y Procedimientos</h2>
            </div>
            <button
              type="button"
              onClick={agregarExamen}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              <Plus className="w-4 h-4" />
              Agregar Examen
            </button>
          </div>

          {examenes.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No hay exámenes agregados</p>
          ) : (
            <div className="space-y-4">
              {examenes.map((examen, index) => (
                <div key={index} className="grid md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Examen</label>
                    <input
                      type="text"
                      value={examen.tipo}
                      onChange={(e) => actualizarExamen(index, 'tipo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: Hemograma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <input
                      type="text"
                      value={examen.descripcion}
                      onChange={(e) => actualizarExamen(index, 'descripcion', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Detalle del examen"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resultado</label>
                      <input
                        type="text"
                        value={examen.resultado}
                        onChange={(e) => actualizarExamen(index, 'resultado', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Resultado obtenido"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => eliminarExamen(index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Observaciones y Próxima Revisión */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Adicional</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Observaciones Generales
              </label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="3"
                placeholder="Cualquier observación adicional..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Próxima Revisión
              </label>
              <input
                type="date"
                name="proximaRevision"
                value={formData.proximaRevision}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            {isEditing ? 'Actualizar Consulta' : 'Guardar Consulta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioConsultaForm;
