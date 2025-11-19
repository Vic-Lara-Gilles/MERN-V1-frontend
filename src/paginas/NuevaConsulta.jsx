import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useConsultas from '../hooks/useConsultas'
import usePacientes from '../hooks/usePacientes'
import useCitas from '../hooks/useCitas'
import useAuth from '../hooks/useAuth'
import FormularioConsultaForm from '../components/FormularioConsultaForm'

const NuevaConsulta = () => {
    const navigate = useNavigate()
    const { guardarConsulta, alerta } = useConsultas()
    const { pacientes, obtenerPacientes } = usePacientes()
    const { citas, obtenerCitas } = useCitas()
    const { auth } = useAuth()

    useEffect(() => {
        obtenerPacientes()
        obtenerCitas()
    }, [])

    const handleSubmit = async (consultaData) => {
        // Agregar veterinario y cliente
        const pacienteSeleccionado = pacientes.find(p => p._id === consultaData.paciente)
        
        const datosCompletos = {
            ...consultaData,
            veterinario: auth._id,
            cliente: pacienteSeleccionado?.propietario?._id
        }

        const resultado = await guardarConsulta(datosCompletos)

        if (resultado) {
            setTimeout(() => {
                navigate('/admin/consultas')
            }, 2000)
        }
    }

    const handleCancel = () => {
        navigate('/admin/consultas')
    }

    return (
        <div>
            <div className="mb-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancel}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Nueva Consulta Médica
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Registra información completa de la consulta veterinaria
                        </p>
                    </div>
                </div>
            </div>

            <FormularioConsultaForm 
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                alerta={alerta}
                isEditing={false}
                pacientes={pacientes}
                citas={citas}
            />
        </div>
    )
}

export default NuevaConsulta
