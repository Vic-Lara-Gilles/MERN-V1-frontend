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
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/clientes/login', { email, password });
      setAlerta({});
      localStorage.setItem('token_cliente', data.token);
      setCliente(data);
      navigate('/portal/dashboard');
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || 'Error al iniciar sesión',
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="max-w-md w-full">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
            <PawPrint className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portal Cliente</h1>
          <p className="text-gray-600">Accede a la información de tus mascotas</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  placeholder="Tu contraseña"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Información adicional */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">¿Primera vez aquí?</p>
                <p>Contacta con nuestra recepción para obtener tus credenciales de acceso.</p>
              </div>
            </div>
          </div>

          {/* Volver al sistema interno */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              ¿Eres personal de la clínica? <span className="font-semibold">Acceso Interno</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2025 Clínica Veterinaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default ClienteLogin;
