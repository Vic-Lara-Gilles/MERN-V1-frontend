import { useState } from "react"
import Alerta from "./Alerta"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Save, Plus, Trash2, PawPrint, User, Mail, Phone, MapPin, FileText, Lock, Info } from "lucide-react"

/**
 * Componente puro de formulario de cliente
 * Solo maneja UI y estado del formulario
 * NO conoce rutas ni navegación
 */
const FormularioClienteForm = ({ 
    initialData = {}, 
    onSubmit, 
    onCancel,
    alerta,
    isEditing = false 
}) => {
    const [formData, setFormData] = useState({
        nombre: initialData.nombre || '',
        apellido: initialData.apellido || '',
        rut: initialData.rut || '',
        email: initialData.email || '',
        password: '', // Contraseña para acceso al portal
        telefono: initialData.telefono || '',
        direccion: initialData.direccion || '',
        ciudad: initialData.ciudad || '',
        comuna: initialData.comuna || '',
        notas: initialData.notas || ''
    })

    const [pacientes, setPacientes] = useState([{
        nombre: '',
        especie: 'Canino',
        raza: '',
        fechaNacimiento: '',
        sexo: 'Macho',
        color: '',
        peso: '',
        esterilizado: false,
        alergias: '',
        condicionesMedicas: ''
    }])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handlePacienteChange = (index, field, value) => {
        const newPacientes = [...pacientes]
        newPacientes[index][field] = value
        setPacientes(newPacientes)
    }

    const agregarPaciente = () => {
        setPacientes([...pacientes, {
            nombre: '',
            especie: 'Canino',
            raza: '',
            fechaNacimiento: '',
            sexo: 'Macho',
            color: '',
            peso: '',
            esterilizado: false,
            alergias: '',
            condicionesMedicas: ''
        }])
    }

    const eliminarPaciente = (index) => {
        if (pacientes.length > 1) {
            const newPacientes = pacientes.filter((_, i) => i !== index)
            setPacientes(newPacientes)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Preparar datos para enviar
        const datosCompletos = {
            ...formData,
            pacientes: !isEditing ? pacientes.filter(p => p.nombre.trim() !== '').map(p => ({
                ...p,
                alergias: p.alergias ? p.alergias.split(',').map(a => a.trim()).filter(a => a !== '') : [],
                condicionesMedicas: p.condicionesMedicas ? p.condicionesMedicas.split(',').map(c => c.trim()).filter(c => c !== '') : [],
                peso: p.peso ? parseFloat(p.peso) : undefined,
                fechaNacimiento: p.fechaNacimiento || undefined
            })) : undefined
        }

        onSubmit(datosCompletos)
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-gray-700 p-6">
            {alerta?.msg && <Alerta alerta={alerta} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información Personal */}
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Información Personal
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nombre" className="flex items-center gap-2">
                                <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Nombre <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Juan"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="apellido" className="flex items-center gap-2">
                                <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Apellido <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                placeholder="Pérez"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rut" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                                RUT <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="rut"
                                name="rut"
                                value={formData.rut}
                                onChange={handleChange}
                                placeholder="12.345.678-9"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Información de Contacto */}
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Información de Contacto
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="juan@ejemplo.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="telefono" className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Teléfono <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder="+56 9 1234 5678"
                                required
                            />
                        </div>

                        {!isEditing && (
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="password" className="flex items-center gap-2">
                                    <Lock className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    Contraseña para Portal Cliente {!formData.password && <span className="text-slate-500 dark:text-gray-500 text-xs">(opcional)</span>}
                                </Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Deja en blanco para generar automáticamente desde el RUT"
                                    minLength={6}
                                />
                                <p className="text-xs text-slate-500 dark:text-gray-400">
                                    {formData.password 
                                        ? "El cliente podrá iniciar sesión con esta contraseña" 
                                        : "Si no ingresas una contraseña, se generará automáticamente usando el RUT (sin puntos ni guión)"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Ubicación */}
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Ubicación
                    </h2>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="direccion" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Dirección
                            </Label>
                            <Input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                placeholder="Av. Principal 123, Depto 45"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="ciudad" className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    Ciudad
                                </Label>
                                <Input
                                    type="text"
                                    id="ciudad"
                                    name="ciudad"
                                    value={formData.ciudad}
                                    onChange={handleChange}
                                    placeholder="Santiago"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="comuna" className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    Comuna
                                </Label>
                                <Input
                                    type="text"
                                    id="comuna"
                                    name="comuna"
                                    value={formData.comuna}
                                    onChange={handleChange}
                                    placeholder="Las Condes"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mascotas/Pacientes - Solo al crear nuevo cliente */}
                {!isEditing && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center shadow-lg">
                                    <PawPrint className="h-5 w-5 text-white" />
                                </div>
                                Mascotas del Cliente
                            </h2>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={agregarPaciente}
                                className="gap-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                                <Plus className="h-4 w-4" />
                                Agregar Mascota
                            </Button>
                        </div>

                        {pacientes.map((paciente, index) => (
                            <div key={index} className="mb-6 p-6 border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center shadow-md">
                                            <PawPrint className="h-4 w-4 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                            Mascota #{index + 1}
                                        </h3>
                                    </div>
                                    {pacientes.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => eliminarPaciente(index)}
                                            className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 border-2 border-transparent hover:border-red-200 dark:hover:border-red-800 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`nombre-${index}`}>
                                            Nombre <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            id={`nombre-${index}`}
                                            value={paciente.nombre}
                                            onChange={(e) => handlePacienteChange(index, 'nombre', e.target.value)}
                                            placeholder="Rex, Luna, etc."
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`especie-${index}`}>
                                            Especie <span className="text-red-500">*</span>
                                        </Label>
                                        <Select value={paciente.especie} onValueChange={(value) => handlePacienteChange(index, 'especie', value)}>
                                            <SelectTrigger id={`especie-${index}`}>
                                                <SelectValue placeholder="Seleccionar especie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Canino">Canino</SelectItem>
                                                <SelectItem value="Felino">Felino</SelectItem>
                                                <SelectItem value="Ave">Ave</SelectItem>
                                                <SelectItem value="Reptil">Reptil</SelectItem>
                                                <SelectItem value="Roedor">Roedor</SelectItem>
                                                <SelectItem value="Otro">Otro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`raza-${index}`}>Raza</Label>
                                        <Input
                                            type="text"
                                            id={`raza-${index}`}
                                            value={paciente.raza}
                                            onChange={(e) => handlePacienteChange(index, 'raza', e.target.value)}
                                            placeholder="Pastor Alemán, Persa, etc."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`fechaNacimiento-${index}`}>Fecha de Nacimiento</Label>
                                        <Input
                                            type="date"
                                            id={`fechaNacimiento-${index}`}
                                            value={paciente.fechaNacimiento}
                                            onChange={(e) => handlePacienteChange(index, 'fechaNacimiento', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`sexo-${index}`}>Sexo</Label>
                                        <Select value={paciente.sexo} onValueChange={(value) => handlePacienteChange(index, 'sexo', value)}>
                                            <SelectTrigger id={`sexo-${index}`}>
                                                <SelectValue placeholder="Seleccionar sexo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Macho">Macho</SelectItem>
                                                <SelectItem value="Hembra">Hembra</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`color-${index}`}>Color</Label>
                                        <Input
                                            type="text"
                                            id={`color-${index}`}
                                            value={paciente.color}
                                            onChange={(e) => handlePacienteChange(index, 'color', e.target.value)}
                                            placeholder="Negro, Blanco, Tricolor, etc."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`peso-${index}`}>Peso (kg)</Label>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            id={`peso-${index}`}
                                            value={paciente.peso}
                                            onChange={(e) => handlePacienteChange(index, 'peso', e.target.value)}
                                            placeholder="5.5"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={paciente.esterilizado}
                                                onChange={(e) => handlePacienteChange(index, 'esterilizado', e.target.checked)}
                                                className="w-5 h-5 rounded border-2 border-slate-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                                Esterilizado/Castrado
                                            </span>
                                        </label>
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor={`alergias-${index}`}>Alergias (separadas por coma)</Label>
                                        <Input
                                            type="text"
                                            id={`alergias-${index}`}
                                            value={paciente.alergias}
                                            onChange={(e) => handlePacienteChange(index, 'alergias', e.target.value)}
                                            placeholder="Pollo, Trigo, Polen"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor={`condicionesMedicas-${index}`}>Condiciones Médicas (separadas por coma)</Label>
                                        <Input
                                            type="text"
                                            id={`condicionesMedicas-${index}`}
                                            value={paciente.condicionesMedicas}
                                            onChange={(e) => handlePacienteChange(index, 'condicionesMedicas', e.target.value)}
                                            placeholder="Diabetes, Artritis, Displasia de cadera"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Notas */}
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Notas Adicionales
                    </h2>
                    <div className="space-y-2">
                        <Label htmlFor="notas" className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                            Notas
                        </Label>
                        <Textarea
                            id="notas"
                            name="notas"
                            value={formData.notas}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Información adicional sobre el cliente..."
                        />
                    </div>
                </div>

                {/* Información de Acceso al Portal */}
                {!isEditing && !formData.password && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <h3 className="flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-300 mb-2">
                            <Info className="h-4 w-4" />
                            Contraseña Automática
                        </h3>
                        <p className="text-sm text-slate-800 dark:text-slate-300">
                            Al no ingresar una contraseña, se generará automáticamente usando el RUT (sin puntos ni guión).
                        </p>
                        <p className="text-sm text-slate-800 dark:text-slate-300 mt-2">
                            <strong>Ejemplo:</strong> Si el RUT es 12.345.678-9, la contraseña será: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">123456789</code>
                        </p>
                        <p className="text-sm text-slate-800 dark:text-slate-300 mt-2">
                            El cliente podrá cambiar su contraseña desde el portal web después de iniciar sesión.
                        </p>
                    </div>
                )}

                {/* Botones */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-gray-700">
                    <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        {isEditing ? 'Actualizar Cliente' : 'Guardar Cliente'}
                    </Button>
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                        >
                            Cancelar
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default FormularioClienteForm
