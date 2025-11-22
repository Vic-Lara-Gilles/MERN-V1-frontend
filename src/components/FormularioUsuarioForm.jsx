import { useState } from 'react';
import { UserPlus, Mail, Phone, User, Shield, Stethoscope, Award } from 'lucide-react';
import Alerta from './Alerta';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FormularioUsuarioForm = ({ onSubmit, initialData = {}, alerta }) => {
  const [localAlerta, setLocalAlerta] = useState({})
  const [usuario, setUsuario] = useState({
    nombre: initialData.nombre || '',
    email: initialData.email || '',
    telefono: initialData.telefono || '',
    rol: initialData.rol || 'veterinario',
    especialidad: initialData.especialidad || '',
    licenciaProfesional: initialData.licenciaProfesional || '',
    confirmado: initialData.confirmado !== undefined ? initialData.confirmado : false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!usuario.nombre.trim()) {
      setLocalAlerta({
        msg: 'El nombre es obligatorio',
        error: true
      })
      return
    }

    if (!usuario.email.trim()) {
      setLocalAlerta({
        msg: 'El email es obligatorio',
        error: true
      })
      return
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(usuario.email)) {
      setLocalAlerta({
        msg: 'El email no es válido',
        error: true
      })
      return
    }

    if (!usuario.rol) {
      setLocalAlerta({
        msg: 'El rol es obligatorio',
        error: true
      })
      return
    }

    if (usuario.rol === 'veterinario' && !usuario.especialidad.trim()) {
      setLocalAlerta({
        msg: 'La especialidad es obligatoria para veterinarios',
        error: true
      })
      return
    }

    // Limpiar alerta local
    setLocalAlerta({})

    onSubmit(usuario);
  };

  const { msg } = alerta || {};

  return (
    <div className="max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-gray-700 p-8">
        {(msg || localAlerta?.msg) && <Alerta alerta={msg ? alerta : localAlerta} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="nombre" className="flex items-center gap-2">
              <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Nombre Completo <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="nombre"
              value={usuario.nombre}
              onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
              placeholder="Ej: Dr. Juan Pérez"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              id="email"
              value={usuario.email}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
              placeholder="usuario@veterinaria.com"
              required
            />
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <Label htmlFor="telefono" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Teléfono
            </Label>
            <Input
              type="tel"
              id="telefono"
              value={usuario.telefono}
              onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
              placeholder="+56 9 1234 5678"
            />
          </div>

          {/* Rol */}
          <div className="space-y-2">
            <Label htmlFor="rol" className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Rol <span className="text-red-500">*</span>
            </Label>
            <Select value={usuario.rol} onValueChange={(value) => setUsuario({ ...usuario, rol: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="veterinario">Veterinario</SelectItem>
                <SelectItem value="recepcion">Recepción</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Especialidad (solo para veterinarios) */}
          {usuario.rol === 'veterinario' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="especialidad" className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  Especialidad <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="especialidad"
                  value={usuario.especialidad}
                  onChange={(e) => setUsuario({ ...usuario, especialidad: e.target.value })}
                  placeholder="Ej: Cirugía, Medicina General, Traumatología"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="licencia" className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  Licencia Profesional
                </Label>
                <Input
                  type="text"
                  id="licencia"
                  value={usuario.licenciaProfesional}
                  onChange={(e) => setUsuario({ ...usuario, licenciaProfesional: e.target.value })}
                  placeholder="Número de licencia profesional"
                />
              </div>
            </>
          )}

          {/* Botones */}
          <div className="flex gap-4 pt-6 border-t-2 border-slate-200 dark:border-gray-700">
            <Button type="submit" className="flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              {initialData._id ? 'Actualizar Usuario' : 'Crear Usuario'}
            </Button>
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
              <span>El usuario recibirá un email con un enlace para confirmar su cuenta</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
              <span>Después de confirmar el email, el usuario deberá crear su propia contraseña</span>
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
