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
    
    // Calcular pacientes por especie
    const especiesCount = pacientes.reduce((acc, paciente) => {
        acc[paciente.especie] = (acc[paciente.especie] || 0) + 1
        return acc
    }, {})

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
        <div className="space-y-8">
            {/* Header de bienvenida */}
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    ¡Bienvenido, {auth?.nombre}!
                </h1>
                <p className="text-muted-foreground text-lg">
                    Panel de control de tu clínica veterinaria
                </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {estadisticas.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                                    <Icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Citas de Hoy */}
            <Card className="shadow-xl border-2">
                <CardHeader className="bg-linear-to-r from-blue-50 to-indigo-50 border-b">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-white" />
                                </div>
                                Citas de Hoy
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                {citasHoy.length > 0 
                                    ? `${citasHoy.length} ${citasHoy.length === 1 ? 'cita programada' : 'citas programadas'} para hoy` 
                                    : 'No hay citas programadas para hoy'}
                            </CardDescription>
                        </div>
                        <Button asChild size="lg" className="gap-2">
                            <Link to="/admin/citas">
                                Ver todas las citas
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {citasHoy.length > 0 ? (
                        <div className="space-y-4">
                            {citasHoy.map((cita) => {
                                const paciente = pacientes.find(p => p._id === cita.paciente?._id || p._id === cita.paciente)
                                const cliente = clientes.find(c => c._id === cita.cliente?._id || c._id === cita.cliente)
                                
                                const estadoColors = {
                                    'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
                                    'Confirmada': 'bg-blue-100 text-gray-900 border-blue-200',
                                    'En curso': 'bg-purple-100 text-purple-800 border-purple-200',
                                    'Completada': 'bg-green-100 text-green-800 border-green-200',
                                    'Cancelada': 'bg-red-100 text-red-800 border-red-200',
                                    'No asistió': 'bg-gray-100 text-gray-800 border-gray-200'
                                }

                                const tipoColors = {
                                    'Consulta': 'bg-blue-50 text-gray-900 border-blue-200',
                                    'Vacunación': 'bg-green-50 text-green-700 border-green-200',
                                    'Cirugía': 'bg-red-50 text-red-700 border-red-200',
                                    'Emergencia': 'bg-orange-50 text-orange-700 border-orange-200',
                                    'Control': 'bg-purple-50 text-purple-700 border-purple-200',
                                    'Otro': 'bg-gray-50 text-gray-700 border-gray-200'
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
                                        className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white hover:border-gray-200 hover:shadow-2xl transition-all duration-300"
                                    >
                                        <div className="flex flex-col lg:flex-row gap-6 p-6">
                                            {/* Columna Izquierda - Hora y Estado */}
                                            <div className="lg:w-48 shrink-0 border-r-2 border-gray-200 pr-6">
                                                <div className="flex flex-col items-center text-center space-y-4">
                                                    {/* Hora Grande */}
                                                    <div className="w-full">
                                                        <div className="flex items-center justify-center gap-2 mb-2">
                                                            <Clock className="h-5 w-5 text-gray-900" />
                                                            <span className="text-xs font-semibold text-muted-foreground uppercase">Hora</span>
                                                        </div>
                                                        <p className="font-bold text-5xl text-gray-900 tracking-tight">{cita.hora}</p>
                                                    </div>
                                                    
                                                    {/* Separador */}
                                                    <div className="w-full h-px bg-gray-200"></div>
                                                    
                                                    {/* Tipo y Estado */}
                                                    <div className="w-full space-y-2">
                                                        <Badge className={`${tipoColors[cita.tipo] || 'bg-gray-100'} border w-full justify-center py-1.5`}>
                                                            {cita.tipo}
                                                        </Badge>
                                                        <Badge className={`${estadoColors[cita.estado] || 'bg-gray-100'} border w-full justify-center py-1.5`}>
                                                            {cita.estado}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Columna Central - Cliente */}
                                            <div className="lg:w-1/3 space-y-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="relative">
                                                        <div className="h-16 w-16 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg ring-4 ring-green-100">
                                                            <User className="h-8 w-8 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase">Cliente</p>
                                                        <Link 
                                                            to={`/admin/clientes/${cliente?._id}`}
                                                            className="block font-bold text-xl text-gray-900 hover:text-gray-900 transition-colors truncate"
                                                        >
                                                            {cliente?.nombre} {cliente?.apellido}
                                                        </Link>
                                                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                                            <Phone className="h-3.5 w-3.5" />
                                                            <span className="font-medium">{cliente?.telefono}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Información adicional del cliente */}
                                                <div className="space-y-2 bg-gray-50/80 backdrop-blur rounded-lg p-4 border border-gray-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                                                            <Mail className="h-4 w-4 text-emerald-600" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs text-muted-foreground font-medium">Email</p>
                                                            <p className="font-semibold text-sm text-gray-900 truncate">{cliente?.email}</p>
                                                        </div>
                                                    </div>
                                                    {cliente?.direccion && (
                                                        <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
                                                            <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                                                <svg className="h-4 w-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs text-muted-foreground font-medium">Dirección</p>
                                                                <p className="font-semibold text-sm text-gray-900 line-clamp-2">{cliente.direccion}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Columna Derecha - Mascota y Motivo */}
                                            <div className="lg:w-1/3 lg:border-l-2 lg:border-gray-200 lg:pl-6">
                                                {paciente ? (
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className={`h-8 w-8 rounded-lg ${colorEspecie.icon} flex items-center justify-center`}>
                                                                <PawPrint className={`h-4 w-4 ${colorEspecie.text}`} />
                                                            </div>
                                                            <h3 className={`font-bold text-base ${colorEspecie.text} uppercase tracking-wide`}>Paciente</h3>
                                                        </div>
                                                        
                                                        <Link
                                                            to={`/admin/pacientes/${paciente._id}`}
                                                            className={`block group/card relative overflow-hidden rounded-lg ${colorEspecie.bg} backdrop-blur-sm border-2 ${colorEspecie.border} ${colorEspecie.hover} hover:shadow-2xl transition-all duration-300 p-4`}
                                                        >
                                                            <div className="relative z-10">
                                                                <div className="flex items-center justify-between mb-3">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className={`h-12 w-12 rounded-full ${colorEspecie.icon} backdrop-blur flex items-center justify-center shadow-md`}>
                                                                            <PawPrint className={`h-6 w-6 ${colorEspecie.text}`} />
                                                                        </div>
                                                                        <div>
                                                                            <p className={`font-bold text-xl ${colorEspecie.text}`}>{paciente.nombre}</p>
                                                                            <p className="text-sm text-gray-600 font-medium">{paciente.especie}</p>
                                                                        </div>
                                                                    </div>
                                                                    <ArrowRight className={`h-5 w-5 ${colorEspecie.text} opacity-60 group-hover/card:translate-x-1 transition-transform`} />
                                                                </div>
                                                                
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    {paciente.raza && (
                                                                        <Badge variant="secondary" className={`text-xs ${colorEspecie.badge} backdrop-blur border-0`}>
                                                                            {paciente.raza}
                                                                        </Badge>
                                                                    )}
                                                                    {paciente.sexo && (
                                                                        <Badge variant="secondary" className={`text-xs ${colorEspecie.badge} backdrop-blur border-0`}>
                                                                            {paciente.sexo}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Link>

                                                        {/* Motivo de la cita */}
                                                        <div className="bg-gray-50/80 backdrop-blur rounded-lg p-4 border-2 border-gray-200">
                                                            <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase">Motivo</p>
                                                            <p className="text-sm text-gray-700 font-medium leading-relaxed">{cita.motivo}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center h-full min-h-[200px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                                        <div className="text-center">
                                                            <PawPrint className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                                                            <p className="text-sm text-muted-foreground font-medium">Sin mascota asignada</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mb-4">
                                <Calendar className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay citas para hoy</h3>
                            <p className="text-muted-foreground mb-6">Comienza agendando la primera cita del día</p>
                            <Button asChild size="lg">
                                <Link to="/admin/citas/nueva" className="gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Agendar Nueva Cita
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Distribución por Especie */}
            {totalPacientes > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Distribución por Especie</CardTitle>
                        <CardDescription>Resumen de pacientes por tipo</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {Object.entries(especiesCount).map(([especie, count]) => {
                                const percentage = ((count / totalPacientes) * 100).toFixed(1)
                                return (
                                    <div key={especie} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{especie}</span>
                                            <span className="text-muted-foreground">{count} ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div 
                                                className="bg-primary h-2 rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default Dashboard
