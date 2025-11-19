import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useCitas from '../hooks/useCitas'
import usePacientes from '../hooks/usePacientes'
import useClientes from '../hooks/useClientes'
import FormularioCitaForm from '../components/FormularioCitaForm'

const EditarCita = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { cita, obtenerCita, guardarCita, alerta } = useCitas()
    const { pacientes, obtenerPacientes } = usePacientes()
    const { clientes, obtenerClientes } = useClientes()
    const [veterinarios, setVeterinarios] = useState([])

    useEffect(() => {
        obtenerPacientes()
        obtenerClientes()
        obtenerVeterinarios()
    }, [])

    useEffect(() => {
        if (id) {
            obtenerCita(id)
        }
    }, [id])

    const obtenerVeterinarios = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/veterinarios`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setVeterinarios(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (citaData) => {
        const resultado = await guardarCita(citaData, id)

        if (resultado) {
            setTimeout(() => {
                navigate('/admin/citas')
            }, 2000)
        }
    }

    const handleCancel = () => {
        navigate('/admin/citas')
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
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
                        <h1 className="text-3xl font-bold text-gray-900">
                            Editar Cita
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Modifica los datos de la cita
                        </p>
                    </div>
                </div>
            </div>

            <FormularioCitaForm 
                initialData={cita}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                alerta={alerta}
                isEditing={true}
                clientes={clientes}
                pacientes={pacientes}
                veterinarios={veterinarios}
            />
        </div>
    )
}

export default EditarCita
