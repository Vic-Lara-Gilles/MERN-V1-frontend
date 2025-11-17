import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from "../config/axios";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})
    
    const handleSubmit = async e => {
        e.preventDefault()

        if(email === '' || email.length < 6) {
            setAlerta({msg: 'El Email es obligatorio', error: true})
            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email })
            setAlerta({msg: data.msg})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    
    const { msg } = alerta

    return (
        <>
            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-slate-900 via-slate-600 to-slate-900 bg-clip-text text-transparent">
                    ¿Olvidaste tu contraseña?
                </h1>
                <p className="text-xl text-muted-foreground">
                    Recupera tu acceso y sigue administrando tus <span className="font-semibold text-slate-900">pacientes</span>
                </p>
            </div>
            
            <Card className="w-full shadow-2xl border-0 bg-linear-to-br from-white to-slate-50">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Recuperar Contraseña</CardTitle>
                    <CardDescription>
                        Ingresa tu email para recibir instrucciones
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

                        <Button 
                            type="submit"
                            className="w-full h-11 text-base font-semibold"
                            size="lg"
                        >
                            Enviar Instrucciones
                        </Button>

                        <div className="flex flex-col gap-3 mt-6 pt-6 border-t">
                            <Link
                                className="text-sm text-center text-muted-foreground hover:text-primary transition-colors"
                                to="/">
                                ¿Ya tienes una cuenta? <span className="font-semibold text-primary">Inicia sesión</span>
                            </Link>
                            <Link 
                                className="text-sm text-center text-muted-foreground hover:text-primary transition-colors"
                                to="/registrar">
                                ¿No tienes cuenta? <span className="font-semibold text-primary">Regístrate</span>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default OlvidePassword;