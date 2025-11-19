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
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-slate-900 mb-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nombre Completo *
              </div>
            </label>
            <input
              type="text"
              id="nombre"
              value={usuario.nombre}
              onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: Dr. Juan Pérez"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </div>
            </label>
            <input
              type="email"
              id="email"
              value={usuario.email}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="usuario@veterinaria.com"
            />
          </div>

          {/* Password - solo para nuevos usuarios */}
          {!initialData._id && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Contraseña *
                </div>
              </label>
              <input
                type="password"
                id="password"
                value={usuario.password}
                onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Mínimo 6 caracteres"
              />
              <p className="mt-1 text-sm text-muted-foreground">Mínimo 6 caracteres</p>
            </div>
          )}

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-slate-900 mb-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Teléfono
              </div>
            </label>
            <input
              type="tel"
              id="telefono"
              value={usuario.telefono}
              onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+56 9 1234 5678"
            />
          </div>

          {/* Rol */}
          <div>
            <label htmlFor="rol" className="block text-sm font-medium text-slate-900 mb-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Rol *
              </div>
            </label>
            <select
              id="rol"
              value={usuario.rol}
              onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                <label htmlFor="especialidad" className="block text-sm font-medium text-slate-900 mb-2">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Especialidad *
                  </div>
                </label>
                <input
                  type="text"
                  id="especialidad"
                  value={usuario.especialidad}
                  onChange={(e) => setUsuario({ ...usuario, especialidad: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ej: Cirugía, Medicina General, Traumatología"
                />
              </div>

              <div>
                <label htmlFor="licencia" className="block text-sm font-medium text-slate-900 mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Licencia Profesional
                  </div>
                </label>
                <input
                  type="text"
                  id="licencia"
                  value={usuario.licenciaProfesional}
                  onChange={(e) => setUsuario({ ...usuario, licenciaProfesional: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Número de licencia profesional"
                />
              </div>
            </>
          )}

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {initialData._id ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>

      {/* Información adicional */}
      {!initialData._id && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Información importante:</h3>
          <ul className="text-sm text-gray-900 space-y-1">
            <li>• Los campos marcados con * son obligatorios</li>
            <li>• El usuario recibirá un email de confirmación</li>
            <li>• La contraseña puede ser cambiada posteriormente por el usuario</li>
            <li>• Los veterinarios deben especificar su especialidad</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormularioUsuarioForm;
