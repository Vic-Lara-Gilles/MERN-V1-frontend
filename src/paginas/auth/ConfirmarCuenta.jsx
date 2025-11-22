import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import Alerta from '../../components/Alerta'
import clienteAxios from '../../config/axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Heart } from "lucide-react"
import LoadingSpinner from '../../components/LoadingSpinner';
import AnimatedBackground from '../../components/AnimatedBackground'
import ThemeToggle from '../../components/ThemeToggle'
import useNotificaciones from '../../hooks/useNotificaciones'

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})
    const navigate = useNavigate()
    const { notificarConfirmacionCuenta } = useNotificaciones()
    
    const params = useParams()
    const { token } = params

    useEffect(() => {
        const confirmarCuentaFunc = async () => {
            try {
                const url = `/usuarios/confirmar/${token}`
                const { data } = await clienteAxios(url)
                setCuentaConfirmada(true)
                setAlerta({
                    msg: data.msg
                })
                
                // Disparar notificación de confirmación
                if (data.usuario) {
                    notificarConfirmacionCuenta({
                        nombre: data.usuario.nombre,
                        email: data.usuario.email,
                        rol: data.usuario.rol
                    })
                }
                
                // Redirigir a crear password después de 2 segundos
                setTimeout(() => {
                    navigate(`/restablecer-password/${data.token}`)
                }, 2000)
            } catch (error) {
                setAlerta({
                    msg: error.response?.data?.msg || error.message,
                    error: true
                })
            }

            setCargando(false)
        }
        confirmarCuentaFunc();
    }, [token, navigate, notificarConfirmacionCuenta])  

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
            <AnimatedBackground tipoAcceso="personal" />

            {/* Theme Toggle - Posición absoluta superior derecha */}
            <div className="absolute top-4 right-4 z-20">
                <ThemeToggle />
            </div>

            {/* Container principal */}
            <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto z-10 gap-8 md:gap-12 px-4 py-8">

                {/* Left: Branding */}
                <div className="flex flex-col justify-center items-start flex-1 md:pl-8">
                    <div className="mb-8 w-full">
                        {/* Logo */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg bg-linear-to-br from-slate-700 to-slate-900">
                                <Heart className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                    Clínica Veterinaria
                                </h1>
                            </div>
                        </div>

                        {/* Título dinámico */}
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                            Confirma tu cuenta
                        </h2>

                        {/* Descripción */}
                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                            {cuentaConfirmada 
                                ? "Tu cuenta ha sido confirmada. Ahora crearás tu contraseña." 
                                : "Estamos validando tu cuenta para que puedas comenzar a administrar tus pacientes"
                            }
                        </p>
                    </div>
                </div>

                {/* Right: Confirmation Status */}
                <div className="flex flex-1 items-center justify-center md:justify-end md:pr-8">
                    <div className="w-full max-w-md">
                        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                            <CardHeader className="space-y-1 pb-6">
                                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Confirmación de Cuenta</CardTitle>
                                <CardDescription className="dark:text-slate-400">
                                    Verificando tu información
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {cargando && (
                                    <LoadingSpinner />
                                )}
                                
                                {!cargando && <Alerta alerta={alerta} />}
                                
                                {cuentaConfirmada && (
                                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-gray-700">
                                        <p className="text-center text-sm text-slate-600 dark:text-slate-300">
                                            Redirigiendo para crear tu contraseña...
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmarCuenta; 