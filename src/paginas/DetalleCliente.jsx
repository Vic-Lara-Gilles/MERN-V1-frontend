import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import useClientes from "../hooks/useClientes"
import usePacientes from "../hooks/usePacientes"
import { Button } from "@/components/ui/button"
import { 
    ArrowLeft, 
    Edit, 
    Mail, 
    Phone, 
    MapPin,
    PawPrint,
    Plus,
    Calendar,
    FileText
} from "lucide-react"

const DetalleCliente = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { cliente, obtenerClientePorId, cargando } = useClientes()
    const { pacientes: todosPacientes } = usePacientes()
    const [pacientesCliente, setPacientesCliente] = useState([])

    useEffect(() => {
        obtenerClientePorId(id)
    }, [id])

    useEffect(() => {
        if (id && todosPacientes.length > 0) {
            const pacientesFiltrados = todosPacientes.filter(
                p => p.propietario?._id === id || p.propietario === id
            )
            setPacientesCliente(pacientesFiltrados)
        }
    }, [id, todosPacientes])

    if (cargando) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!cliente?._id) {
        return (
            <div className="p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Cliente no encontrado</h2>
                    <Button className="mt-4" onClick={() => navigate('/admin/clientes')}>
                        Volver a Clientes
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
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
                            {cliente.nombre} {cliente.apellido}
                        </h1>
                        <p className="text-muted-foreground mt-1">Información del cliente</p>
                    </div>
                </div>
                <Button asChild>
                    <Link to={`/admin/clientes/editar/${id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Cliente
                    </Link>
                </Button>
            </div>

            {/* Información del cliente */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Datos personales */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">
                            Información Personal
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Nombre Completo</p>
                                <p className="text-lg font-medium text-slate-900">
                                    {cliente.nombre} {cliente.apellido}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">RUT</p>
                                <p className="text-lg font-medium text-slate-900">{cliente.rut}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">
                            Información de Contacto
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="text-base font-medium text-slate-900">{cliente.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Teléfono</p>
                                    <p className="text-base font-medium text-slate-900">{cliente.telefono}</p>
                                </div>
                            </div>
                            {cliente.direccion && (
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Dirección</p>
                                        <p className="text-base font-medium text-slate-900">
                                            {cliente.direccion}
                                            {cliente.ciudad && `, ${cliente.ciudad}`}
                                            {cliente.comuna && `, ${cliente.comuna}`}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {cliente.notas && (
                        <div className="border-t pt-6">
                            <h2 className="text-xl font-semibold text-slate-900 mb-4">
                                Notas
                            </h2>
                            <p className="text-base text-slate-700">{cliente.notas}</p>
                        </div>
                    )}
                </div>

                {/* Estadísticas */}
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Mascotas</p>
                                <p className="text-3xl font-bold text-slate-900">{pacientesCliente.length}</p>
                            </div>
                            <PawPrint className="h-12 w-12 text-orange-500" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Citas Totales</p>
                                <p className="text-3xl font-bold text-slate-900">0</p>
                            </div>
                            <Calendar className="h-12 w-12 text-purple-500" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Consultas</p>
                                <p className="text-3xl font-bold text-slate-900">0</p>
                            </div>
                            <FileText className="h-12 w-12 text-indigo-500" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-sm text-muted-foreground mb-2">Estado</p>
                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                            cliente.activo !== false
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {cliente.activo !== false ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Mascotas del cliente */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <PawPrint className="h-5 w-5 text-slate-600" />
                        <h2 className="text-xl font-semibold text-slate-900">Mascotas</h2>
                    </div>
                    <Button asChild>
                        <Link to={`/admin/pacientes/nuevo?cliente=${id}`}>
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Mascota
                        </Link>
                    </Button>
                </div>

                {pacientesCliente.length === 0 ? (
                    <div className="text-center py-12">
                        <PawPrint className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            No hay mascotas registradas
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Este cliente aún no tiene mascotas asociadas
                        </p>
                        <Button asChild>
                            <Link to={`/admin/pacientes/nuevo?cliente=${id}`}>
                                <Plus className="h-4 w-4 mr-2" />
                                Registrar Primera Mascota
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pacientesCliente.map((paciente) => (
                            <div 
                                key={paciente._id} 
                                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <PawPrint className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{paciente.nombre}</h3>
                                            <p className="text-sm text-muted-foreground">{paciente.especie}</p>
                                            {paciente.raza && (
                                                <p className="text-xs text-muted-foreground">{paciente.raza}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    {paciente.numeroHistoriaClinica && (
                                        <p className="text-xs text-muted-foreground">
                                            HC: {paciente.numeroHistoriaClinica}
                                        </p>
                                    )}
                                    <Button size="sm" variant="outline" asChild className="w-full">
                                        <Link to={`/admin/pacientes/${paciente._id}`}>
                                            Ver Detalle
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DetalleCliente
