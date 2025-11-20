import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, PawPrint, AlertCircle } from 'lucide-react';
import clienteAxios from '../config/axios';
import useClienteAuth from '../hooks/useClienteAuth';
import Alerta from '../components/Alerta';

const ClienteLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setCliente } = useClienteAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    if ([email, password].includes('')) {
      console.log('❌ Campos vacíos detectados');
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    try {
      console.log('📡 Enviando request a:', '/clientes/portal/login');
      const { data } = await clienteAxios.post('/clientes/portal/login', { email, password });
      console.log('✅ Login exitoso, data recibida:', data);
      
      setAlerta({});
      localStorage.setItem('token_cliente', data.token);
      console.log('💾 Token guardado en localStorage');
      
      setCliente(data);
      console.log('👤 Cliente seteado en context');
      
      navigate('/portal/dashboard');
      console.log('🚀 Navegando a /portal/dashboard');
    } catch (error) {
      console.error('❌ Error en login:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error data:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      
      setAlerta({
        msg: error.response?.data?.msg || 'Error al iniciar sesión',
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 dark:bg-blue-500 rounded-full mb-4">
            <PawPrint className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Portal Cliente</h1>
          <p className="text-gray-600 dark:text-slate-300">Accede a la información de tus mascotas</p>
        </div>

        {/* Formulario */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-transparent dark:border-gray-700">
          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  placeholder="Tu contraseña"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Información adicional */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div className="text-sm text-blue-900 dark:text-blue-200">
                <p className="font-semibold mb-1">¿Primera vez aquí?</p>
                <p>Contacta con nuestra recepción para obtener tus credenciales de acceso.</p>
              </div>
            </div>
          </div>

          {/* Volver al sistema interno */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white">
              ¿Eres personal de la clínica? <span className="font-semibold">Acceso Interno</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-slate-400">
          <p>© 2025 Clínica Veterinaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default ClienteLogin;
