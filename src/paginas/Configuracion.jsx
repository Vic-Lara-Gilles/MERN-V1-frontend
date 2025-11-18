import { useState, useEffect } from 'react';
import { User, Lock, Settings } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';

const Configuracion = () => {
  const { auth, actualizarPerfil, guardarPassword } = useAuth();
  const [tabActivo, setTabActivo] = useState('perfil');
  const [alerta, setAlerta] = useState({});

  // Estado para perfil
  const [perfil, setPerfil] = useState({});

  // Estado para contraseña
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handlePerfilSubmit = async (e) => {
    e.preventDefault();
    const { nombre, email } = perfil;
    
    if ([nombre, email].includes('')) {
      setAlerta({
        msg: 'Email y Nombre son obligatorios',
        error: true,
      });
      return;
    }
    
    const resultado = await actualizarPerfil(perfil);
    setAlerta(resultado);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some(campo => campo === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    if (password.pwd_nuevo.length < 6) {
      setAlerta({
        msg: 'La contraseña debe tener mínimo 6 caracteres',
        error: true
      });
      return;
    }

    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);
    
    // Limpiar campos si fue exitoso
    if (!respuesta.error) {
      setPassword({
        pwd_actual: '',
        pwd_nuevo: ''
      });
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Settings className="h-8 w-8 text-gray-900" />
          Configuración de Cuenta
        </h1>
        <p className="text-gray-600 mt-2">
          Administra tu información personal y seguridad
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => {
                setTabActivo('perfil');
                setAlerta({});
              }}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                tabActivo === 'perfil'
                  ? 'border-indigo-600 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="h-5 w-5" />
              Información Personal
            </button>
            <button
              onClick={() => {
                setTabActivo('password');
                setAlerta({});
              }}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                tabActivo === 'password'
                  ? 'border-indigo-600 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Lock className="h-5 w-5" />
              Cambiar Contraseña
            </button>
          </nav>
        </div>

        <div className="p-6">
          {alerta.msg && <Alerta alerta={alerta} />}

          {/* Tab de Perfil */}
          {tabActivo === 'perfil' && (
            <form onSubmit={handlePerfilSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Escribe tu nombre"
                    value={perfil.nombre || ''}
                    onChange={(e) => setPerfil({
                      ...perfil,
                      [e.target.name]: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Escribe tu email"
                    value={perfil.email || ''}
                    onChange={(e) => setPerfil({
                      ...perfil,
                      [e.target.name]: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="telefono"
                    placeholder="Escribe tu teléfono"
                    value={perfil.telefono || ''}
                    onChange={(e) => setPerfil({
                      ...perfil,
                      [e.target.name]: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sitio Web
                  </label>
                  <input
                    type="text"
                    name="web"
                    placeholder="Escribe tu sitio web"
                    value={perfil.web || ''}
                    onChange={(e) => setPerfil({
                      ...perfil,
                      [e.target.name]: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          )}

          {/* Tab de Contraseña */}
          {tabActivo === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="max-w-md space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña Actual <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="pwd_actual"
                    placeholder="Escribe tu contraseña actual"
                    value={password.pwd_actual}
                    onChange={(e) => setPassword({
                      ...password,
                      [e.target.name]: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva Contraseña <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="pwd_nuevo"
                    placeholder="Escribe tu nueva contraseña"
                    value={password.pwd_nuevo}
                    onChange={(e) => setPassword({
                      ...password,
                      [e.target.name]: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    La contraseña debe tener al menos 6 caracteres
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cambiar Contraseña
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
