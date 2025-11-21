import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/axios";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, ArrowRight } from "lucide-react"
import { PageContainer } from "@/components/ui/page-container"

const NuevoPassword = () => {

    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)

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

        try {
            // Cambiar endpoint de veterinarios a usuarios
            const url = `/usuarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg,
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || error.message,
                error: true
            })
        }
    }

    const { msg } = alerta
    return (
        <PageContainer>
            <div className="min-h-screen flex items-center justify-center px-4 py-8">
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
            {/* Left: Branding */}
            <div className="hidden md:flex flex-col justify-center space-y-6">
                {/* Logo/Icon */}
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-slate-900 to-slate-700 dark:from-lime-600 dark:to-lime-500 flex items-center justify-center shadow-lg">
                        <Lock className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">VetManager</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Sistema de Gestión Veterinaria</p>
                    </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                    Nueva Contraseña
                </h2>
                
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                    Crea una nueva contraseña segura para recuperar el acceso a tu cuenta
                </p>
                
                {/* Features list */}
                <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-lime-500"></div>
                        <span className="text-sm">Mínimo 6 caracteres</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-lime-500"></div>
                        <span className="text-sm">Proceso seguro y encriptado</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-lime-500"></div>
                        <span className="text-sm">Acceso inmediato</span>
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center md:justify-end">
                <Card className="w-full max-w-md shadow-2xl border-0 bg-white dark:bg-gray-800">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Restablecer Contraseña</CardTitle>
                        <CardDescription className="dark:text-slate-400">
                            Ingresa tu nueva contraseña
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
                                <Link
                                    className="block text-center text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
                                    to="/">
                                    <span className="font-semibold text-slate-900 dark:text-lime-500">Ir a Iniciar Sesión →</span>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
                </div>
            </div>
        </PageContainer>
    )       
}

export default NuevoPassword;