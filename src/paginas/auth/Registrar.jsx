import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Alerta  from '../../components/Alerta'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/ui/page-container"
import { UserPlus, ArrowRight } from "lucide-react"


const Resgistrar = () => {
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')

    const [ alerta, setAlerta] = useState({})

    const handleSumit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: 'Hay campos vacios', error: true})
            return;
        }
        if(password !== repetirPassword) {
            setAlerta({ msg: 'Los passwords no son iguales', error: true})
            return;
        }
        if(password.length < 6) {
            setAlerta({ msg: 'El Password es muy corto, min 6', error: true})
            return;
        }
        setAlerta({})

        // Crear el usuario en la api
        try {
            // Cambiar endpoint de veterinarios a usuarios
            await clienteAxios.post('/usuarios', {nombre, email, password })
           
            setAlerta({
                msg: 'Creado Correctamente, revisa tu email',
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || error.message,
                error: true
            });
        }
    }

    const { msg } = alerta

    return (
        <PageContainer>
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Left: Branding */}
                    <div className="hidden md:flex flex-col justify-center space-y-6 px-4">
                {/* Logo/Icon */}
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-slate-900 to-slate-700 dark:from-lime-600 dark:to-lime-500 flex items-center justify-center shadow-lg">
                        <UserPlus className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">VetManager</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Sistema de Gestión Veterinaria</p>
                    </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                    Únete a nosotros
                </h2>
                
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                    Crea tu cuenta y comienza a gestionar tu clínica veterinaria de manera profesional
                </p>
                
                {/* Features list */}
                <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-lime-500"></div>
                        <span className="text-sm">Gestión completa de pacientes</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-lime-500"></div>
                        <span className="text-sm">Control de citas y consultas</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-slate-700 dark:bg-lime-500"></div>
                        <span className="text-sm">Historial médico detallado</span>
                    </div>
                </div>
            </div>

                    {/* Right: Register Form */}
                    <div className="flex items-center justify-center w-full">
                        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Crear Cuenta</CardTitle>
                        <CardDescription className="dark:text-slate-400">
                            Completa tus datos para registrarte
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        { msg && <Alerta alerta={alerta} />}
                        
                        <form onSubmit={handleSumit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre" className="text-sm font-medium text-slate-700 dark:text-slate-200">Nombre completo</Label>
                                <Input 
                                    id="nombre"
                                    type="text"
                                    placeholder="Juan Pérez"
                                    value={nombre}
                                    onChange={ e => setNombre(e.target.value)}
                                    className="h-12 px-4 text-base border-slate-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 focus:border-slate-900 dark:focus:border-lime-500 focus:ring-slate-900 dark:focus:ring-lime-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</Label>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={ e => setEmail(e.target.value)}
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
                                    onChange={ e => setPassword(e.target.value)}
                                    className="h-12 px-4 text-base border-slate-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 focus:border-slate-900 dark:focus:border-lime-500 focus:ring-slate-900 dark:focus:ring-lime-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="repetirPassword" className="text-sm font-medium text-slate-700 dark:text-slate-200">Repetir contraseña</Label>
                                <Input 
                                    id="repetirPassword"
                                    type="password"
                                    placeholder="••••••••"
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
                                Crear Cuenta
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            
                            <div className="text-center pt-6 border-t border-slate-200 dark:border-gray-700 mt-6 space-y-3">
                                <Link
                                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors block w-full font-medium"
                                    to="/auth">
                                    ¿Ya tienes una cuenta? <span className="font-semibold text-slate-900 dark:text-lime-500">Inicia sesión</span>
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
                </div>
            </div>
        </PageContainer>
    );
};

export default Resgistrar;