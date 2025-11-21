import { useState } from "react"
import Alerta from "./Alerta"
import { Button } from "@/components/ui/button"
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
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Nombre <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Juan"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Apellido <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Pérez"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                                RUT <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="rut"
                                value={formData.rut}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white"
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
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white"
                                placeholder="juan@ejemplo.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Teléfono <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white"
                                placeholder="+56 9 1234 5678"
                                required
                            />
                        </div>

                        {!isEditing && (
                            <div className="md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                    <Lock className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    Contraseña para Portal Cliente {!formData.password && <span className="text-slate-500 dark:text-gray-500 text-xs">(opcional)</span>}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white"
                                    placeholder="Deja en blanco para generar automáticamente desde el RUT"
                                    minLength={6}
                                />
                                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
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
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Dirección
                            </label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Av. Principal 123, Depto 45"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                    <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    Ciudad
                                </label>
                                <input
                                    type="text"
                                    name="ciudad"
                                    value={formData.ciudad}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white"
                                    placeholder="Santiago"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                    <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    Comuna
                                </label>
                                <input
                                    type="text"
                                    name="comuna"
                                    value={formData.comuna}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white"
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
                            <button
                                type="button"
                                onClick={agregarPaciente}
                                className="px-4 py-2 gap-2 border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors font-medium text-sm flex items-center"
                            >
                                <Plus className="h-4 w-4" />
                                Agregar Mascota
                            </button>
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
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            Nombre <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={paciente.nombre}
                                            onChange={(e) => handlePacienteChange(index, 'nombre', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                            placeholder="Rex, Luna, etc."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            Especie <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={paciente.especie}
                                            onChange={(e) => handlePacienteChange(index, 'especie', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                        >
                                            <option value="Canino">Canino</option>
                                            <option value="Felino">Felino</option>
                                            <option value="Ave">Ave</option>
                                            <option value="Reptil">Reptil</option>
                                            <option value="Roedor">Roedor</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            Raza
                                        </label>
                                        <input
                                            type="text"
                                            value={paciente.raza}
                                            onChange={(e) => handlePacienteChange(index, 'raza', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                            placeholder="Pastor Alemán, Persa, etc."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            Fecha de Nacimiento
                                        </label>
                                        <input
                                            type="date"
                                            value={paciente.fechaNacimiento}
                                            onChange={(e) => handlePacienteChange(index, 'fechaNacimiento', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            Sexo
                                        </label>
                                        <select
                                            value={paciente.sexo}
                                            onChange={(e) => handlePacienteChange(index, 'sexo', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                        >
                                            <option value="Macho">Macho</option>
                                            <option value="Hembra">Hembra</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            Color
                                        </label>
                                        <input
                                            type="text"
                                            value={paciente.color}
                                            onChange={(e) => handlePacienteChange(index, 'color', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                            placeholder="Negro, Blanco, Tricolor, etc."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            Peso (kg)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={paciente.peso}
                                            onChange={(e) => handlePacienteChange(index, 'peso', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
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

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            Alergias (separadas por coma)
                                        </label>
                                        <input
                                            type="text"
                                            value={paciente.alergias}
                                            onChange={(e) => handlePacienteChange(index, 'alergias', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                            placeholder="Pollo, Trigo, Polen"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            Condiciones Médicas (separadas por coma)
                                        </label>
                                        <input
                                            type="text"
                                            value={paciente.condicionesMedicas}
                                            onChange={(e) => handlePacienteChange(index, 'condicionesMedicas', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
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
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                            <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                            Notas
                        </label>
                        <textarea
                            name="notas"
                            value={formData.notas}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white resize-none"
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
                    <button
                        type="submit"
                        className="px-4 py-2 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
                    >
                        <Save className="h-4 w-4" />
                        {isEditing ? 'Actualizar Cliente' : 'Guardar Cliente'}
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border-2 border-slate-300 dark:border-gray-600 rounded-lg text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default FormularioClienteForm
