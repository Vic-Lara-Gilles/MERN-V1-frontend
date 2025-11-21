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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
                            <Label className="flex items-center gap-2">
                                <PawPrint className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                Paciente <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                name="paciente"
                                value={formData.paciente}
                                onValueChange={(value) => setFormData({ ...formData, paciente: value })}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar paciente" />
                                </SelectTrigger>
                                <SelectContent>
                                    {pacientes.map((paciente) => (
                                        <SelectItem key={paciente._id} value={paciente._id}>
                                            {paciente.nombre} - {paciente.especie} ({paciente.propietario?.nombre} {paciente.propietario?.apellido})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                Cita Asociada (opcional)
                            </Label>
                            <Select
                                name="cita"
                                value={formData.cita}
                                onValueChange={(value) => setFormData({ ...formData, cita: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sin cita asociada" />
                                </SelectTrigger>
                                <SelectContent>
                                    {citasDelPaciente.map((cita) => (
                                        <SelectItem key={cita._id} value={cita._id}>
                                            {new Date(cita.fecha).toLocaleDateString('es-CL')} - {cita.motivo}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                            <Label className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                Fecha de Consulta <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                Estado
                            </Label>
                            <Select
                                name="estado"
                                value={formData.estado}
                                onValueChange={(value) => setFormData({ ...formData, estado: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="completada">Completada</SelectItem>
                                    <SelectItem value="en-tratamiento">En Tratamiento</SelectItem>
                                </SelectContent>
                            </Select>
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
                            <Label className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                Motivo de la Consulta <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                name="motivoConsulta"
                                value={formData.motivoConsulta}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Ej: Control de rutina, vacunación, síntomas de enfermedad..."
                                required
                            />
                        </div>

                        <div>
                            <Label className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                Síntomas Observados
                            </Label>
                            <Textarea
                                name="sintomas"
                                value={formData.sintomas}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Describe los síntomas que presenta el paciente..."
                            />
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
                            <Label className="flex items-center gap-2">
                                <Weight className="h-4 w-4 text-red-600 dark:text-red-400" />
                                Peso (kg)
                            </Label>
                            <Input
                                type="number"
                                step="0.1"
                                name="peso"
                                value={formData.peso}
                                onChange={handleChange}
                                placeholder="Ej: 5.5"
                            />
                        </div>

                        <div>
                            <Label className="flex items-center gap-2">
                                <Thermometer className="h-4 w-4 text-red-600 dark:text-red-400" />
                                Temperatura (°C)
                            </Label>
                            <Input
                                type="number"
                                step="0.1"
                                name="temperatura"
                                value={formData.temperatura}
                                onChange={handleChange}
                                placeholder="Ej: 38.5"
                            />
                        </div>

                        <div>
                            <Label className="flex items-center gap-2">
                                <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
                                Frec. Cardíaca (lpm)
                            </Label>
                            <Input
                                type="number"
                                name="frecuenciaCardiaca"
                                value={formData.frecuenciaCardiaca}
                                onChange={handleChange}
                                placeholder="Ej: 120"
                            />
                        </div>

                        <div>
                            <Label className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-red-600 dark:text-red-400" />
                                Frec. Respiratoria (rpm)
                            </Label>
                            <Input
                                type="number"
                                name="frecuenciaRespiratoria"
                                value={formData.frecuenciaRespiratoria}
                                onChange={handleChange}
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
                            <Label className="flex items-center gap-2">
                                <Stethoscope className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Diagnóstico <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                name="diagnostico"
                                value={formData.diagnostico}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Describe el diagnóstico médico..."
                                required
                            />
                        </div>

                        <div>
                            <Label className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Tratamiento Recomendado
                            </Label>
                            <Textarea
                                name="tratamiento"
                                value={formData.tratamiento}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Describe el tratamiento a seguir..."
                            />
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
                        <Button
                            type="button"
                            onClick={agregarMedicamento}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Agregar Medicamento
                        </Button>
                    </div>

                    {medicamentos.length === 0 ? (
                        <p className="text-slate-500 dark:text-gray-400 text-center py-4">No hay medicamentos agregados</p>
                    ) : (
                        <div className="space-y-4">
                            {medicamentos.map((medicamento, index) => (
                                <div key={index} className="grid md:grid-cols-4 gap-4 p-4 border-2 border-slate-200 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-900">
                                    <div>
                                        <Label className="block mb-1">Nombre</Label>
                                        <Input
                                            type="text"
                                            value={medicamento.nombre}
                                            onChange={(e) => actualizarMedicamento(index, 'nombre', e.target.value)}
                                            placeholder="Nombre del medicamento"
                                        />
                                    </div>
                                    <div>
                                        <Label className="block mb-1">Dosis</Label>
                                        <Input
                                            type="text"
                                            value={medicamento.dosis}
                                            onChange={(e) => actualizarMedicamento(index, 'dosis', e.target.value)}
                                            placeholder="Ej: 10mg"
                                        />
                                    </div>
                                    <div>
                                        <Label className="block mb-1">Frecuencia</Label>
                                        <Input
                                            type="text"
                                            value={medicamento.frecuencia}
                                            onChange={(e) => actualizarMedicamento(index, 'frecuencia', e.target.value)}
                                            placeholder="Ej: Cada 8 horas"
                                        />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className="flex-1">
                                            <Label className="block mb-1">Duración</Label>
                                            <Input
                                                type="text"
                                                value={medicamento.duracion}
                                                onChange={(e) => actualizarMedicamento(index, 'duracion', e.target.value)}
                                                placeholder="Ej: 7 días"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={() => eliminarMedicamento(index)}
                                            variant="destructive"
                                            size="icon"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
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
                        <Button
                            type="button"
                            onClick={agregarExamen}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Agregar Examen
                        </Button>
                    </div>

                    {examenes.length === 0 ? (
                        <p className="text-slate-500 dark:text-gray-400 text-center py-4">No hay exámenes agregados</p>
                    ) : (
                        <div className="space-y-4">
                            {examenes.map((examen, index) => (
                                <div key={index} className="grid md:grid-cols-3 gap-4 p-4 border-2 border-slate-200 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-900">
                                    <div>
                                        <Label className="block mb-1">Tipo de Examen</Label>
                                        <Input
                                            type="text"
                                            value={examen.tipo}
                                            onChange={(e) => actualizarExamen(index, 'tipo', e.target.value)}
                                            placeholder="Ej: Hemograma"
                                        />
                                    </div>
                                    <div>
                                        <Label className="block mb-1">Descripción</Label>
                                        <Input
                                            type="text"
                                            value={examen.descripcion}
                                            onChange={(e) => actualizarExamen(index, 'descripcion', e.target.value)}
                                            placeholder="Detalle del examen"
                                        />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className="flex-1">
                                            <Label className="block mb-1">Resultado</Label>
                                            <Input
                                                type="text"
                                                value={examen.resultado}
                                                onChange={(e) => actualizarExamen(index, 'resultado', e.target.value)}
                                                placeholder="Resultado obtenido"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={() => eliminarExamen(index)}
                                            variant="destructive"
                                            size="icon"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
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
                            <Label className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                Observaciones Generales
                            </Label>
                            <Textarea
                                name="observaciones"
                                value={formData.observaciones}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Cualquier observación adicional..."
                            />
                        </div>

                        <div>
                            <Label className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                Próxima Revisión
                            </Label>
                            <Input
                                type="date"
                                name="proximaRevision"
                                value={formData.proximaRevision}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-4 pt-6">
                    <Button
                        type="button"
                        onClick={onCancel}
                        variant="outline"
                    >
                        Cancelar
                    </Button>
                    <Button type="submit">
                        {isEditing ? 'Actualizar Consulta' : 'Guardar Consulta'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormularioConsultaForm;
