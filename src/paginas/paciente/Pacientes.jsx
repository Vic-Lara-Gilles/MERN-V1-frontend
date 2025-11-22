import { useEffect, useState } from "react"
import usePacientes from "../../hooks/usePacientes"
import Header from "../../components/Header"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Eye,
    PawPrint,
    Filter
} from "lucide-react"

const Pacientes = () => {
    const { pacientes, obtenerPacientes, eliminarPaciente, cargando } = usePacientes()
    const [busqueda, setBusqueda] = useState("")
    const [filtroEspecie, setFiltroEspecie] = useState("")

    useEffect(() => {
        obtenerPacientes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEliminar = async (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar al paciente ${nombre}?`)) {
            await eliminarPaciente(id)
        }
    }

    const pacientesFiltrados = pacientes.filter(paciente => {
        const searchLower = busqueda.toLowerCase()
        const cumpleBusqueda = (
            paciente.nombre?.toLowerCase().includes(searchLower) ||
            paciente.especie?.toLowerCase().includes(searchLower) ||
            paciente.raza?.toLowerCase().includes(searchLower) ||
            paciente.numeroHistoriaClinica?.toLowerCase().includes(searchLower) ||
            paciente.propietario?.nombre?.toLowerCase().includes(searchLower) ||
            paciente.propietario?.apellido?.toLowerCase().includes(searchLower)
        )
        
        const cumpleEspecie = !filtroEspecie || paciente.especie === filtroEspecie
        
        return cumpleBusqueda && cumpleEspecie
    })

    if (cargando) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-lime-500"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Header
                icon={<PawPrint className="h-8 w-8 text-slate-900 dark:text-lime-500" />}
                title="Pacientes"
                subtitle="Gestión de mascotas registradas"
                actions={
                    <Link to="/admin/pacientes/nuevo" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-lime-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-lime-700 transition-colors text-sm font-medium">
                        <Plus className="h-4 w-4" />
                        Nuevo Paciente
                    </Link>
                }
            />

            {/* Buscador y Filtros */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-transparent dark:border-gray-700 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, especie, raza, historia clínica o propietario..."
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-gray-400" />
                        <select
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent appearance-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            value={filtroEspecie}
                            onChange={(e) => setFiltroEspecie(e.target.value)}
                        >
                            <option value="">Todas las especies</option>
                            <option value="Canino">Canino</option>
                            <option value="Felino">Felino</option>
                            <option value="Ave">Ave</option>
                            <option value="Reptil">Reptil</option>
                            <option value="Roedor">Roedor</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Lista de pacientes */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-transparent dark:border-gray-700">
                {pacientesFiltrados.length === 0 ? (
                    <div className="p-12 text-center">
                        <PawPrint className="h-16 w-16 text-muted-foreground dark:text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            {busqueda || filtroEspecie ? "No se encontraron pacientes" : "No hay pacientes registrados"}
                        </h3>
                        <p className="text-muted-foreground dark:text-slate-300 mb-6">
                            {busqueda || filtroEspecie
                                ? "Intenta con otros términos de búsqueda o filtros" 
                                : "Comienza agregando tu primer paciente"}
                        </p>
                        {!busqueda && !filtroEspecie && (
                            <Button asChild className="bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700">
                                <Link to="/admin/pacientes/nuevo">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Crear Primer Paciente
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
                                        Paciente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                        Historia Clínica
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                        Especie/Raza
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                        Propietario
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                        Información
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-gray-700">
                                {pacientesFiltrados.map((paciente) => (
                                    <tr key={paciente._id} className="hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                                    <PawPrint className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                                                        {paciente.nombre}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground dark:text-slate-300">
                                                        {paciente.sexo}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900 dark:text-slate-200">
                                                {paciente.numeroHistoriaClinica || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-900 dark:text-slate-200">{paciente.especie}</div>
                                            <div className="text-sm text-muted-foreground dark:text-slate-300">{paciente.raza || 'No especificada'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-900 dark:text-slate-200">
                                                {paciente.propietario?.nombre} {paciente.propietario?.apellido}
                                            </div>
                                            <div className="text-sm text-muted-foreground dark:text-slate-300">
                                                {paciente.propietario?.telefono}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-900 dark:text-slate-200">
                                                Peso: {paciente.peso ? `${paciente.peso} kg` : 'N/A'}
                                            </div>
                                            <div className="text-sm text-muted-foreground dark:text-slate-300">
                                                {paciente.esterilizado ? '✓ Esterilizado' : ''}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/admin/pacientes/${paciente._id}`}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                >
                                                    <Eye className="h-4 w-4 text-slate-600 dark:text-gray-300" />
                                                </Link>
                                                <Link
                                                    to={`/admin/pacientes/editar/${paciente._id}`}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                >
                                                    <Edit className="h-4 w-4 text-slate-600 dark:text-gray-300" />
                                                </Link>
                                                <button
                                                    onClick={() => handleEliminar(paciente._id, paciente.nombre)}
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

export default Pacientes
