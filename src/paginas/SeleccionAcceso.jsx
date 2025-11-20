import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, PawPrint, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Alerta from '../components/Alerta';
import AnimatedBackground from '../components/AnimatedBackground';
import useAuth from '../hooks/useAuth';
import useClienteAuth from '../hooks/useClienteAuth';
import clienteAxios from '../config/axios';

const SeleccionAcceso = () => {
  const [tipoAcceso, setTipoAcceso] = useState('personal'); // 'personal' o 'cliente'
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
    <div className="min-h-screen w-full flex items-stretch relative overflow-hidden">
      <AnimatedBackground tipoAcceso={tipoAcceso} />
      <div className="flex flex-1 flex-col md:flex-row w-full z-10">
        {/* Left: Branding */}
        <div className="hidden md:flex flex-col justify-center items-start flex-1 px-12 py-8 relative">
          <div className="mb-8">
            <div className={`h-20 w-20 rounded-full flex items-center justify-center shadow-2xl mb-6 transition-colors duration-500 ${
              tipoAcceso === 'cliente' ? 'bg-blue-600' : 'bg-primary'
            }`}>
              <Heart className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-extrabold text-slate-900 mb-4 drop-shadow-lg">
              Clínica Veterinaria
            </h1>
            <h2 className={`text-2xl font-semibold mb-2 tracking-wide transition-colors duration-500 ${
              tipoAcceso === 'cliente' ? 'text-blue-600' : 'text-primary'
            }`}>
              Bienvenido al Portal
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Gestiona tus pacientes, agenda y consultas en un solo lugar. Acceso para personal y clientes.
            </p>
          </div>
        </div>
        {/* Right: Login Form */}
        <div className="flex flex-1 items-center justify-center px-4 py-12 md:py-0">
          <div className="w-full max-w-md mx-auto">
            {/* Card con Tabs */}
            <Card className="shadow-2xl border bg-white/95 backdrop-blur-sm">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-0 border-b">
            <button
              onClick={() => {
                setTipoAcceso('personal');
                setAlerta({});
                setEmail('');
                setPassword('');
              }}
              className={`relative py-4 px-4 font-semibold text-sm transition-all ${
                tipoAcceso === 'personal'
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-muted-foreground hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Stethoscope className="h-5 w-5" />
                <span>Acceso Personal</span>
              </div>
              {tipoAcceso === 'personal' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
              )}
            </button>
            
            <button
              onClick={() => {
                setTipoAcceso('cliente');
                setAlerta({});
                setEmail('');
                setPassword('');
              }}
              className={`relative py-4 px-4 font-semibold text-sm transition-all ${
                tipoAcceso === 'cliente'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-muted-foreground hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <PawPrint className="h-5 w-5" />
                <span>Portal Clientes</span>
              </div>
              {tipoAcceso === 'cliente' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>

          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {tipoAcceso === 'personal' ? 'Acceso Personal' : 'Acceso Clientes'}
            </CardTitle>
            <CardDescription>
              {tipoAcceso === 'personal' 
                ? 'Para veterinarios y personal administrativo'
                : 'Portal para dueños de mascotas'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            {msg && <Alerta alerta={alerta} />}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>

              <Button 
                type="submit"
                className={`w-full h-11 text-base font-semibold transition-colors ${
                  tipoAcceso === 'cliente' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : ''
                }`}
                size="lg"
              >
                Iniciar Sesión
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="text-center pt-4 border-t space-y-2">
                {tipoAcceso === 'personal' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => navigate('/auth/olvide-password')}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block w-full"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/auth/registrar')}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block w-full"
                    >
                      ¿No tienes cuenta? <span className="font-semibold text-primary">Regístrate</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => navigate('/auth/olvide-password')}
                      className="text-sm text-muted-foreground hover:text-blue-600 transition-colors block w-full"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                    <p className="text-sm text-muted-foreground">
                      ¿No tienes cuenta? <span className="font-semibold text-blue-600">Contacta con recepción</span>
                    </p>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                ¿Necesitas ayuda? Contacta con recepción
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeleccionAcceso;
