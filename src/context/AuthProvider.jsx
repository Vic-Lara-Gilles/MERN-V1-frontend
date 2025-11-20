import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext()
const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }
            
            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                // Cambiar endpoint de veterinarios a usuarios
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response?.data?.msg || error.message)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    },[])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }
            
        const config ={
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            // Cambiar endpoint de veterinarios a usuarios
            const url =`/usuarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config)
            
            return {
                msg: 'Almacenado Correcto'
            }
        } catch (error) {
            return {
                msg: error.response?.data?.msg || error.message,
                error: true,
            }
        }
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }
        
        const config ={
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            // Cambiar endpoint de veterinarios a usuarios
            const url = '/usuarios/actualizar-password'

            const { data } = await clienteAxios.put(url, datos, config)
            console.log(data)

            return{
                msg: data.msg
            }
        } catch (error) {
            return{
                msg: error.response?.data?.msg || error.message,
                error: true
            }
        }
    }

    // Función helper para verificar roles
    const tieneRol = (rolesPermitidos) => {
        if (!auth?.rol) return false
        return rolesPermitidos.includes(auth.rol)
    }

    const esAdmin = () => tieneRol(['admin'])
    const esVeterinario = () => tieneRol(['veterinario', 'admin'])
    const esRecepcion = () => tieneRol(['recepcion', 'admin'])
    const esPersonal = () => tieneRol(['admin', 'veterinario', 'recepcion'])

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                guardarPassword,
                actualizarPerfil,
                tieneRol,
                esAdmin,
                esVeterinario,
                esRecepcion,
                esPersonal,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext