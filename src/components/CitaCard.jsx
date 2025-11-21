import { Link } from 'react-router-dom'
import { Badge } from "@/components/ui/badge"
import { Clock, User, Phone, PawPrint } from 'lucide-react'

const CitaCard = ({ cita, paciente, cliente }) => {
    const estadoColors = {
        'Pendiente': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
        'Confirmada': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700',
        'En curso': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700',
        'Completada': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700',
        'Cancelada': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700',
        'No asistió': 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700'
    }

    return (
        <div className="rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow p-4">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Hora y Estado */}
                <div className="flex lg:flex-col items-center lg:items-start gap-3 lg:w-24">
                    <div className="text-center lg:text-left">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-muted-foreground dark:text-slate-400" />
                        </div>
                        <p className="font-bold text-xl text-slate-900 dark:text-white">{cita.hora}</p>
                    </div>
                    <Badge className={`${estadoColors[cita.estado] || 'bg-gray-100'} text-xs font-medium px-2 py-1`}>
                        {cita.estado}
                    </Badge>
                </div>

                {/* Cliente y Paciente */}
                <div className="flex-1 grid lg:grid-cols-2 gap-4">
                    {/* Cliente */}
                    <div>
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-muted-foreground dark:text-slate-300 uppercase mb-1">Cliente</p>
                                <Link
                                    to={`/admin/clientes/${cliente?._id}`}
                                    className="block font-semibold text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                                >
                                    {cliente?.nombre} {cliente?.apellido}
                                </Link>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground dark:text-slate-300 mt-1">
                                    <Phone className="h-3 w-3" />
                                    <span>{cliente?.telefono}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Paciente */}
                    {paciente ? (
                        <Link
                            to={`/admin/pacientes/${paciente._id}`}
                            className="hover:bg-slate-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors p-2 -m-2"
                        >
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                                    <PawPrint className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-muted-foreground dark:text-slate-300 uppercase mb-1">Paciente</p>
                                    <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{paciente.nombre}</p>
                                    <div className="text-xs text-muted-foreground dark:text-slate-300 mt-1">
                                        <span className="font-medium">{paciente.especie}</span>
                                        {paciente.raza && <span> • {paciente.raza}</span>}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex items-center justify-center bg-slate-50 dark:bg-gray-900 rounded-lg border border-dashed border-slate-300 dark:border-gray-600 p-4">
                            <p className="text-sm text-muted-foreground dark:text-slate-400">Sin paciente</p>
                        </div>
                    )}
                </div>

                {/* Motivo */}
                <div className="lg:w-56">
                    <p className="text-xs font-medium text-muted-foreground dark:text-slate-300 uppercase mb-2">Motivo</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">{cita.motivo}</p>
                </div>
            </div>
        </div>
    )
}

export default CitaCard
