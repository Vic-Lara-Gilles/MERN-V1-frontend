import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import { Button } from "@/components/ui/button"
import { Save, PawPrint, User, FileText, Calendar, Heart, Palette, Weight, Activity, AlertCircle, Stethoscope } from "lucide-react"

const FormularioPacienteForm = ({ 
    initialData = null, 
    onSubmit, 
    onCancel, 
    alerta, 
    isEditing = false,
    clientes = []
}) => {
    const [formData, setFormData] = useState({
        nombre: '',
        especie: 'Canino',
        raza: '',
        fechaNacimiento: '',
        sexo: 'Macho',
        color: '',
        peso: '',
        propietario: '',
        microchip: '',
        esterilizado: false,
        alergias: '',
        condicionesMedicas: '',
        foto: ''
    })

    useEffect(() => {
        if (initialData && isEditing) {
            setFormData({
                nombre: initialData.nombre || '',
                especie: initialData.especie || 'Canino',
                raza: initialData.raza || '',
                fechaNacimiento: initialData.fechaNacimiento?.split('T')[0] || '',
                sexo: initialData.sexo || 'Macho',
                color: initialData.color || '',
                peso: initialData.peso || '',
                propietario: initialData.propietario?._id || initialData.propietario || '',
                microchip: initialData.microchip || '',
                esterilizado: initialData.esterilizado || false,
                alergias: initialData.alergias?.join(', ') || '',
                condicionesMedicas: initialData.condicionesMedicas?.join(', ') || '',
                foto: initialData.foto || ''
            })
        }
    }, [initialData, isEditing])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validaciones
        if ([formData.nombre, formData.especie, formData.propietario].includes('')) {
            return
        }

        // Convertir strings separados por comas a arrays
        const datosEnviar = {
            ...formData,
            alergias: formData.alergias ? formData.alergias.split(',').map(a => a.trim()).filter(a => a) : [],
            condicionesMedicas: formData.condicionesMedicas ? formData.condicionesMedicas.split(',').map(c => c.trim()).filter(c => c) : []
        }

        onSubmit(datosEnviar)
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-gray-700 p-6">
            {alerta?.msg && <Alerta alerta={alerta} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información Básica */}
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Información Básica
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <PawPrint className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Nombre de la Mascota <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Max, Luna, Rocky..."
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Propietario <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="propietario"
                                value={formData.propietario}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                required
                            >
                                <option value="">Seleccionar Cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente._id} value={cliente._id}>
                                        {cliente.nombre} {cliente.apellido} - {cliente.rut}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <PawPrint className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Especie <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="especie"
                                value={formData.especie}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                required
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
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Raza
                            </label>
                            <input
                                type="text"
                                name="raza"
                                value={formData.raza}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Labrador, Siamés, etc."
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Fecha de Nacimiento
                            </label>
                            <input
                                type="date"
                                name="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Heart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Sexo
                            </label>
                            <select
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                            >
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Palette className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Color
                            </label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Negro, Blanco, Atigrado..."
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Weight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Peso (kg)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="peso"
                                value={formData.peso}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                placeholder="5.5"
                            />
                        </div>
                    </div>
                </div>

                {/* Información Médica */}
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Información Médica
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Microchip
                            </label>
                            <input
                                type="text"
                                name="microchip"
                                value={formData.microchip}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Número de microchip"
                            />
                        </div>

                        <div className="flex items-center pt-8">
                            <input
                                type="checkbox"
                                name="esterilizado"
                                checked={formData.esterilizado}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm font-medium text-slate-700 dark:text-gray-300">
                                Esterilizado/Castrado
                            </label>
                        </div>

                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Alergias
                            </label>
                            <input
                                type="text"
                                name="alergias"
                                value={formData.alergias}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Separar con comas: pollo, trigo, penicilina..."
                            />
                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                                Separar múltiples alergias con comas
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                                <Stethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Condiciones Médicas
                            </label>
                            <input
                                type="text"
                                name="condicionesMedicas"
                                value={formData.condicionesMedicas}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                                placeholder="Separar con comas: diabetes, cardiopatía..."
                            />
                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                                Separar múltiples condiciones con comas
                            </p>
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-gray-700">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
                    >
                        <Save className="h-4 w-4" />
                        {isEditing ? 'Actualizar Paciente' : 'Guardar Paciente'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border-2 border-slate-300 dark:border-gray-600 rounded-lg text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormularioPacienteForm
