import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useClientes from "../hooks/useClientes"
import Alerta from "./Alerta"
import { Button } from "@/components/ui/button"
import { Save, ArrowLeft, Plus, Trash2, PawPrint } from "lucide-react"

const FormularioCliente = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { guardarCliente, cliente, obtenerClientePorId, alerta } = useClientes()

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        rut: '',
        email: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        comuna: '',
        notas: ''
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

    useEffect(() => {
        if (id) {
            obtenerClientePorId(id)
        }
    }, [id])

    useEffect(() => {
        if (id && cliente?._id) {
            setFormData({
                nombre: cliente.nombre || '',
                apellido: cliente.apellido || '',
                rut: cliente.rut || '',
                email: cliente.email || '',
                telefono: cliente.telefono || '',
                direccion: cliente.direccion || '',
                ciudad: cliente.ciudad || '',
                comuna: cliente.comuna || '',
                notas: cliente.notas || ''
            })
        }
    }, [cliente, id])

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

        // Validaciones del cliente
        if ([formData.nombre, formData.apellido, formData.rut, formData.email, formData.telefono].includes('')) {
            return
        }

        // Validar que haya al menos un paciente si es nuevo registro
        if (!id) {
            const pacientesValidos = pacientes.filter(p => p.nombre.trim() !== '')
            if (pacientesValidos.length === 0) {
                return
            }
        }

        // Preparar datos para enviar
        const datosCompletos = {
            ...formData,
            pacientes: !id ? pacientes.filter(p => p.nombre.trim() !== '').map(p => ({
                ...p,
                alergias: p.alergias ? p.alergias.split(',').map(a => a.trim()).filter(a => a !== '') : [],
                condicionesMedicas: p.condicionesMedicas ? p.condicionesMedicas.split(',').map(c => c.trim()).filter(c => c !== '') : [],
                peso: p.peso ? parseFloat(p.peso) : undefined,
                fechaNacimiento: p.fechaNacimiento || undefined
            })) : undefined
        }

        const resultado = await guardarCliente(datosCompletos, id)
        
        if (resultado) {
            navigate('/admin/clientes')
        }
    }

    return (
        <div className="p-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/admin/clientes')}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {id ? 'Editar Cliente' : 'Nuevo Cliente'}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {id ? 'Actualiza la información del cliente' : 'Registra un nuevo dueño de mascota'}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    {alerta?.msg && <Alerta alerta={alerta} />}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Información Personal */}
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">
                                Información Personal
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Nombre <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Juan"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Apellido <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Pérez"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        RUT <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="rut"
                                        value={formData.rut}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="12.345.678-9"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Información de Contacto */}
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">
                                Información de Contacto
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="juan@ejemplo.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Teléfono <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="+56 9 1234 5678"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ubicación */}
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">
                                Ubicación
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Dirección
                                    </label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Av. Principal 123, Depto 45"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Ciudad
                                        </label>
                                        <input
                                            type="text"
                                            name="ciudad"
                                            value={formData.ciudad}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Santiago"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Comuna
                                        </label>
                                        <input
                                            type="text"
                                            name="comuna"
                                            value={formData.comuna}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Las Condes"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mascotas/Pacientes - Solo al crear nuevo cliente */}
                        {!id && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                        <PawPrint className="h-5 w-5 text-primary" />
                                        Mascotas del Cliente
                                    </h2>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={agregarPaciente}
                                        className="gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Agregar Mascota
                                    </Button>
                                </div>

                                {pacientes.map((paciente, index) => (
                                    <div key={index} className="mb-6 p-4 border-2 border-dashed border-slate-200 rounded-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-medium text-slate-700">
                                                Mascota #{index + 1}
                                            </h3>
                                            {pacientes.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => eliminarPaciente(index)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Nombre <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={paciente.nombre}
                                                    onChange={(e) => handlePacienteChange(index, 'nombre', e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    placeholder="Rex, Luna, etc."
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Especie <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    value={paciente.especie}
                                                    onChange={(e) => handlePacienteChange(index, 'especie', e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                                                    value={paciente.raza}
                                                    onChange={(e) => handlePacienteChange(index, 'raza', e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    placeholder="Pastor Alemán, Persa, etc."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Fecha de Nacimiento
                                                </label>
                                                <input
                                                    type="date"
                                                    value={paciente.fechaNacimiento}
                                                    onChange={(e) => handlePacienteChange(index, 'fechaNacimiento', e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Sexo
                                                </label>
                                                <select
                                                    value={paciente.sexo}
                                                    onChange={(e) => handlePacienteChange(index, 'sexo', e.target.value)}
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
                                                    value={paciente.color}
                                                    onChange={(e) => handlePacienteChange(index, 'color', e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    placeholder="Negro, Blanco, Tricolor, etc."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Peso (kg)
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={paciente.peso}
                                                    onChange={(e) => handlePacienteChange(index, 'peso', e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    placeholder="5.5"
                                                />
                                            </div>

                                            <div className="flex items-center">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={paciente.esterilizado}
                                                        onChange={(e) => handlePacienteChange(index, 'esterilizado', e.target.checked)}
                                                        className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary"
                                                    />
                                                    <span className="text-sm font-medium text-slate-700">
                                                        Esterilizado/Castrado
                                                    </span>
                                                </label>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Alergias (separadas por coma)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={paciente.alergias}
                                                    onChange={(e) => handlePacienteChange(index, 'alergias', e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    placeholder="Pollo, Trigo, Polen"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Condiciones Médicas (separadas por coma)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={paciente.condicionesMedicas}
                                                    onChange={(e) => handlePacienteChange(index, 'condicionesMedicas', e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">
                                Notas Adicionales
                            </h2>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Notas
                                </label>
                                <textarea
                                    name="notas"
                                    value={formData.notas}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                    placeholder="Información adicional sobre el cliente..."
                                />
                            </div>
                        </div>

                        {/* Información de Acceso al Portal */}
                        {!id && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    ℹ️ Acceso al Portal del Cliente
                                </h3>
                                <p className="text-sm text-gray-900">
                                    Se generará automáticamente una contraseña temporal usando el RUT (sin puntos ni guión).
                                    El cliente podrá cambiar su contraseña desde el portal web.
                                </p>
                                <p className="text-sm text-gray-900 mt-2">
                                    <strong>Ejemplo:</strong> Si el RUT es 12.345.678-9, la contraseña temporal será: <code className="bg-blue-100 px-2 py-1 rounded">123456789</code>
                                </p>
                            </div>
                        )}

                        {/* Botones */}
                        <div className="flex items-center gap-4 pt-4 border-t">
                            <Button
                                type="submit"
                                className="gap-2"
                            >
                                <Save className="h-4 w-4" />
                                {id ? 'Actualizar Cliente' : 'Guardar Cliente'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/admin/clientes')}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormularioCliente
