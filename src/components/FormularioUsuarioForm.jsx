import { useState } from 'react';
import { UserPlus, Mail, Phone, User, Shield, Stethoscope, Award } from 'lucide-react';
import Alerta from './Alerta';

const FormularioUsuarioForm = ({ onSubmit, initialData = {}, alerta }) => {
  const [usuario, setUsuario] = useState({
    nombre: initialData.nombre || '',
    email: initialData.email || '',
    password: initialData.password || '',
    telefono: initialData.telefono || '',
    rol: initialData.rol || 'veterinario',
    especialidad: initialData.especialidad || '',
    licenciaProfesional: initialData.licenciaProfesional || '',
    confirmado: initialData.confirmado !== undefined ? initialData.confirmado : true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(usuario);
  };

  const { msg } = alerta || {};

  return (
    <div className="max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-gray-700 p-8">
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Nombre Completo <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="text"
              id="nombre"
              value={usuario.nombre}
              onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
              placeholder="Ej: Dr. Juan Pérez"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Email <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="email"
              id="email"
              value={usuario.email}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
              placeholder="usuario@veterinaria.com"
            />
          </div>

          {/* Password - solo para nuevos usuarios */}
          {!initialData._id && (
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  Contraseña <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="password"
                id="password"
                value={usuario.password}
                onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
                placeholder="Mínimo 6 caracteres"
              />
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Mínimo 6 caracteres</p>
            </div>
          )}

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Teléfono
              </div>
            </label>
            <input
              type="tel"
              id="telefono"
              value={usuario.telefono}
              onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
              placeholder="+56 9 1234 5678"
            />
          </div>

          {/* Rol */}
          <div>
            <label htmlFor="rol" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Rol <span className="text-red-500">*</span>
              </div>
            </label>
            <select
              id="rol"
              value={usuario.rol}
              onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white transition-colors"
            >
              <option value="veterinario">Veterinario</option>
              <option value="recepcion">Recepción</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {/* Especialidad (solo para veterinarios) */}
          {usuario.rol === 'veterinario' && (
            <>
              <div>
                <label htmlFor="especialidad" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    Especialidad <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="especialidad"
                  value={usuario.especialidad}
                  onChange={(e) => setUsuario({ ...usuario, especialidad: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
                  placeholder="Ej: Cirugía, Medicina General, Traumatología"
                />
              </div>

              <div>
                <label htmlFor="licencia" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    Licencia Profesional
                  </div>
                </label>
                <input
                  type="text"
                  id="licencia"
                  value={usuario.licenciaProfesional}
                  onChange={(e) => setUsuario({ ...usuario, licenciaProfesional: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
                  placeholder="Número de licencia profesional"
                />
              </div>
            </>
          )}

          {/* Botones */}
          <div className="flex gap-4 pt-6 border-t-2 border-slate-200 dark:border-gray-700">
            <button
              type="submit"
              className="flex-1 bg-linear-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              {initialData._id ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>

      {/* Información adicional */}
      {!initialData._id && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-3 text-lg flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Información importante
          </h3>
          <ul className="text-sm text-blue-900 dark:text-blue-200 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
              <span>Los campos marcados con <span className="text-red-500 font-semibold">*</span> son obligatorios</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
              <span>El usuario recibirá un email de confirmación</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
              <span>La contraseña puede ser cambiada posteriormente por el usuario</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
              <span>Los veterinarios deben especificar su especialidad</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormularioUsuarioForm;
