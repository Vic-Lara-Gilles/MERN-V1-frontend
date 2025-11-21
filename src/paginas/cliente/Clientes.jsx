import LoadingSpinner from '../../components/LoadingSpinner';
import Header from '../../components/Header';
import { useEffect, useState } from "react"
import useClientes from "../../hooks/useClientes"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Eye,
    Users,
    Mail,
    Phone,
    MapPin
} from "lucide-react"

const Clientes = () => {
    const { clientes, obtenerClientes, eliminarCliente, cargando } = useClientes()
    const [busqueda, setBusqueda] = useState("")

    useEffect(() => {
        obtenerClientes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        return <LoadingSpinner />;
    }

    return (
        <div>
            <Header
                icon={<Users className="h-8 w-8 text-slate-900 dark:text-lime-500" />}
                title="Clientes"
                subtitle="Gestión de dueños de mascotas"
                actions={
                    <Link to="/admin/clientes/nuevo" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-lime-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-lime-700 transition-colors text-sm font-medium">
                        <Plus className="h-4 w-4" />
                        Nuevo Cliente
                    </Link>
                }
            />

            {/* Buscador */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-transparent dark:border-gray-700">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, RUT, email o teléfono..."
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            {/* Lista de clientes */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-transparent dark:border-gray-700">
                {clientesFiltrados.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="h-16 w-16 text-muted-foreground dark:text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            {busqueda ? "No se encontraron clientes" : "No hay clientes registrados"}
                        </h3>
                        <p className="text-muted-foreground dark:text-slate-300 mb-6">
                            {busqueda 
                                ? "Intenta con otros términos de búsqueda" 
                                : "Comienza agregando tu primer cliente"}
                        </p>
                        {!busqueda && (
                            <Button asChild className="bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700">
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
                            <thead className="bg-slate-50 dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                        RUT
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                        Contacto
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                        Ubicación
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-gray-700">
                                {clientesFiltrados.map((cliente) => (
                                    <tr key={cliente._id} className="hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                                    <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                </div>
                                                <div className="ml-4">
                                                    <Link 
                                                        to={`/admin/clientes/${cliente._id}`}
                                                        className="text-sm font-medium text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-lime-400 transition-colors cursor-pointer"
                                                    >
                                                        {cliente.nombre} {cliente.apellido}
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900 dark:text-slate-200">{cliente.rut}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center text-sm text-slate-900 dark:text-slate-200">
                                                    <Mail className="h-3 w-3 mr-2 text-muted-foreground dark:text-gray-400" />
                                                    {cliente.email}
                                                </div>
                                                <div className="flex items-center text-sm text-slate-900 dark:text-slate-200">
                                                    <Phone className="h-3 w-3 mr-2 text-muted-foreground dark:text-gray-400" />
                                                    {cliente.telefono}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {cliente.ciudad && (
                                                <div className="flex items-center text-sm text-slate-900 dark:text-slate-200">
                                                    <MapPin className="h-3 w-3 mr-2 text-muted-foreground dark:text-gray-400" />
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
                                                <Link
                                                    to={`/admin/clientes/${cliente._id}`}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                >
                                                    <Eye className="h-4 w-4 text-slate-600 dark:text-gray-300" />
                                                </Link>
                                                <Link
                                                    to={`/admin/clientes/editar/${cliente._id}`}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                >
                                                    <Edit className="h-4 w-4 text-slate-600 dark:text-gray-300" />
                                                </Link>
                                                <button
                                                    onClick={() => handleEliminar(cliente._id, `${cliente.nombre} ${cliente.apellido}`)}
                                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                                </button>
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
