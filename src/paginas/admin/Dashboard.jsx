import { Link } from "react-router-dom"
import { useMemo } from "react"
import { LayoutDashboard, Calendar, PawPrint, Users, Activity } from "lucide-react"
import useAuth from "../../hooks/useAuth"
import usePacientes from "../../hooks/usePacientes"
import useClientes from "../../hooks/useClientes"
import useCitas from "../../hooks/useCitas"
import useDashboard from "../../hooks/useDashboard"
import EstadisticaCard from "../../components/EstadisticaCard"
import CitaCard from "../../components/CitaCard"
import Header from "@/components/Header"

const Dashboard = () => {
    const { auth } = useAuth()
    const { pacientes } = usePacientes()
    const { clientes } = useClientes()
    const { citas } = useCitas()
    const { vistaActiva, setVistaActiva } = useDashboard()

    // Calcular citas del día ordenadas por fecha y hora completa
    const citasHoy = useMemo(() => {
        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        return citas
            .filter(cita => {
                const fechaCita = new Date(cita.fecha)
                fechaCita.setHours(0, 0, 0, 0)
                return fechaCita.getTime() === hoy.getTime()
            })
            .sort((a, b) => {
                const fechaA = new Date(a.fecha)
                const fechaB = new Date(b.fecha)
                const [horaA, minA] = a.hora.split(':').map(Number)
                const [horaB, minB] = b.hora.split(':').map(Number)
                fechaA.setHours(horaA, minA, 0, 0)
                fechaB.setHours(horaB, minB, 0, 0)
                return fechaA.getTime() - fechaB.getTime()
            })
    }, [citas])

    // Calcular citas de la semana
    const citasSemana = useMemo(() => {
        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)
        
        const inicioDeSemana = new Date(hoy)
        inicioDeSemana.setDate(hoy.getDate() - hoy.getDay())
        const finDeSemana = new Date(inicioDeSemana)
        finDeSemana.setDate(inicioDeSemana.getDate() + 6)

        return citas
            .filter(cita => {
                const fechaCita = new Date(cita.fecha)
                fechaCita.setHours(0, 0, 0, 0)
                return fechaCita >= inicioDeSemana && fechaCita <= finDeSemana
            })
            .sort((a, b) => {
                const fechaA = new Date(a.fecha)
                const fechaB = new Date(b.fecha)
                const [horaA, minA] = (a.hora || '00:00').split(':').map(Number)
                const [horaB, minB] = (b.hora || '00:00').split(':').map(Number)
                fechaA.setHours(horaA, minA, 0, 0)
                fechaB.setHours(horaB, minB, 0, 0)
                return fechaA.getTime() - fechaB.getTime()
            })
    }, [citas])

    // Calcular citas del mes
    const citasMes = useMemo(() => {
        const hoy = new Date()
        const inicioDelMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1)
        const finDelMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0)

        return citas
            .filter(cita => {
                const fechaCita = new Date(cita.fecha)
                fechaCita.setHours(0, 0, 0, 0)
                return fechaCita >= inicioDelMes && fechaCita <= finDelMes
            })
            .sort((a, b) => {
                const fechaA = new Date(a.fecha)
                const fechaB = new Date(b.fecha)
                const [horaA, minA] = (a.hora || '00:00').split(':').map(Number)
                const [horaB, minB] = (b.hora || '00:00').split(':').map(Number)
                fechaA.setHours(horaA, minA, 0, 0)
                fechaB.setHours(horaB, minB, 0, 0)
                return fechaA.getTime() - fechaB.getTime()
            })
    }, [citas])

    // Seleccionar las citas según la vista activa
    const citasMostradas = vistaActiva === 'hoy' ? citasHoy : vistaActiva === 'semana' ? citasSemana : citasMes

    // Enriquecer citas con datos de paciente y cliente
    const citasEnriquecidas = useMemo(() => {
        return citasMostradas.map(cita => ({
            ...cita,
            pacienteData: pacientes.find(p => p._id === cita.paciente?._id || p._id === cita.paciente),
            clienteData: clientes.find(c => c._id === cita.cliente?._id || c._id === cita.cliente)
        }))
    }, [citasMostradas, pacientes, clientes])

    // Configuración de las tarjetas de estadísticas (UI)
    const estadisticasConfig = [
        {
            titulo: "Total Pacientes",
            valor: pacientes.length,
            descripcion: "Registrados en el sistema",
            Icon: PawPrint,
            colorClasses: {
                iconBg: "bg-orange-50 dark:bg-orange-900/30",
                icon: "text-orange-600 dark:text-orange-400"
            }
        },
        {
            titulo: "Total Clientes",
            valor: clientes.length,
            descripcion: "Propietarios registrados",
            Icon: Users,
            colorClasses: {
                iconBg: "bg-blue-50 dark:bg-blue-900/30",
                icon: "text-blue-600 dark:text-blue-400"
            }
        },
        {
            titulo: "Citas Hoy",
            valor: citasHoy.length,
            descripcion: "Agendadas para hoy",
            Icon: Calendar,
            colorClasses: {
                iconBg: "bg-purple-50 dark:bg-purple-900/30",
                icon: "text-purple-600 dark:text-purple-400"
            }
        },
        {
            titulo: "Total Citas",
            valor: citas.length,
            descripcion: "En el sistema",
            Icon: Activity,
            colorClasses: {
                iconBg: "bg-green-50 dark:bg-green-900/30",
                icon: "text-green-600 dark:text-green-400"
            }
        }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <Header
                icon={<LayoutDashboard className="h-8 w-8 text-slate-900 dark:text-lime-500" />}
                title={`Bienvenido${auth.nombre ? `, ${auth.nombre}` : ''}`}
                subtitle="Panel de control y resumen de actividades"
            />

            {/* Estadísticas */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {estadisticasConfig.map((config, index) => (
                    <EstadisticaCard key={index} {...config} />
                ))}
            </div>

            {/* Citas de Hoy */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-slate-900 dark:text-lime-500" />
                    Agenda de Citas
                </h2>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {vistaActiva === 'hoy' && (citasHoy.length > 0
                                    ? `${citasHoy.length} ${citasHoy.length === 1 ? 'cita programada' : 'citas programadas'} para hoy`
                                    : 'No hay citas programadas para hoy')}
                                {vistaActiva === 'semana' && (citasSemana.length > 0
                                    ? `${citasSemana.length} ${citasSemana.length === 1 ? 'cita' : 'citas'} esta semana`
                                    : 'No hay citas esta semana')}
                                {vistaActiva === 'mes' && (citasMes.length > 0
                                    ? `${citasMes.length} ${citasMes.length === 1 ? 'cita' : 'citas'} este mes`
                                    : 'No hay citas este mes')}
                            </p>
                            
                            {/* Pestañas de navegación */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setVistaActiva('hoy')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        vistaActiva === 'hoy'
                                            ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                                            : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-600'
                                        }`}
                                >
                                    Hoy
                                </button>
                                <button
                                    onClick={() => setVistaActiva('semana')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        vistaActiva === 'semana'
                                            ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                                            : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-600'
                                        }`}
                                >
                                    Esta Semana
                                </button>
                                <button
                                    onClick={() => setVistaActiva('mes')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        vistaActiva === 'mes'
                                            ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                                            : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-600'
                                        }`}
                                >
                                    Este Mes
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {citasEnriquecidas.length > 0 ? (
                        <div className="p-6 space-y-3">
                            {citasEnriquecidas.map((cita) => (
                                <CitaCard
                                    key={cita._id}
                                    cita={cita}
                                    paciente={cita.pacienteData}
                                    cliente={cita.clienteData}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-slate-100 dark:bg-gray-700 mb-4">
                                <Calendar className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                {vistaActiva === 'hoy' && 'No hay citas para hoy'}
                                {vistaActiva === 'semana' && 'No hay citas esta semana'}
                                {vistaActiva === 'mes' && 'No hay citas este mes'}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                {vistaActiva === 'hoy' && 'Comienza agendando la primera cita del día'}
                                {vistaActiva === 'semana' && 'No tienes citas programadas para esta semana'}
                                {vistaActiva === 'mes' && 'No tienes citas programadas para este mes'}
                            </p>
                            <Link to="/admin/citas/nueva" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium">
                                <Calendar className="h-4 w-4" />
                                Agendar Nueva Cita
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
