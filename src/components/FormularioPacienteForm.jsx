import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

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
        <div className="bg-white rounded-lg shadow-md p-6">
            {alerta?.msg && <Alerta alerta={alerta} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información Básica */}
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">
                        Información Básica
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Nombre de la Mascota <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Max, Luna, Rocky..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Propietario <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="propietario"
                                value={formData.propietario}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Especie <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="especie"
                                value={formData.especie}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Raza
                            </label>
                            <input
                                type="text"
                                name="raza"
                                value={formData.raza}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Labrador, Siamés, etc."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Fecha de Nacimiento
                            </label>
                            <input
                                type="date"
                                name="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Sexo
                            </label>
                            <select
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Color
                            </label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Negro, Blanco, Atigrado..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Peso (kg)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="peso"
                                value={formData.peso}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="5.5"
                            />
                        </div>
                    </div>
                </div>

                {/* Información Médica */}
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">
                        Información Médica
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Microchip
                            </label>
                            <input
                                type="text"
                                name="microchip"
                                value={formData.microchip}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Número de microchip"
                            />
                        </div>

                        <div className="flex items-center pt-8">
                            <input
                                type="checkbox"
                                name="esterilizado"
                                checked={formData.esterilizado}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm font-medium text-slate-700">
                                Esterilizado/Castrado
                            </label>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Alergias
                            </label>
                            <input
                                type="text"
                                name="alergias"
                                value={formData.alergias}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Separar con comas: pollo, trigo, penicilina..."
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Separar múltiples alergias con comas
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Condiciones Médicas
                            </label>
                            <input
                                type="text"
                                name="condicionesMedicas"
                                value={formData.condicionesMedicas}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Separar con comas: diabetes, cardiopatía..."
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Separar múltiples condiciones con comas
                            </p>
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex items-center gap-4 pt-4 border-t">
                    <Button
                        type="submit"
                        className="gap-2"
                    >
                        <Save className="h-4 w-4" />
                        {isEditing ? 'Actualizar Paciente' : 'Guardar Paciente'}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default FormularioPacienteForm
