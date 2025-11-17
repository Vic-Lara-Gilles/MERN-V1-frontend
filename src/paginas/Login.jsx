import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth"
import clienteAxios from "../config/axios";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
            const { data } = await clienteAxios.post('/veterinarios/login', {email, password})
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
            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                    Bienvenido de nuevo
                </h1>
                <p className="text-xl text-muted-foreground">
                    Inicia sesión para administrar tus <span className="font-semibold text-slate-900">pacientes</span>
                </p>
            </div>

            <Card className="w-full shadow-2xl border-0 bg-linear-to-br from-white to-slate-50">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
                    <CardDescription>
                        Ingresa tus credenciales para acceder a tu cuenta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    { msg && <Alerta alerta={alerta} />}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
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
                                onChange={e => setPassword(e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <Button 
                            type="submit"
                            className="w-full h-11 text-base font-semibold"
                            size="lg"
                        >
                            Iniciar Sesión
                        </Button>
                        
                        <div className="flex flex-col gap-3 mt-6 pt-6 border-t">
                            <Link
                                className="text-sm text-center text-muted-foreground hover:text-primary transition-colors"
                                to="/registrar">
                                ¿No tienes cuenta? <span className="font-semibold text-primary">Regístrate</span>
                            </Link>
                            
                            <Link
                                className="text-sm text-center text-muted-foreground hover:text-primary transition-colors"
                                to="/olvide-password">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default Login;