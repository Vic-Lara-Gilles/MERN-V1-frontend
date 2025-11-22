import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, PawPrint, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Alerta from '../../components/Alerta';
import AnimatedBackground from '../../components/AnimatedBackground';
import ThemeToggle from '../../components/ThemeToggle';
import useAuth from '../../hooks/useAuth';
import useClienteAuth from '../../hooks/useClienteAuth';
import clienteAxios from '../../config/axios';

const Login = () => {
    const [tipoAcceso, setTipoAcceso] = useState('personal');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const { setAuth } = useAuth();
    const { setCliente } = useClienteAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        try {
            if (tipoAcceso === 'personal') {
                // Login de personal
                const { data } = await clienteAxios.post('/usuarios/login', { email, password });
                localStorage.setItem('token', data.token);
                setAuth(data);
                navigate('/admin');
            } else {
                // Login de clientes
                const { data } = await clienteAxios.post('/clientes/portal/login', { email, password });
                localStorage.setItem('token_cliente', data.token);
                setCliente(data);
                navigate('/portal/dashboard');
            }
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || 'Error al iniciar sesión',
                error: true
            });
        }
    };

    const { msg } = alerta;

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
            <AnimatedBackground tipoAcceso={tipoAcceso} />

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
                            <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${tipoAcceso === 'cliente'
                                    ? 'bg-linear-to-br from-blue-500 to-blue-600'
                                    : 'bg-linear-to-br from-slate-700 to-slate-900'
                                }`}>
                                <Heart className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                    Clínica Veterinaria
                                </h1>
                            </div>
                        </div>

                        {/* Título dinámico */}
                        <h2 className={`text-2xl md:text-3xl font-bold mb-4 transition-colors duration-500 ${tipoAcceso === 'cliente' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'
                            }`}>
                            Bienvenido al Portal
                        </h2>

                        {/* Descripción */}
                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                            {tipoAcceso === 'personal'
                                ? 'Para veterinarios y personal administrativo'
                                : 'Accede a la información de tus mascotas'
                            }
                        </p>

                        {/* Features list */}
                        <div className="mt-8 space-y-3 hidden md:block">
                            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <div className={`w-2 h-2 rounded-full ${tipoAcceso === 'cliente' ? 'bg-blue-500' : 'bg-slate-700 dark:bg-slate-400'}`}></div>
                                <span className="text-sm">Gestiona tus {tipoAcceso === 'personal' ? 'pacientes' : 'mascotas'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <div className={`w-2 h-2 rounded-full ${tipoAcceso === 'cliente' ? 'bg-blue-500' : 'bg-slate-700 dark:bg-slate-400'}`}></div>
                                <span className="text-sm">{tipoAcceso === 'personal' ? 'Agenda consultas' : 'Solicita citas'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <div className={`w-2 h-2 rounded-full ${tipoAcceso === 'cliente' ? 'bg-blue-500' : 'bg-slate-700 dark:bg-slate-400'}`}></div>
                                <span className="text-sm">{tipoAcceso === 'personal' ? 'Historial médico completo' : 'Revisa tu historial'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Login Form */}
                <div className="flex flex-1 items-center justify-center md:justify-end md:pr-8">
                    <div className="w-full max-w-md">
                        {/* Card con Tabs */}
                        <Card className="shadow-2xl border-0 bg-white dark:bg-gray-800 overflow-hidden">
                            {/* Tabs */}
                            <div className="grid grid-cols-2 gap-0 bg-slate-50 dark:bg-gray-900">
                                <button
                                    onClick={() => {
                                        setTipoAcceso('cliente');
                                        setAlerta({});
                                        setEmail('');
                                        setPassword('');
                                    }}
                                    className={`relative py-5 px-4 font-semibold text-sm transition-all ${tipoAcceso === 'cliente'
                                            ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 shadow-sm'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <PawPrint className="h-5 w-5" />
                                        <span>Portal Clientes</span>
                                    </div>
                                    {tipoAcceso === 'cliente' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-t"></div>
                                    )}
                                </button>

                                <button
                                    onClick={() => {
                                        setTipoAcceso('personal');
                                        setAlerta({});
                                        setEmail('');
                                        setPassword('');
                                    }}
                                    className={`relative py-5 px-4 font-semibold text-sm transition-all ${tipoAcceso === 'personal'
                                            ? 'text-slate-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Stethoscope className="h-5 w-5" />
                                        <span>Acceso Personal</span>
                                    </div>
                                    {tipoAcceso === 'personal' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 dark:bg-lime-500 rounded-t"></div>
                                    )}
                                </button>
                            </div>

                            <CardHeader className="text-center pt-8 pb-6">
                                <CardTitle className="text-2xl font-bold dark:text-white">
                                    {tipoAcceso === 'personal' ? 'Acceso Personal' : 'Portal Clientes'}
                                </CardTitle>
                                <CardDescription className="text-base mt-2 dark:text-slate-300">
                                    {tipoAcceso === 'personal'
                                        ? 'Ingresa tus credenciales de personal'
                                        : 'Accede a la información de tus mascotas'
                                    }
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="px-6 pb-8">
                                {msg && <Alerta alerta={alerta} />}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                            Correo Electrónico
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="tu@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-12 px-4 text-base border-slate-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 focus:border-slate-900 dark:focus:border-blue-500 focus:ring-slate-900 dark:focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                            Contraseña
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="h-12 px-4 text-base border-slate-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 focus:border-slate-900 dark:focus:border-blue-500 focus:ring-slate-900 dark:focus:ring-blue-500"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className={`w-full h-12 text-base font-semibold shadow-lg transition-all hover:shadow-xl mt-6 text-white ${tipoAcceso === 'cliente'
                                                ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
                                                : 'bg-slate-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700'
                                            }`}
                                        size="lg"
                                    >
                                        Iniciar Sesión
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>

                                    <div className="text-center pt-6 border-t border-slate-200 dark:border-gray-700 mt-6 space-y-3">
                                        {tipoAcceso === 'personal' ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate('/olvide-password')}
                                                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors block w-full font-medium"
                                                >
                                                    ¿Olvidaste tu contraseña?
                                                </button>
                                                <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
                                                    ¿No tienes cuenta? <span className="font-semibold text-slate-900 dark:text-white">Contacta con el administrador</span>
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate('/olvide-password')}
                                                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block w-full font-medium"
                                                >
                                                    ¿Olvidaste tu contraseña?
                                                </button>
                                                <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
                                                    ¿No tienes cuenta? <span className="font-semibold text-blue-600 dark:text-blue-400">Contacta con recepción</span>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Footer */}
                        <div className="text-center mt-6">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                ¿Necesitas ayuda? <span className="font-medium text-slate-700 dark:text-slate-200">Contacta con recepción</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
