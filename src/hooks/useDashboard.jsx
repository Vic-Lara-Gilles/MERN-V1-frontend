import { useState, useMemo } from 'react'
import { PawPrint, Users, Calendar, Activity } from 'lucide-react'

const useDashboard = (pacientes, clientes, citas) => {
    const [vistaActiva, setVistaActiva] = useState('hoy')

    // Estadísticas básicas
    const totalPacientes = pacientes.length
    const totalClientes = clientes.length

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

    // Configuración de colores para las tarjetas de estadísticas
    const estadisticasConfig = useMemo(() => [
        {
            titulo: "Total Pacientes",
            valor: totalPacientes,
            descripcion: "Registrados en el sistema",
            Icon: PawPrint,
            colorClasses: {
                iconBg: "bg-orange-50 dark:bg-orange-900/30",
                icon: "text-orange-600 dark:text-orange-400"
            }
        },
        {
            titulo: "Total Clientes",
            valor: totalClientes,
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
    ], [totalPacientes, totalClientes, citasHoy.length, citas.length])

    return {
        vistaActiva,
        setVistaActiva,
        citasHoy,
        citasSemana,
        citasMes,
        citasEnriquecidas,
        estadisticasConfig
    }
}

export default useDashboard
