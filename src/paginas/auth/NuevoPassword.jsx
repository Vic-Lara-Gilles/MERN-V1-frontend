import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/axios";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, ArrowRight, Heart } from "lucide-react"
import AnimatedBackground from '../../components/AnimatedBackground'
import ThemeToggle from '../../components/ThemeToggle'

const NuevoPassword = () => {

    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)
    const navigate = useNavigate()

    const params = useParams()
    const { token } = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                // Cambiar endpoint de veterinarios a usuarios
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setAlerta({
                    msg: 'Coloca tu nuevo Password'
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error',
                    error: true
                }) 
            }
        }
        comprobarToken()
    }, [])

    const handledSubmit = async (e) => {
        e.preventDefault()

        if(password.length < 6) {
            setAlerta({
                msg: 'El Password debe ser mínimo de 6 caracteres',
                error: true
            })
            return
        }

        if(password !== repetirPassword) {
            setAlerta({
                msg: 'Las contraseñas no coinciden',
                error: true
            })
            return
        }

        try {
            // Cambiar endpoint de veterinarios a usuarios
            const url = `/usuarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg,
            })
            setPasswordModificado(true)
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || error.message,
                error: true
            })
        }
    }

    const { msg } = alerta
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
                            Nueva Contraseña
                        </h2>

                        {/* Descripción */}
                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                            {passwordModificado 
                                ? "¡Contraseña creada exitosamente! Ya puedes iniciar sesión." 
                                : "Crea una contraseña segura para acceder a tu cuenta"
                            }
                        </p>

                        {/* Features list */}
                        <div className="mt-8 space-y-3 hidden md:block">
                            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-slate-400"></div>
                                <span className="text-sm">Mínimo 6 caracteres</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-slate-400"></div>
                                <span className="text-sm">Ambas contraseñas deben coincidir</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-slate-400"></div>
                                <span className="text-sm">Proceso seguro y encriptado</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="flex flex-1 items-center justify-center md:justify-end md:pr-8">
                    <div className="w-full max-w-md">
                        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                            <CardHeader className="space-y-1 pb-6">
                                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {passwordModificado ? "¡Contraseña creada!" : "Crear Contraseña"}
                                </CardTitle>
                                <CardDescription className="dark:text-slate-400">
                                    {passwordModificado 
                                        ? "Ya puedes iniciar sesión con tu nueva contraseña" 
                                        : "Ingresa tu nueva contraseña"
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                { msg && <Alerta alerta={alerta} />}

                                { tokenValido && ( 
                                    <form onSubmit={handledSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                Nuevo Password
                                            </Label>
                                            <Input 
                                                id="password"
                                                type="password"
                                                placeholder="Mínimo 6 caracteres"
                                                value={password}
                                                onChange={ e => setPassword(e.target.value)}
                                                className="h-12 px-4 text-base border-slate-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 focus:border-slate-900 dark:focus:border-lime-500 focus:ring-slate-900 dark:focus:ring-lime-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="repetir-password" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                Confirmar Password
                                            </Label>
                                            <Input 
                                                id="repetir-password"
                                                type="password"
                                                placeholder="Repite tu contraseña"
                                                value={repetirPassword}
                                                onChange={ e => setRepetirPassword(e.target.value)}
                                                className="h-12 px-4 text-base border-slate-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 focus:border-slate-900 dark:focus:border-lime-500 focus:ring-slate-900 dark:focus:ring-lime-500"
                                            />
                                        </div>

                                        <Button 
                                            type="submit"
                                            className="w-full h-12 text-base font-semibold shadow-lg transition-all hover:shadow-xl mt-6 text-white bg-slate-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
                                            size="lg"
                                        >
                                            Guardar Nueva Contraseña
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </form>
                                )}

                                {passwordModificado && (
                                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-gray-700">
                                        <p className="text-center text-sm text-slate-600 dark:text-slate-300">
                                            Redirigiendo al login...
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )       
}

export default NuevoPassword;