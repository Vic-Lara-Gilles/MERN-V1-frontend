import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useConsultas from '../../hooks/useConsultas'
import usePacientes from '../../hooks/usePacientes'
import useCitas from '../../hooks/useCitas'
import useAuth from '../../hooks/useAuth'
import FormularioConsultaForm from '../../components/FormularioConsultaForm'

const EditarConsulta = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { consulta, guardarConsulta, obtenerConsulta, alerta } = useConsultas()
    const { pacientes, obtenerPacientes } = usePacientes()
    const { citas, obtenerCitas } = useCitas()
    const { auth } = useAuth()

    useEffect(() => {
        obtenerPacientes()
        obtenerCitas()
    }, [])

    useEffect(() => {
        if (id) {
            obtenerConsulta(id)
        }
    }, [id])

    const handleSubmit = async (consultaData) => {
        // Agregar veterinario y cliente
        const pacienteSeleccionado = pacientes.find(p => p._id === consultaData.paciente)
        
        const datosCompletos = {
            ...consultaData,
            veterinario: auth._id,
            cliente: pacienteSeleccionado?.propietario?._id
        }

        const resultado = await guardarConsulta(datosCompletos, id)

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
                            Editar Consulta Médica
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Actualiza la información de la consulta veterinaria
                        </p>
                    </div>
                </div>
            </div>

            <FormularioConsultaForm 
                initialData={consulta}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                alerta={alerta}
                isEditing={true}
                pacientes={pacientes}
                citas={citas}
            />
        </div>
    )
}

export default EditarConsulta
