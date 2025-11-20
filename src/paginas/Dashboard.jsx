import { Link } from "react-router-dom"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import usePacientes from "../hooks/usePacientes"
import useClientes from "../hooks/useClientes"
import useCitas from "../hooks/useCitas"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PawPrint, Users, Calendar, TrendingUp, Activity, UserCog, KeyRound, ArrowRight, Clock, User, Phone, Mail, Heart, Cake, Weight, Syringe } from "lucide-react"

const Dashboard = () => {
    const { auth } = useAuth()
    const { pacientes } = usePacientes()
    const { clientes } = useClientes()
    const { citas } = useCitas()
    const [vistaActiva, setVistaActiva] = useState('hoy') // 'hoy', 'semana', 'mes'

    // Estadísticas básicas
    const totalPacientes = pacientes.length
    const totalClientes = clientes.length
    const pacientesRecientes = pacientes.slice(0, 5)
    
    // Calcular citas del día ordenadas por fecha y hora completa
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const citasHoy = citas
        .filter(cita => {
            const fechaCita = new Date(cita.fecha)
            fechaCita.setHours(0, 0, 0, 0)
            return fechaCita.getTime() === hoy.getTime()
        })
        .sort((a, b) => {
            // Ordenar por fecha y hora completa
            const fechaA = new Date(a.fecha)
            const fechaB = new Date(b.fecha)
            const [horaA, minA] = a.hora.split(':').map(Number)
            const [horaB, minB] = b.hora.split(':').map(Number)
            fechaA.setHours(horaA, minA, 0, 0)
            fechaB.setHours(horaB, minB, 0, 0)
            return fechaA.getTime() - fechaB.getTime()
        })
    
    // Calcular citas de la semana
    const inicioDeSemana = new Date(hoy)
    inicioDeSemana.setDate(hoy.getDate() - hoy.getDay()) // Domingo
    const finDeSemana = new Date(inicioDeSemana)
    finDeSemana.setDate(inicioDeSemana.getDate() + 6) // Sábado
    
    const citasSemana = citas
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
    
    // Calcular citas del mes
    const inicioDelMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1)
    const finDelMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0)
    
    const citasMes = citas
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
    
    // Seleccionar las citas según la vista activa
    const citasMostradas = vistaActiva === 'hoy' ? citasHoy : vistaActiva === 'semana' ? citasSemana : citasMes
    
    // Todas las citas ordenadas por fecha y hora completa (año, mes, día, hora)
    const todasCitasOrdenadas = citas
        .sort((a, b) => {
            const fechaA = new Date(a.fecha)
            const fechaB = new Date(b.fecha)
            const [horaA, minA] = (a.hora || '00:00').split(':').map(Number)
            const [horaB, minB] = (b.hora || '00:00').split(':').map(Number)
            fechaA.setHours(horaA, minA, 0, 0)
            fechaB.setHours(horaB, minB, 0, 0)
            return fechaA.getTime() - fechaB.getTime()
        })

    const estadisticas = [
        {
            title: "Total Pacientes",
            value: totalPacientes,
            description: "Registrados en el sistema",
            icon: PawPrint,
            color: "text-gray-900",
            bgColor: "bg-blue-50"
        },
        {
            title: "Total Clientes",
            value: totalClientes,
            description: "Dueños registrados",
            icon: Users,
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            title: "Citas Hoy",
            value: citasHoy.length,
            description: "Agendadas para hoy",
            icon: Calendar,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            title: "Total Citas",
            value: citas.length,
            description: "En el sistema",
            icon: Activity,
            color: "text-amber-600",
            bgColor: "bg-amber-50"
        }
    ]

    const accesosRapidos = [
        {
            title: "Gestionar Pacientes",
            description: "Ver, editar y eliminar pacientes",
            icon: Users,
            href: "/admin/pacientes",
            color: "text-gray-900",
            bgColor: "bg-blue-50"
        },
        {
            title: "Mi Perfil",
            description: "Actualiza tu información personal",
            icon: UserCog,
            href: "/admin/perfil",
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            title: "Cambiar Contraseña",
            description: "Modifica tu contraseña de acceso",
            icon: KeyRound,
            href: "/admin/cambiar-password",
            color: "text-amber-600",
            bgColor: "bg-amber-50"
        }
    ]

    return (
        <div className="p-6 space-y-6">
            {/* Header de bienvenida */}
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    ¡Bienvenido, {auth?.nombre}!
                </h1>
                <p className="text-muted-foreground dark:text-slate-300 text-lg">
                    Panel de control de tu clínica veterinaria
                </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {estadisticas.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200 dark:border-gray-700 dark:bg-gray-800">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground dark:text-slate-300">
                                    {stat.title}
                                </CardTitle>
                                <div className={`h-10 w-10 rounded-lg ${stat.bgColor} dark:bg-opacity-30 flex items-center justify-center`}>
                                    <Icon className={`h-5 w-5 ${stat.color} dark:opacity-90`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold dark:text-white">{stat.value}</div>
                                <p className="text-xs text-muted-foreground dark:text-slate-300 mt-1">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Citas de Hoy */}
            <Card className="shadow-md border-slate-200 dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="bg-slate-50 dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle className="text-2xl flex items-center gap-3 text-slate-900 dark:text-white">
                                <div className="h-10 w-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-white" />
                                </div>
                                Agenda de Citas
                            </CardTitle>
                            <CardDescription className="text-base mt-2 dark:text-slate-300">
                                {vistaActiva === 'hoy' && (citasHoy.length > 0 
                                    ? `${citasHoy.length} ${citasHoy.length === 1 ? 'cita programada' : 'citas programadas'} para hoy` 
                                    : 'No hay citas programadas para hoy')}
                                {vistaActiva === 'semana' && (citasSemana.length > 0 
                                    ? `${citasSemana.length} ${citasSemana.length === 1 ? 'cita' : 'citas'} esta semana` 
                                    : 'No hay citas esta semana')}
                                {vistaActiva === 'mes' && (citasMes.length > 0 
                                    ? `${citasMes.length} ${citasMes.length === 1 ? 'cita' : 'citas'} este mes` 
                                    : 'No hay citas este mes')}
                            </CardDescription>
                        </div>
                        <Button asChild size="lg" className="gap-2 bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700">
                            <Link to="/admin/citas">
                                Ver todas las citas
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    
                    {/* Pestañas de navegación */}
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => setVistaActiva('hoy')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                vistaActiva === 'hoy'
                                    ? 'bg-blue-600 dark:bg-lime-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-600'
                            }`}
                        >
                            Hoy
                        </button>
                        <button
                            onClick={() => setVistaActiva('semana')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                vistaActiva === 'semana'
                                    ? 'bg-blue-600 dark:bg-lime-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-600'
                            }`}
                        >
                            Esta Semana
                        </button>
                        <button
                            onClick={() => setVistaActiva('mes')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                vistaActiva === 'mes'
                                    ? 'bg-blue-600 dark:bg-lime-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-600'
                            }`}
                        >
                            Este Mes
                        </button>
                    </div>
                </CardHeader>
                <CardContent className="p-6 bg-white dark:bg-gray-800">{citasMostradas.length > 0 ? (
                        <div className="space-y-3">{citasMostradas.map((cita) => {
                                const paciente = pacientes.find(p => p._id === cita.paciente?._id || p._id === cita.paciente)
                                const cliente = clientes.find(c => c._id === cita.cliente?._id || c._id === cita.cliente)
                                
                                const estadoColors = {
                                    'Pendiente': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700',
                                    'Confirmada': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-700',
                                    'En curso': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 border-purple-200 dark:border-purple-700',
                                    'Completada': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-700',
                                    'Cancelada': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-700',
                                    'No asistió': 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                                }

                                const tipoColors = {
                                    'Consulta': 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-700',
                                    'Vacunación': 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700',
                                    'Cirugía': 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700',
                                    'Emergencia': 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700',
                                    'Control': 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700',
                                    'Otro': 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                                }

                                // Colores por especie para la tarjeta del paciente
                                const especieColors = {
                                    'Perro': {
                                        bg: 'bg-amber-500/10',
                                        border: 'border-amber-400/30',
                                        hover: 'hover:border-amber-500',
                                        text: 'text-amber-700',
                                        badge: 'bg-amber-500/20 text-amber-900',
                                        icon: 'bg-amber-500/20'
                                    },
                                    'Gato': {
                                        bg: 'bg-purple-500/10',
                                        border: 'border-purple-400/30',
                                        hover: 'hover:border-purple-500',
                                        text: 'text-purple-700',
                                        badge: 'bg-purple-500/20 text-purple-900',
                                        icon: 'bg-purple-500/20'
                                    },
                                    'Ave': {
                                        bg: 'bg-sky-500/10',
                                        border: 'border-sky-400/30',
                                        hover: 'hover:border-sky-500',
                                        text: 'text-sky-700',
                                        badge: 'bg-sky-500/20 text-sky-900',
                                        icon: 'bg-sky-500/20'
                                    },
                                    'Conejo': {
                                        bg: 'bg-pink-500/10',
                                        border: 'border-pink-400/30',
                                        hover: 'hover:border-pink-500',
                                        text: 'text-pink-700',
                                        badge: 'bg-pink-500/20 text-pink-900',
                                        icon: 'bg-pink-500/20'
                                    },
                                    'Reptil': {
                                        bg: 'bg-emerald-500/10',
                                        border: 'border-emerald-400/30',
                                        hover: 'hover:border-emerald-500',
                                        text: 'text-emerald-700',
                                        badge: 'bg-emerald-500/20 text-emerald-900',
                                        icon: 'bg-emerald-500/20'
                                    },
                                    'Otro': {
                                        bg: 'bg-slate-500/10',
                                        border: 'border-slate-400/30',
                                        hover: 'hover:border-slate-500',
                                        text: 'text-slate-700',
                                        badge: 'bg-slate-500/20 text-slate-900',
                                        icon: 'bg-slate-500/20'
                                    }
                                }

                                const colorEspecie = especieColors[paciente?.especie] || especieColors['Otro']

                                return (
                                    <div 
                                        key={cita._id}
                                        className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-slate-300 dark:hover:border-gray-600 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex flex-col lg:flex-row gap-4 p-4">
                                            {/* Columna Izquierda - Hora y Estado */}
                                            <div className="lg:w-32 shrink-0 lg:border-r border-slate-200 dark:border-gray-700 lg:pr-4">
                                                <div className="flex lg:flex-col items-center lg:items-center gap-3 lg:gap-2">
                                                    {/* Hora */}
                                                    <div className="flex items-center gap-2 lg:flex-col lg:gap-1">
                                                        <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400 lg:hidden" />
                                                        <p className="font-bold text-2xl lg:text-3xl text-slate-900 dark:text-white">{cita.hora}</p>
                                                    </div>
                                                    
                                                    {/* Estado */}
                                                    <Badge className={`${estadoColors[cita.estado] || 'bg-gray-100 dark:bg-gray-900/30'} text-xs px-2 py-1`}>
                                                        {cita.estado}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Columna Central - Cliente y Paciente */}
                                            <div className="flex-1 grid lg:grid-cols-2 gap-4">
                                                {/* Cliente */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                                            <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs text-muted-foreground dark:text-slate-400 uppercase">Cliente</p>
                                                            <Link 
                                                                to={`/admin/clientes/${cliente?._id}`}
                                                                className="block font-semibold text-sm text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-200 transition-colors truncate"
                                                            >
                                                                {cliente?.nombre} {cliente?.apellido}
                                                            </Link>
                                                            <div className="flex items-center gap-1 text-xs text-muted-foreground dark:text-slate-400">
                                                                <Phone className="h-3 w-3" />
                                                                <span>{cliente?.telefono}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Paciente */}
                                                {paciente ? (
                                                    <div className="space-y-2">
                                                        <Link
                                                            to={`/admin/pacientes/${paciente._id}`}
                                                            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                                                        >
                                                            <div className={`h-10 w-10 rounded-full ${colorEspecie.icon} flex items-center justify-center shrink-0`}>
                                                                <PawPrint className={`h-5 w-5 ${colorEspecie.text}`} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs text-muted-foreground dark:text-slate-400 uppercase">Paciente</p>
                                                                <p className={`font-semibold text-sm ${colorEspecie.text} truncate`}>{paciente.nombre}</p>
                                                                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                                    <span>{paciente.especie}</span>
                                                                    {paciente.raza && (
                                                                        <>
                                                                            <span>•</span>
                                                                            <span>{paciente.raza}</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center bg-slate-50 dark:bg-gray-800 rounded-lg border border-dashed border-slate-300 dark:border-gray-600 p-3">
                                                        <p className="text-xs text-muted-foreground dark:text-slate-400">Sin paciente asignado</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Columna Derecha - Motivo */}
                                            <div className="lg:w-64 lg:border-l border-slate-200 dark:border-gray-700 lg:pl-4">
                                                <div className="bg-slate-50 dark:bg-gray-800 rounded-lg p-3 border border-slate-200 dark:border-gray-700">
                                                    <p className="text-xs text-muted-foreground dark:text-slate-400 font-medium mb-1 uppercase">Motivo</p>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{cita.motivo}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-slate-100 dark:bg-gray-700 mb-4">
                                <Calendar className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                {vistaActiva === 'hoy' && 'No hay citas para hoy'}
                                {vistaActiva === 'semana' && 'No hay citas esta semana'}
                                {vistaActiva === 'mes' && 'No hay citas este mes'}
                            </h3>
                            <p className="text-muted-foreground dark:text-slate-300 mb-6">
                                {vistaActiva === 'hoy' && 'Comienza agendando la primera cita del día'}
                                {vistaActiva === 'semana' && 'No tienes citas programadas para esta semana'}
                                {vistaActiva === 'mes' && 'No tienes citas programadas para este mes'}
                            </p>
                            <Button asChild size="lg" className="bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700">
                                <Link to="/admin/citas/nueva" className="gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Agendar Nueva Cita
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard
