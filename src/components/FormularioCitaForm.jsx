import { useState, useEffect } from 'react';
import { Calendar, Clock, User, PawPrint, FileText, AlertCircle } from 'lucide-react';
import Alerta from './Alerta';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
            if (mascotas.length === 1 && !isEditing) {
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
                        <div className="space-y-2">
                            <Label htmlFor="cliente">
                                Cliente <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.cliente} onValueChange={(value) => setFormData({...formData, cliente: value})} required>
                                <SelectTrigger id="cliente">
                                    <SelectValue placeholder="Seleccionar cliente" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clientes.map(cliente => (
                                        <SelectItem key={cliente._id} value={cliente._id}>
                                            {cliente.nombre} {cliente.apellido} - {cliente.telefono}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                            <div className="space-y-2">
                                <Label htmlFor="paciente">
                                    Mascota <span className="text-red-500">*</span>
                                </Label>
                                {mascotasDelCliente.length > 0 ? (
                                    <Select value={formData.paciente} onValueChange={(value) => setFormData({...formData, paciente: value})} required>
                                        <SelectTrigger id="paciente">
                                            <SelectValue placeholder="Seleccionar mascota" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mascotasDelCliente.map(mascota => (
                                                <SelectItem key={mascota._id} value={mascota._id}>
                                                    {mascota.nombre} - {mascota.especie} ({mascota.raza || 'Sin raza'})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                    <div className="space-y-2">
                        <Label htmlFor="veterinario">
                            Veterinario <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.veterinario} onValueChange={(value) => setFormData({...formData, veterinario: value})} required>
                            <SelectTrigger id="veterinario">
                                <SelectValue placeholder="Seleccionar veterinario" />
                            </SelectTrigger>
                            <SelectContent>
                                {veterinarios.map(vet => (
                                    <SelectItem key={vet._id} value={vet._id}>
                                        Dr(a). {vet.nombre}
                                        {vet.especialidad && ` - ${vet.especialidad}`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Sección 4: Fecha y Hora */}
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                        <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                        Fecha y Hora
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fecha" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                Fecha <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="date"
                                id="fecha"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hora" className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                Hora <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="time"
                                id="hora"
                                name="hora"
                                value={formData.hora}
                                onChange={handleChange}
                                step="300"
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
                        <div className="space-y-2">
                            <Label htmlFor="tipo" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                Tipo de Cita <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})} required>
                                <SelectTrigger id="tipo">
                                    <SelectValue placeholder="Seleccionar tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Consulta">Consulta General</SelectItem>
                                    <SelectItem value="Vacunación">Vacunación</SelectItem>
                                    <SelectItem value="Cirugía">Cirugía</SelectItem>
                                    <SelectItem value="Control">Control</SelectItem>
                                    <SelectItem value="Emergencia">Emergencia</SelectItem>
                                    <SelectItem value="Otro">Otro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="estado" className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                Estado <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.estado} onValueChange={(value) => setFormData({...formData, estado: value})} required>
                                <SelectTrigger id="estado">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                                    <SelectItem value="Confirmada">Confirmada</SelectItem>
                                    <SelectItem value="En curso">En curso</SelectItem>
                                    <SelectItem value="Completada">Completada</SelectItem>
                                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                                    <SelectItem value="No asistió">No asistió</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="motivo" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                Motivo de la Cita <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="motivo"
                                name="motivo"
                                value={formData.motivo}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Describe el motivo de la cita..."
                                required
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="observaciones" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                Observaciones
                            </Label>
                            <Textarea
                                id="observaciones"
                                name="observaciones"
                                value={formData.observaciones}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Notas adicionales sobre la cita..."
                            />
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-200 dark:border-gray-700">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit">
                        {isEditing ? 'Actualizar Cita' : 'Agendar Cita'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCitaForm;
