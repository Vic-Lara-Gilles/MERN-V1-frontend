import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useClientes from '../hooks/useClientes'
import FormularioClienteForm from '../components/FormularioClienteForm'

const NuevoCliente = () => {
    const navigate = useNavigate()
    const { guardarCliente, alerta } = useClientes()

    const handleSubmit = async (datos) => {
        // Validaciones
        if ([datos.nombre, datos.apellido, datos.rut, datos.email, datos.telefono].includes('')) {
            return
        }

        const resultado = await guardarCliente(datos)
        
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
                            Nuevo Cliente
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Registra un nuevo dueño de mascota
                        </p>
                    </div>
                </div>

                <FormularioClienteForm 
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    alerta={alerta}
                    isEditing={false}
                />
            </div>
        </div>
    )
}

export default NuevoCliente
