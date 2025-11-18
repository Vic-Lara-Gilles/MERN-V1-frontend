import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft, Mail, Phone, User, Shield, Stethoscope, FileText, Award } from 'lucide-react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const FormularioUsuario = () => {
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState({});
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    rol: 'veterinario',
    especialidad: '',
    licenciaProfesional: '',
    confirmado: true, // Los usuarios creados por admin están confirmados por defecto
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if ([usuario.nombre, usuario.email, usuario.password, usuario.rol].includes('')) {
      setAlerta({
        msg: 'Nombre, Email, Password y Rol son obligatorios',
        error: true,
      });
      return;
    }

    if (usuario.password.length < 6) {
      setAlerta({
        msg: 'El password debe tener al menos 6 caracteres',
        error: true,
      });
      return;
    }

    if (usuario.rol === 'veterinario' && !usuario.especialidad) {
      setAlerta({
        msg: 'La especialidad es obligatoria para veterinarios',
        error: true,
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post('/usuarios', usuario, config);

      setAlerta({
        msg: 'Usuario creado correctamente',
        error: false,
      });

      setTimeout(() => {
        navigate('/admin/usuarios');
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || 'Error al crear usuario',
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/usuarios')}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver a usuarios
        </button>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <UserPlus className="h-8 w-8 text-primary" />
          Nuevo Usuario
        </h1>
        <p className="text-muted-foreground mt-2">Crea un nuevo usuario del sistema</p>
      </div>

      {/* Formulario */}
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

            {/* Password */}
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
                Crear Usuario
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/usuarios')}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Información importante:</h3>
          <ul className="text-sm text-gray-900 space-y-1">
            <li>• Los campos marcados con * son obligatorios</li>
            <li>• El usuario recibirá un email de confirmación</li>
            <li>• La contraseña puede ser cambiada posteriormente por el usuario</li>
            <li>• Los veterinarios deben especificar su especialidad</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormularioUsuario;
