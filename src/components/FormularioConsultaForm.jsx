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
    Calendar,
    Info
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
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border-2 border-slate-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <PawPrint className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Información del Paciente</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <PawPrint className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                Paciente <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="paciente"
                                value={formData.paciente}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
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
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                Cita Asociada (opcional)
                            </label>
                            <select
                                name="cita"
                                value={formData.cita}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
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
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
                            <div className="grid md:grid-cols-3 gap-3 text-sm">
                                <div>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">Especie:</span>
                                    <span className="ml-2 text-slate-600 dark:text-slate-400">{pacienteSeleccionado.especie}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">Raza:</span>
                                    <span className="ml-2 text-slate-600 dark:text-slate-400">{pacienteSeleccionado.raza || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">Edad:</span>
                                    <span className="ml-2 text-slate-600 dark:text-slate-400">
                                        {pacienteSeleccionado.fechaNacimiento
                                            ? `${Math.floor((new Date() - new Date(pacienteSeleccionado.fechaNacimiento)) / (1000 * 60 * 60 * 24 * 365))} años`
                                            : 'N/A'}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">Propietario:</span>
                                    <span className="ml-2 text-slate-600 dark:text-slate-400">
                                        {pacienteSeleccionado.propietario?.nombre} {pacienteSeleccionado.propietario?.apellido}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">Teléfono:</span>
                                    <span className="ml-2 text-slate-600 dark:text-slate-400">{pacienteSeleccionado.propietario?.telefono}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                Fecha de Consulta <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                Estado
                            </label>
                            <select
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
                            >
                                <option value="completada">Completada</option>
                                <option value="en-tratamiento">En Tratamiento</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Sección 2: Motivo y Síntomas */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border-2 border-slate-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Stethoscope className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Motivo y Evaluación Inicial</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                Motivo de la Consulta <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="motivoConsulta"
                                value={formData.motivoConsulta}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Ej: Control de rutina, vacunación, síntomas de enfermedad..."
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-900 dark:text-white"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <AlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                Síntomas Observados
                            </label>
                            <textarea
                                name="sintomas"
                                value={formData.sintomas}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Describe los síntomas que presenta el paciente..."
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-900 dark:text-white"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Sección 3: Signos Vitales */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border-2 border-slate-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Signos Vitales</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Weight className="h-4 w-4 text-red-600 dark:text-red-400" />
                                Peso (kg)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="peso"
                                value={formData.peso}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Ej: 5.5"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Thermometer className="h-4 w-4 text-red-600 dark:text-red-400" />
                                Temperatura (°C)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="temperatura"
                                value={formData.temperatura}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Ej: 38.5"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
                                Frec. Cardíaca (lpm)
                            </label>
                            <input
                                type="number"
                                name="frecuenciaCardiaca"
                                value={formData.frecuenciaCardiaca}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Ej: 120"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Activity className="h-4 w-4 text-red-600 dark:text-red-400" />
                                Frec. Respiratoria (rpm)
                            </label>
                            <input
                                type="number"
                                name="frecuenciaRespiratoria"
                                value={formData.frecuenciaRespiratoria}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Ej: 30"
                            />
                        </div>
                    </div>
                </div>

                {/* Sección 4: Diagnóstico y Tratamiento */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border-2 border-slate-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Diagnóstico y Tratamiento</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Stethoscope className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Diagnóstico <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="diagnostico"
                                value={formData.diagnostico}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Describe el diagnóstico médico..."
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Tratamiento Recomendado
                            </label>
                            <textarea
                                name="tratamiento"
                                value={formData.tratamiento}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Describe el tratamiento a seguir..."
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Sección 5: Medicamentos */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border-2 border-slate-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Pill className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Medicamentos</h2>
                        </div>
                        <button
                            type="button"
                            onClick={agregarMedicamento}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md"
                        >
                            <Plus className="w-4 h-4" />
                            Agregar Medicamento
                        </button>
                    </div>

                    {medicamentos.length === 0 ? (
                        <p className="text-slate-500 dark:text-gray-400 text-center py-4">No hay medicamentos agregados</p>
                    ) : (
                        <div className="space-y-4">
                            {medicamentos.map((medicamento, index) => (
                                <div key={index} className="grid md:grid-cols-4 gap-4 p-4 border-2 border-slate-200 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-900">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1">Nombre</label>
                                        <input
                                            type="text"
                                            value={medicamento.nombre}
                                            onChange={(e) => actualizarMedicamento(index, 'nombre', e.target.value)}
                                            className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                            placeholder="Nombre del medicamento"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1">Dosis</label>
                                        <input
                                            type="text"
                                            value={medicamento.dosis}
                                            onChange={(e) => actualizarMedicamento(index, 'dosis', e.target.value)}
                                            className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                            placeholder="Ej: 10mg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1">Frecuencia</label>
                                        <input
                                            type="text"
                                            value={medicamento.frecuencia}
                                            onChange={(e) => actualizarMedicamento(index, 'frecuencia', e.target.value)}
                                            className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                            placeholder="Ej: Cada 8 horas"
                                        />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className="flex-1">
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1">Duración</label>
                                            <input
                                                type="text"
                                                value={medicamento.duracion}
                                                onChange={(e) => actualizarMedicamento(index, 'duracion', e.target.value)}
                                                className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                                placeholder="Ej: 7 días"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => eliminarMedicamento(index)}
                                            className="px-3 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 shadow-md"
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
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border-2 border-slate-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Exámenes y Procedimientos</h2>
                        </div>
                        <button
                            type="button"
                            onClick={agregarExamen}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-600 dark:bg-orange-500 text-white rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 shadow-md"
                        >
                            <Plus className="w-4 h-4" />
                            Agregar Examen
                        </button>
                    </div>

                    {examenes.length === 0 ? (
                        <p className="text-slate-500 dark:text-gray-400 text-center py-4">No hay exámenes agregados</p>
                    ) : (
                        <div className="space-y-4">
                            {examenes.map((examen, index) => (
                                <div key={index} className="grid md:grid-cols-3 gap-4 p-4 border-2 border-slate-200 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-900">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1">Tipo de Examen</label>
                                        <input
                                            type="text"
                                            value={examen.tipo}
                                            onChange={(e) => actualizarExamen(index, 'tipo', e.target.value)}
                                            className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                                            placeholder="Ej: Hemograma"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1">Descripción</label>
                                        <input
                                            type="text"
                                            value={examen.descripcion}
                                            onChange={(e) => actualizarExamen(index, 'descripcion', e.target.value)}
                                            className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                                            placeholder="Detalle del examen"
                                        />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className="flex-1">
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1">Resultado</label>
                                            <input
                                                type="text"
                                                value={examen.resultado}
                                                onChange={(e) => actualizarExamen(index, 'resultado', e.target.value)}
                                                className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                                                placeholder="Resultado obtenido"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => eliminarExamen(index)}
                                            className="px-3 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 shadow-md"
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
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border-2 border-slate-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Información Adicional</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                Observaciones Generales
                            </label>
                            <textarea
                                name="observaciones"
                                value={formData.observaciones}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Cualquier observación adicional..."
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-900 dark:text-white"
                            ></textarea>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Calendar className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                Próxima Revisión
                            </label>
                            <input
                                type="date"
                                name="proximaRevision"
                                value={formData.proximaRevision}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-4 pt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border-2 border-slate-300 dark:border-gray-600 rounded-lg text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-linear-to-r from-slate-900 to-slate-800 dark:from-lime-600 dark:to-lime-700 hover:from-slate-800 hover:to-slate-700 dark:hover:from-lime-700 dark:hover:to-lime-800 text-white rounded-lg transition-colors font-medium text-sm"
                    >
                        {isEditing ? 'Actualizar Consulta' : 'Guardar Consulta'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioConsultaForm;
