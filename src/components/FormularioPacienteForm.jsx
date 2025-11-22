import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Save, PawPrint, User, FileText, Calendar, Heart, Palette, Weight, Activity, AlertCircle, Stethoscope } from "lucide-react"

const FormularioPacienteForm = ({ 
    initialData = null, 
    onSubmit, 
    onCancel, 
    alerta, 
    isEditing = false,
    clientes = []
}) => {
    const [localAlerta, setLocalAlerta] = useState({})
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
        if (!formData.nombre.trim()) {
            setLocalAlerta({
                msg: 'El nombre de la mascota es obligatorio',
                error: true
            })
            return
        }

        if (!formData.especie) {
            setLocalAlerta({
                msg: 'La especie es obligatoria',
                error: true
            })
            return
        }

        if (!formData.propietario) {
            setLocalAlerta({
                msg: 'Debes seleccionar un propietario',
                error: true
            })
            return
        }

        // Limpiar alerta local
        setLocalAlerta({})

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
            {(alerta?.msg || localAlerta?.msg) && <Alerta alerta={alerta?.msg ? alerta : localAlerta} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información Básica */}
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Información Básica
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nombre" className="flex items-center gap-2">
                                <PawPrint className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Nombre de la Mascota <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Max, Luna, Rocky..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="propietario" className="flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Propietario <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.propietario} onValueChange={(value) => setFormData({...formData, propietario: value})} required>
                                <SelectTrigger id="propietario">
                                    <SelectValue placeholder="Seleccionar Cliente" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clientes.map((cliente) => (
                                        <SelectItem key={cliente._id} value={cliente._id}>
                                            {cliente.nombre} {cliente.apellido} - {cliente.rut}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="especie" className="flex items-center gap-2">
                                <PawPrint className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Especie <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.especie} onValueChange={(value) => setFormData({...formData, especie: value})} required>
                                <SelectTrigger id="especie">
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
                            <Label htmlFor="raza" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Raza
                            </Label>
                            <Input
                                type="text"
                                id="raza"
                                name="raza"
                                value={formData.raza}
                                onChange={handleChange}
                                placeholder="Labrador, Siamés, etc."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fechaNacimiento" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Fecha de Nacimiento
                            </Label>
                            <Input
                                type="date"
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sexo" className="flex items-center gap-2">
                                <Heart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Sexo
                            </Label>
                            <Select value={formData.sexo} onValueChange={(value) => setFormData({...formData, sexo: value})}>
                                <SelectTrigger id="sexo">
                                    <SelectValue placeholder="Seleccionar sexo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Macho">Macho</SelectItem>
                                    <SelectItem value="Hembra">Hembra</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="color" className="flex items-center gap-2">
                                <Palette className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Color
                            </Label>
                            <Input
                                type="text"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                placeholder="Negro, Blanco, Atigrado..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="peso" className="flex items-center gap-2">
                                <Weight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Peso (kg)
                            </Label>
                            <Input
                                type="number"
                                step="0.1"
                                id="peso"
                                name="peso"
                                value={formData.peso}
                                onChange={handleChange}
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
                        <div className="space-y-2">
                            <Label htmlFor="microchip" className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Microchip
                            </Label>
                            <Input
                                type="text"
                                id="microchip"
                                name="microchip"
                                value={formData.microchip}
                                onChange={handleChange}
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

                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="alergias" className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Alergias
                            </Label>
                            <Input
                                type="text"
                                id="alergias"
                                name="alergias"
                                value={formData.alergias}
                                onChange={handleChange}
                                placeholder="Separar con comas: pollo, trigo, penicilina..."
                            />
                            <p className="text-xs text-slate-500 dark:text-gray-400">
                                Separar múltiples alergias con comas
                            </p>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="condicionesMedicas" className="flex items-center gap-2">
                                <Stethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Condiciones Médicas
                            </Label>
                            <Input
                                type="text"
                                id="condicionesMedicas"
                                name="condicionesMedicas"
                                value={formData.condicionesMedicas}
                                onChange={handleChange}
                                placeholder="Separar con comas: diabetes, cardiopatía..."
                            />
                            <p className="text-xs text-slate-500 dark:text-gray-400">
                                Separar múltiples condiciones con comas
                            </p>
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-gray-700">
                    <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
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
