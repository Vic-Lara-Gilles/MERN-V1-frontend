import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth"
import clienteAxios from "../config/axios";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, ArrowRight } from "lucide-react"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth()

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            // Cambiar endpoint de veterinarios a usuarios
            const { data } = await clienteAxios.post('/usuarios/login', {email, password})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/admin')
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || error.message,
                error: true
            })
        }
    }

    const { msg } = alerta
    return (
        <>
            {/* Left: Branding */}
            <div className="hidden md:flex flex-col justify-center space-y-6">
                {/* Logo/Icon */}
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-slate-900 to-slate-700 dark:from-lime-600 dark:to-lime-500 flex items-center justify-center shadow-lg">
                        <Stethoscope className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">VetManager</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Sistema de Gestión Veterinaria</p>
                    </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                    Bienvenido de nuevo
                </h2>
                
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                    Inicia sesión para administrar tus pacientes y consultas
                </p>
                
                {/* Features list */}
                <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-lime-500"></div>
                        <span className="text-sm">Gestiona pacientes y consultas</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-lime-500"></div>
                        <span className="text-sm">Agenda y seguimiento de citas</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-lime-500"></div>
                        <span className="text-sm">Historial médico completo</span>
                    </div>
                </div>
            </div>

            {/* Right: Login Form */}
            <div className="flex items-center justify-center md:justify-end">
                <Card className="w-full max-w-md shadow-2xl border-0 bg-white dark:bg-gray-800">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Iniciar Sesión</CardTitle>
                        <CardDescription className="dark:text-slate-400">
                            Ingresa tus credenciales para acceder a tu cuenta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        { msg && <Alerta alerta={alerta} />}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</Label>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="h-12 px-4 text-base border-slate-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 focus:border-slate-900 dark:focus:border-lime-500 focus:ring-slate-900 dark:focus:ring-lime-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-200">Contraseña</Label>
                                <Input 
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="h-12 px-4 text-base border-slate-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 focus:border-slate-900 dark:focus:border-lime-500 focus:ring-slate-900 dark:focus:ring-lime-500"
                                />
                            </div>
                            <Button 
                                type="submit"
                                className="w-full h-12 text-base font-semibold shadow-lg transition-all hover:shadow-xl mt-6 text-white bg-slate-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
                                size="lg"
                            >
                                Iniciar Sesión
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            
                            <div className="text-center pt-6 border-t border-slate-200 dark:border-gray-700 mt-6 space-y-3">
                                <Link
                                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors block w-full font-medium"
                                    to="/auth/registrar">
                                    ¿No tienes cuenta? <span className="font-semibold text-slate-900 dark:text-lime-500">Regístrate</span>
                                </Link>
                                
                                <Link
                                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors block w-full"
                                    to="/auth/olvide-password">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Login;