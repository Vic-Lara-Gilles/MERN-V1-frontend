import { useEffect, useState } from "react"
import useClientes from "../hooks/useClientes"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Eye,
    UserCheck,
    Mail,
    Phone,
    MapPin
} from "lucide-react"

const Clientes = () => {
    const { clientes, obtenerClientes, eliminarCliente, cargando } = useClientes()
    const [busqueda, setBusqueda] = useState("")

    useEffect(() => {
        obtenerClientes()
    }, [])

    const handleEliminar = async (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar al cliente ${nombre}?`)) {
            await eliminarCliente(id)
        }
    }

    const clientesFiltrados = clientes.filter(cliente => {
        const searchLower = busqueda.toLowerCase()
        return (
            cliente.nombre?.toLowerCase().includes(searchLower) ||
            cliente.apellido?.toLowerCase().includes(searchLower) ||
            cliente.rut?.toLowerCase().includes(searchLower) ||
            cliente.email?.toLowerCase().includes(searchLower) ||
            cliente.telefono?.toLowerCase().includes(searchLower)
        )
    })

    if (cargando) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Clientes</h1>
                    <p className="text-muted-foreground mt-1">
                        Gestión de dueños de mascotas
                    </p>
                </div>
                <Button asChild className="gap-2">
                    <Link to="/admin/clientes/nuevo">
                        <Plus className="h-4 w-4" />
                        Nuevo Cliente
                    </Link>
                </Button>
            </div>

            {/* Buscador */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, RUT, email o teléfono..."
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            {/* Lista de clientes */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {clientesFiltrados.length === 0 ? (
                    <div className="p-12 text-center">
                        <UserCheck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {busqueda ? "No se encontraron clientes" : "No hay clientes registrados"}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            {busqueda 
                                ? "Intenta con otros términos de búsqueda" 
                                : "Comienza agregando tu primer cliente"}
                        </p>
                        {!busqueda && (
                            <Button asChild>
                                <Link to="/admin/clientes/nuevo">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Crear Primer Cliente
                                </Link>
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        RUT
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Contacto
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Ubicación
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {clientesFiltrados.map((cliente) => (
                                    <tr key={cliente._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <UserCheck className="h-5 w-5 text-green-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <Link 
                                                        to={`/admin/clientes/${cliente._id}`}
                                                        className="text-sm font-medium text-slate-900 hover:text-primary transition-colors cursor-pointer"
                                                    >
                                                        {cliente.nombre} {cliente.apellido}
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900">{cliente.rut}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center text-sm text-slate-900">
                                                    <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                                                    {cliente.email}
                                                </div>
                                                <div className="flex items-center text-sm text-slate-900">
                                                    <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                                                    {cliente.telefono}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {cliente.ciudad && (
                                                <div className="flex items-center text-sm text-slate-900">
                                                    <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
                                                    {cliente.ciudad}{cliente.comuna ? `, ${cliente.comuna}` : ''}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                cliente.activo !== false
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {cliente.activo !== false ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link to={`/admin/clientes/${cliente._id}`}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link to={`/admin/clientes/editar/${cliente._id}`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEliminar(cliente._id, `${cliente.nombre} ${cliente.apellido}`)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Clientes
