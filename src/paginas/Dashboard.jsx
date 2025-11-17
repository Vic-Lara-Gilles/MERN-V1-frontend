import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import usePacientes from "../hooks/usePacientes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PawPrint, Users, Calendar, TrendingUp, Activity, UserCog, KeyRound, ArrowRight } from "lucide-react"

const Dashboard = () => {
    const { auth } = useAuth()
    const { pacientes } = usePacientes()

    // Estadísticas básicas
    const totalPacientes = pacientes.length
    const pacientesRecientes = pacientes.slice(0, 5)
    
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
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            title: "Caninos",
            value: especiesCount['Canina'] || 0,
            description: "Pacientes caninos",
            icon: PawPrint,
            color: "text-amber-600",
            bgColor: "bg-amber-50"
        },
        {
            title: "Felinos",
            value: especiesCount['Felino'] || 0,
            description: "Pacientes felinos",
            icon: PawPrint,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            title: "Otros",
            value: (especiesCount['Ave'] || 0) + (especiesCount['Reptil'] || 0) + (especiesCount['Peces'] || 0),
            description: "Aves, reptiles y peces",
            icon: Activity,
            color: "text-green-600",
            bgColor: "bg-green-50"
        }
    ]

    const accesosRapidos = [
        {
            title: "Gestionar Pacientes",
            description: "Ver, editar y eliminar pacientes",
            icon: Users,
            href: "/admin/pacientes",
            color: "text-blue-600",
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
                    ¡Bienvenido, {auth?.nombre}! 👋
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pacientes Recientes */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">Pacientes Recientes</CardTitle>
                                <CardDescription>Últimos pacientes registrados</CardDescription>
                            </div>
                            <Button asChild variant="outline" size="sm">
                                <Link to="/admin/pacientes" className="gap-2">
                                    Ver todos
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {pacientesRecientes.length > 0 ? (
                            <div className="space-y-3">
                                {pacientesRecientes.map((paciente) => (
                                    <div 
                                        key={paciente._id}
                                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <PawPrint className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{paciente.nombre}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {paciente.especie} • {paciente.propietario}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant="outline">{paciente.raza}</Badge>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <PawPrint className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>No hay pacientes registrados</p>
                                <Button asChild className="mt-4" size="sm">
                                    <Link to="/admin/pacientes">Agregar primer paciente</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Accesos Rápidos */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Accesos Rápidos</CardTitle>
                        <CardDescription>Funciones principales</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {accesosRapidos.map((acceso, index) => {
                                const Icon = acceso.icon
                                return (
                                    <Button
                                        key={index}
                                        asChild
                                        variant="outline"
                                        className="w-full justify-start h-auto py-3"
                                    >
                                        <Link to={acceso.href}>
                                            <div className="flex items-start gap-3 w-full">
                                                <div className={`h-10 w-10 rounded-lg ${acceso.bgColor} flex items-center justify-center shrink-0`}>
                                                    <Icon className={`h-5 w-5 ${acceso.color}`} />
                                                </div>
                                                <div className="text-left flex-1">
                                                    <p className="font-semibold text-sm">{acceso.title}</p>
                                                    <p className="text-xs text-muted-foreground">{acceso.description}</p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-2" />
                                            </div>
                                        </Link>
                                    </Button>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

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
