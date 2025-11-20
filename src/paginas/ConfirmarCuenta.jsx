import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"

const ConfirnarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})
    
    const params = useParams()
    const { id } = params

    useEffect(() => {
        const ConfirmarCuenta = async () => {
            try {
                // Cambiar endpoint de veterinarios a usuarios
                const url = `/usuarios/confirmar/${id}`
                const { data } = await clienteAxios(url)
                setCuentaConfirmada(true)
                setAlerta({
                    msg: data.msg
                })
            }   catch (error) {
                setAlerta({
                    msg: error.response?.data?.msg || error.message,
                    error: true
                })
            }

            setCargando(false)
        }
        ConfirmarCuenta();
    },[])

    return (
        <>
            {/* Left: Branding */}
            <div className="hidden md:flex flex-col justify-center space-y-6">
                {/* Logo/Icon */}
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-slate-900 to-slate-700 dark:from-lime-600 dark:to-lime-500 flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">VetManager</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Sistema de Gestión Veterinaria</p>
                    </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                    Confirma tu cuenta
                </h2>
                
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                    Estamos validando tu cuenta para que puedas comenzar a administrar tus pacientes
                </p>
            </div>

            {/* Right: Confirmation Status */}
            <div className="flex items-center justify-center md:justify-end">
                <Card className="w-full max-w-md shadow-2xl border-0 bg-white dark:bg-gray-800">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Confirmación de Cuenta</CardTitle>
                        <CardDescription className="dark:text-slate-400">
                            Verificando tu información
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {cargando && (
                            <div className="flex flex-col items-center justify-center py-8 space-y-4">
                                <Loader2 className="h-12 w-12 animate-spin text-slate-900 dark:text-lime-500" />
                                <p className="text-slate-600 dark:text-slate-300">Confirmando tu cuenta...</p>
                            </div>
                        )}
                        
                        {!cargando && <Alerta alerta={alerta} />}
                        
                        {cuentaConfirmada && (
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
        </>
    );
};

export default ConfirnarCuenta;