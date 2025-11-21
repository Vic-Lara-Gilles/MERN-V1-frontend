import { useState, useEffect } from 'react';
import { User, Lock, Settings } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Alerta from '../../components/Alerta';

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
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Settings className="h-8 w-8 text-slate-900 dark:text-lime-500" />
          Configuración de Cuenta
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Administra tu información personal y seguridad
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-slate-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-slate-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              onClick={() => {
                setTabActivo('perfil');
                setAlerta({});
              }}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${tabActivo === 'perfil'
                  ? 'border-slate-900 dark:border-lime-500 text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-gray-600'
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
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${tabActivo === 'password'
                  ? 'border-slate-900 dark:border-lime-500 text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-gray-600'
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
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
                    className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
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
                    className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
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
                    className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Ingresa número de telefono movil con prefijo: +569
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
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
                    className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-gray-700">
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 dark:bg-lime-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-lime-700 transition-colors font-semibold"
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
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
                    className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
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
                    className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    La contraseña debe tener al menos 6 caracteres
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-gray-700">
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 dark:bg-lime-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-lime-700 transition-colors font-semibold"
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
