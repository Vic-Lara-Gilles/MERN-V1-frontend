import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import usePacientes from '../hooks/usePacientes'
import useClientes from '../hooks/useClientes'
import FormularioPacienteForm from '../components/FormularioPacienteForm'

const NuevoPaciente = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const clienteIdParam = searchParams.get('cliente')
    
    const { guardarPaciente, alerta } = usePacientes()
    const { clientes, obtenerClientes } = useClientes()

    useEffect(() => {
        obtenerClientes()
    }, [])

    const handleSubmit = async (datos) => {
        const resultado = await guardarPaciente(datos)
        
        if (resultado) {
            if (clienteIdParam) {
                navigate(`/admin/clientes/${clienteIdParam}`)
            } else {
                navigate('/admin/pacientes')
            }
        }
    }

    const handleCancel = () => {
        if (clienteIdParam) {
            navigate(`/admin/clientes/${clienteIdParam}`)
        } else {
            navigate('/admin/pacientes')
        }
    }

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancel}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Nuevo Paciente
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Registra una nueva mascota
                        </p>
                    </div>
                </div>

                <FormularioPacienteForm 
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    alerta={alerta}
                    isEditing={false}
                    clientes={clientes}
                />
            </div>
        </div>
    )
}

export default NuevoPaciente
