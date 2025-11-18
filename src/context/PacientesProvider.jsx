import { createContext, useState, useEffect } from "react"
import clienteAxios from "../config/axios"

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const [cargando, setCargando] = useState(false)
    const [alerta, setAlerta] = useState({})

    const obtenerPacientes = async () => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios('/pacientes', config)
            setPacientes(data)
        } catch (error) {
            console.log(error)
        }
        setCargando(false)
    }

    useEffect(() => {
        obtenerPacientes()
    }, [])


    const guardarPaciente = async (pacienteData, id) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${id}`, pacienteData, config)
                const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
                
                setAlerta({
                    msg: 'Paciente actualizado correctamente',
                    error: false
                })
                
                setTimeout(() => {
                    setAlerta({})
                }, 3000)

                return true
            } catch (error) {
                setAlerta({
                    msg: error.response?.data?.msg || error.message,
                    error: true
                })
                return false
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/pacientes', pacienteData, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
                
                setPacientes([pacienteAlmacenado, ...pacientes])
                
                setAlerta({
                    msg: 'Paciente registrado correctamente',
                    error: false
                })
                
                setTimeout(() => {
                    setAlerta({})
                }, 3000)

                return true
            } catch (error) {
                console.log(error.response?.data?.msg || error.message)
                setAlerta({
                    msg: error.response?.data?.msg || error.message,
                    error: true
                })
                return false
            }
        } 
    }

    const obtenerPaciente = async (id) => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/pacientes/${id}`, config)
            setPaciente(data)
            return data
        } catch (error) {
            console.log(error)
            setPaciente({})
        } finally {
            setCargando(false)
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }
    
    const eliminarPaciente = async id => {
        const confirmar = ('¿Confirmas que desea eliminar ?')
        
        if(confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter( pacienteState => pacienteState._id !== id)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }   
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                paciente,
                cargando,
                alerta,
                obtenerPacientes,
                guardarPaciente,
                obtenerPaciente,
                setEdicion,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
    
}

export default PacientesContext