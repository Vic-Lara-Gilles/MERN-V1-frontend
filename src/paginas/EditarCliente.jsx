import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useClientes from '../hooks/useClientes'
import FormularioClienteForm from '../components/FormularioClienteForm'

const EditarCliente = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { guardarCliente, cliente, obtenerClientePorId, alerta } = useClientes()

    useEffect(() => {
        if (id) {
            obtenerClientePorId(id)
        }
    }, [id])

    const handleSubmit = async (datos) => {
        const resultado = await guardarCliente(datos, id)
        
        if (resultado) {
            navigate('/admin/clientes')
        }
    }

    const handleCancel = () => {
        navigate('/admin/clientes')
    }

    return (
        <div className="p-6">
            <div className="max-w-3xl mx-auto">
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
                            Editar Cliente
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Actualiza la información del cliente
                        </p>
                    </div>
                </div>

                <FormularioClienteForm 
                    initialData={cliente}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    alerta={alerta}
                    isEditing={true}
                />
            </div>
        </div>
    )
}

export default EditarCliente
