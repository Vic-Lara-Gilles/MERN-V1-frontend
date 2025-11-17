import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Heart,
  Thermometer,
  Weight,
  Activity,
  Pill,
  FileText,
  Calendar,
  AlertCircle,
  Plus,
  Trash2,
  PawPrint,
} from 'lucide-react';
import Alerta from './Alerta';
import useConsultas from '../hooks/useConsultas';
import usePacientes from '../hooks/usePacientes';
import useAuth from '../hooks/useAuth';
import useCitas from '../hooks/useCitas';

const FormularioConsulta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { guardarConsulta, obtenerConsulta, alerta } = useConsultas();
  const { pacientes, obtenerPacientes } = usePacientes();
  const { citas, obtenerCitas } = useCitas();
  const { auth } = useAuth();

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
    obtenerPacientes();
    obtenerCitas();
  }, []);

  useEffect(() => {
    if (id) {
      cargarConsulta();
    }
  }, [id]);

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
          paciente: cita.paciente._id,
          motivoConsulta: cita.motivo || '',
        }));
      }
    }
  }, [formData.cita, citas]);

  const cargarConsulta = async () => {
    const consultaData = await obtenerConsulta(id);
    if (consultaData) {
      setFormData({
        paciente: consultaData.paciente._id,
        cita: consultaData.cita?._id || '',
        fecha: consultaData.fecha.split('T')[0],
        motivoConsulta: consultaData.motivoConsulta,
        sintomas: consultaData.sintomas || '',
        peso: consultaData.peso || '',
        temperatura: consultaData.temperatura || '',
        frecuenciaCardiaca: consultaData.frecuenciaCardiaca || '',
        frecuenciaRespiratoria: consultaData.frecuenciaRespiratoria || '',
        diagnostico: consultaData.diagnostico,
        tratamiento: consultaData.tratamiento || '',
        observaciones: consultaData.observaciones || '',
        proximaRevision: consultaData.proximaRevision ? consultaData.proximaRevision.split('T')[0] : '',
        estado: consultaData.estado,
      });
      setMedicamentos(consultaData.medicamentos || []);
      setExamenes(consultaData.examenes || []);
    }
  };

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
      veterinario: auth._id,
      cliente: pacienteSeleccionado?.propietario?._id,
    };

    const resultado = await guardarConsulta(consultaData, id);

    if (resultado) {
      setTimeout(() => {
        navigate('/admin/consultas');
      }, 2000);
    }
  };

  const { msg } = alerta;

  // Filtrar citas completadas del paciente seleccionado
  const citasDelPaciente = citas.filter(
    (c) => c.paciente._id === formData.paciente && c.estado === 'completada'
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {id ? 'Editar Consulta Médica' : 'Nueva Consulta Médica'}
        </h1>
        <p className="text-gray-600 mt-2">
          Registra información completa de la consulta veterinaria
        </p>
      </div>

      {msg && <Alerta alerta={alerta} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección 1: Información del Paciente */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <PawPrint className="w-5 h-5 text-blue-600" />
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

          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Weight className="w-4 h-4 inline mr-1" />
                Peso (kg)
              </label>
              <input
                type="number"
                step="0.1"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                placeholder="0.0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Thermometer className="w-4 h-4 inline mr-1" />
                Temperatura (°C)
              </label>
              <input
                type="number"
                step="0.1"
                name="temperatura"
                value={formData.temperatura}
                onChange={handleChange}
                placeholder="38.0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Heart className="w-4 h-4 inline mr-1" />
                FC (lpm)
              </label>
              <input
                type="number"
                name="frecuenciaCardiaca"
                value={formData.frecuenciaCardiaca}
                onChange={handleChange}
                placeholder="120"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Activity className="w-4 h-4 inline mr-1" />
                FR (rpm)
              </label>
              <input
                type="number"
                name="frecuenciaRespiratoria"
                value={formData.frecuenciaRespiratoria}
                onChange={handleChange}
                placeholder="30"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Tratamiento
              </label>
              <textarea
                name="tratamiento"
                value={formData.tratamiento}
                onChange={handleChange}
                rows="3"
                placeholder="Describe el tratamiento indicado..."
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
            <p className="text-gray-500 text-center py-4">
              No hay medicamentos agregados. Haz clic en "Agregar Medicamento" para añadir uno.
            </p>
          ) : (
            <div className="space-y-4">
              {medicamentos.map((medicamento, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-700">Medicamento {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => eliminarMedicamento(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Nombre</label>
                      <input
                        type="text"
                        value={medicamento.nombre}
                        onChange={(e) => actualizarMedicamento(index, 'nombre', e.target.value)}
                        placeholder="Ej: Amoxicilina"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Dosis</label>
                      <input
                        type="text"
                        value={medicamento.dosis}
                        onChange={(e) => actualizarMedicamento(index, 'dosis', e.target.value)}
                        placeholder="Ej: 500mg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Frecuencia</label>
                      <input
                        type="text"
                        value={medicamento.frecuencia}
                        onChange={(e) => actualizarMedicamento(index, 'frecuencia', e.target.value)}
                        placeholder="Ej: Cada 12 horas"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Duración</label>
                      <input
                        type="text"
                        value={medicamento.duracion}
                        onChange={(e) => actualizarMedicamento(index, 'duracion', e.target.value)}
                        placeholder="Ej: 7 días"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
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
              <FileText className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Exámenes y Análisis</h2>
            </div>
            <button
              type="button"
              onClick={agregarExamen}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus className="w-4 h-4" />
              Agregar Examen
            </button>
          </div>

          {examenes.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No hay exámenes registrados. Haz clic en "Agregar Examen" para añadir uno.
            </p>
          ) : (
            <div className="space-y-4">
              {examenes.map((examen, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-700">Examen {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => eliminarExamen(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Tipo de Examen</label>
                      <input
                        type="text"
                        value={examen.tipo}
                        onChange={(e) => actualizarExamen(index, 'tipo', e.target.value)}
                        placeholder="Ej: Hemograma"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Descripción</label>
                      <input
                        type="text"
                        value={examen.descripcion}
                        onChange={(e) => actualizarExamen(index, 'descripcion', e.target.value)}
                        placeholder="Detalle del examen"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Resultado</label>
                      <input
                        type="text"
                        value={examen.resultado}
                        onChange={(e) => actualizarExamen(index, 'resultado', e.target.value)}
                        placeholder="Resultado o valor"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección 7: Seguimiento y Observaciones */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-800">Seguimiento y Observaciones</h2>
          </div>

          <div className="space-y-4">
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

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Observaciones Adicionales
              </label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="4"
                placeholder="Notas adicionales, recomendaciones, cuidados especiales..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate('/admin/consultas')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {id ? 'Actualizar Consulta' : 'Registrar Consulta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioConsulta;
