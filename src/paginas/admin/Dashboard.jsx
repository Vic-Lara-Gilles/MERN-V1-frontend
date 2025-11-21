import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import usePacientes from "../../hooks/usePacientes"
import useClientes from "../../hooks/useClientes"
import useCitas from "../../hooks/useCitas"
import useDashboard from "../../hooks/useDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import EstadisticaCard from "../../components/EstadisticaCard"
import CitaCard from "../../components/CitaCard"
import Header from "@/components/Header"

const Dashboard = () => {
    const { auth } = useAuth()
    const { pacientes } = usePacientes()
    const { clientes } = useClientes()
    const { citas } = useCitas()

    const {
        vistaActiva,
        setVistaActiva,
        citasHoy,
        citasSemana,
        citasMes,
        citasEnriquecidas,
        estadisticasConfig
    } = useDashboard(pacientes, clientes, citas)

    return (
        <div className="p-6 space-y-8">
            <Header />

            {/* Estadísticas */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {estadisticasConfig.map((config, index) => (
                    <EstadisticaCard key={index} {...config} />
                ))}
            </div>

            {/* Citas de Hoy */}
            <Card className="border-slate-200 dark:border-gray-700 dark:bg-gray-800">
                <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white text-xl">
                                <Calendar className="h-5 w-5" />
                                Agenda de Citas
                            </CardTitle>
                            <CardDescription className="mt-2 dark:text-slate-300">
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
                    </div>

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
                </CardHeader>
                <CardContent className="p-6 bg-white dark:bg-gray-800">{citasEnriquecidas.length > 0 ? (
                    <div className="space-y-3">
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
                        <Link to="/admin/citas/nueva" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium">
                            <Calendar className="h-4 w-4" />
                            Agendar Nueva Cita
                        </Link>
                    </div>
                )}
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard
