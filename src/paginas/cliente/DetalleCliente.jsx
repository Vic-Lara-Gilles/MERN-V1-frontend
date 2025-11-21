import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import useClientes from "../../hooks/useClientes"
import usePacientes from "../../hooks/usePacientes"
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
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-slate-900 dark:border-lime-500 border-r-transparent"></div>
                    <p className="mt-4 text-muted-foreground dark:text-slate-300">Cargando cliente...</p>
                </div>
            </div>
        )
    }

    if (!cliente?._id) {
        return (
            <div className="p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Cliente no encontrado</h2>
                    <Button className="mt-4 bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700" onClick={() => navigate('/admin/clientes')}>
                        Volver a Clientes
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/admin/clientes')}
                        className="hover:bg-slate-100 dark:hover:bg-gray-700"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {cliente.nombre} {cliente.apellido}
                        </h1>
                        <p className="text-muted-foreground dark:text-slate-300 mt-1">Información del cliente</p>
                    </div>
                </div>
                <Button asChild className="bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700">
                    <Link to={`/admin/clientes/editar/${id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Cliente
                    </Link>
                </Button>
            </div>

            {/* Información del cliente */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Datos personales */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                            Información Personal
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground dark:text-slate-400">Nombre Completo</p>
                                <p className="text-lg font-medium text-slate-900 dark:text-white">
                                    {cliente.nombre} {cliente.apellido}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground dark:text-slate-400">RUT</p>
                                <p className="text-lg font-medium text-slate-900 dark:text-white">{cliente.rut}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-200 dark:border-gray-700 pt-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                            Información de Contacto
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground dark:text-slate-400" />
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">Email</p>
                                    <p className="text-base font-medium text-slate-900 dark:text-white">{cliente.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground dark:text-slate-400" />
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">Teléfono</p>
                                    <p className="text-base font-medium text-slate-900 dark:text-white">{cliente.telefono}</p>
                                </div>
                            </div>
                            {cliente.direccion && (
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground dark:text-slate-400" />
                                    <div>
                                        <p className="text-sm text-muted-foreground dark:text-slate-400">Dirección</p>
                                        <p className="text-base font-medium text-slate-900 dark:text-white">
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
                        <div className="border-t border-slate-200 dark:border-gray-700 pt-6">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                Notas
                            </h2>
                            <p className="text-base text-slate-700 dark:text-slate-300">{cliente.notas}</p>
                        </div>
                    )}
                </div>

                {/* Estadísticas */}
                <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-orange-500 dark:border-orange-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground dark:text-slate-400">Mascotas</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">{pacientesCliente.length}</p>
                            </div>
                            <PawPrint className="h-12 w-12 text-orange-500 dark:text-orange-400" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-purple-500 dark:border-purple-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground dark:text-slate-400">Citas Totales</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
                            </div>
                            <Calendar className="h-12 w-12 text-purple-500 dark:text-purple-400" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-indigo-500 dark:border-indigo-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground dark:text-slate-400">Consultas</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
                            </div>
                            <FileText className="h-12 w-12 text-indigo-500 dark:text-indigo-400" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-transparent dark:border-gray-700">
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">Estado</p>
                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                            cliente.activo !== false
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                            {cliente.activo !== false ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Mascotas del cliente */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <PawPrint className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Mascotas</h2>
                    </div>
                    <Button asChild className="bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700">
                        <Link to={`/admin/pacientes/nuevo?cliente=${id}`}>
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Mascota
                        </Link>
                    </Button>
                </div>

                {pacientesCliente.length === 0 ? (
                    <div className="text-center py-12">
                        <PawPrint className="h-16 w-16 text-muted-foreground dark:text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            No hay mascotas registradas
                        </h3>
                        <p className="text-muted-foreground dark:text-slate-300 mb-6">
                            Este cliente aún no tiene mascotas asociadas
                        </p>
                        <Button asChild className="bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700">
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
                                className="border border-slate-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-900"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                                            <PawPrint className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white">{paciente.nombre}</h3>
                                            <p className="text-sm text-muted-foreground dark:text-slate-400">{paciente.especie}</p>
                                            {paciente.raza && (
                                                <p className="text-xs text-muted-foreground dark:text-slate-400">{paciente.raza}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    {paciente.numeroHistoriaClinica && (
                                        <p className="text-xs text-muted-foreground dark:text-slate-400">
                                            HC: {paciente.numeroHistoriaClinica}
                                        </p>
                                    )}
                                    <Button size="sm" variant="outline" asChild className="w-full border-slate-200 dark:border-gray-600 hover:bg-slate-100 dark:hover:bg-gray-700">
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
