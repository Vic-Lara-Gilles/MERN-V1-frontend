import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useClientes from "../hooks/useClientes"
import Alerta from "./Alerta"
import { Button } from "@/components/ui/button"
import { Save, ArrowLeft } from "lucide-react"

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validaciones
        if ([formData.nombre, formData.apellido, formData.rut, formData.email, formData.telefono].includes('')) {
            return
        }

        const resultado = await guardarCliente(formData, id)
        
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
