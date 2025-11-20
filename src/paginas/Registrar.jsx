import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta  from '../components/Alerta'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


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
        <>
            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-900 via-sky-700 to-blue-900 bg-clip-text text-transparent">
                    Únete a nosotros
                </h1>
                <p className="text-xl text-muted-foreground">
                    Crea tu cuenta y administra tus <span className="font-semibold text-slate-900">pacientes</span>
                </p>
            </div>

            <Card className="w-full shadow-2xl border-0 bg-linear-to-br from-white to-slate-50">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
                    <CardDescription>
                        Completa tus datos para registrarte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    { msg && <Alerta alerta={alerta} />}
                    
                    <form onSubmit={handleSumit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre completo</Label>
                            <Input 
                                id="nombre"
                                type="text"
                                placeholder="Juan Pérez"
                                value={nombre}
                                onChange={ e => setNombre(e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={ e => setEmail(e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input 
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={ e => setPassword(e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="repetirPassword">Repetir contraseña</Label>
                            <Input 
                                id="repetirPassword"
                                type="password"
                                placeholder="••••••••"
                                value={repetirPassword}
                                onChange={ e => setRepetirPassword(e.target.value)}
                                className="h-11"
                            />
                        </div>

                        <Button 
                            type="submit"
                            className="w-full h-11 text-base font-semibold"
                            size="lg"
                        >
                            Crear Cuenta
                        </Button>
                        
                        <div className="flex flex-col gap-3 mt-6 pt-6 border-t">
                            <Link
                                className="text-sm text-center text-muted-foreground hover:text-primary transition-colors"
                                to="/auth/login">
                                ¿Ya tienes una cuenta? <span className="font-semibold text-primary">Inicia sesión</span>
                            </Link>
                            <Link 
                                className="text-sm text-center text-muted-foreground hover:text-primary transition-colors"
                                to="/auth/olvide-password">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default Resgistrar;