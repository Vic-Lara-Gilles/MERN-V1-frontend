import { useEffect, useState } from "react"
import usePacientes from "../hooks/usePacientes"
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Pacientes</h1>
                    <p className="text-muted-foreground mt-1">
                        Gestión de mascotas registradas
                    </p>
                </div>
                <Button asChild className="gap-2">
                    <Link to="/admin/pacientes/nuevo">
                        <Plus className="h-4 w-4" />
                        Nuevo Paciente
                    </Link>
                </Button>
            </div>

            {/* Buscador y Filtros */}
            <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, especie, raza, historia clínica o propietario..."
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <select
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
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

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Pacientes</p>
                            <p className="text-3xl font-bold text-slate-900">{pacientes.length}</p>
                        </div>
                        <PawPrint className="h-12 w-12 text-orange-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Caninos</p>
                            <p className="text-3xl font-bold text-slate-900">
                                {pacientes.filter(p => p.especie === 'Canino').length}
                            </p>
                        </div>
                        <PawPrint className="h-12 w-12 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Felinos</p>
                            <p className="text-3xl font-bold text-slate-900">
                                {pacientes.filter(p => p.especie === 'Felino').length}
                            </p>
                        </div>
                        <PawPrint className="h-12 w-12 text-purple-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Resultados</p>
                            <p className="text-3xl font-bold text-slate-900">{pacientesFiltrados.length}</p>
                        </div>
                        <Search className="h-12 w-12 text-green-500" />
                    </div>
                </div>
            </div>

            {/* Lista de pacientes */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {pacientesFiltrados.length === 0 ? (
                    <div className="p-12 text-center">
                        <PawPrint className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {busqueda || filtroEspecie ? "No se encontraron pacientes" : "No hay pacientes registrados"}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            {busqueda || filtroEspecie
                                ? "Intenta con otros términos de búsqueda o filtros" 
                                : "Comienza agregando tu primer paciente"}
                        </p>
                        {!busqueda && !filtroEspecie && (
                            <Button asChild>
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
                            <thead className="bg-slate-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Paciente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Historia Clínica
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Especie/Raza
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Propietario
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Información
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {pacientesFiltrados.map((paciente) => (
                                    <tr key={paciente._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                                                    <PawPrint className="h-5 w-5 text-orange-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-slate-900">
                                                        {paciente.nombre}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {paciente.sexo}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900">
                                                {paciente.numeroHistoriaClinica || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-900">{paciente.especie}</div>
                                            <div className="text-sm text-muted-foreground">{paciente.raza || 'No especificada'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-900">
                                                {paciente.propietario?.nombre} {paciente.propietario?.apellido}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {paciente.propietario?.telefono}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-900">
                                                Peso: {paciente.peso ? `${paciente.peso} kg` : 'N/A'}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {paciente.esterilizado ? '✓ Esterilizado' : ''}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link to={`/admin/pacientes/${paciente._id}`}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link to={`/admin/pacientes/editar/${paciente._id}`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEliminar(paciente._id, paciente.nombre)}
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

export default Pacientes
