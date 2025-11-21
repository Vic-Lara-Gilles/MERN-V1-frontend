import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';
import clienteAxios from '../config/axios';
import FormularioUsuarioForm from '../components/FormularioUsuarioForm';

const FormularioUsuario = () => {
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (usuario) => {
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/usuarios')}
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Volver a usuarios</span>
        </button>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-linear-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 flex items-center justify-center shadow-lg">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            Nuevo Usuario
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Crea un nuevo usuario del sistema</p>
        </div>
      </div>

      {/* Formulario */}
      <FormularioUsuarioForm onSubmit={handleSubmit} alerta={alerta} />
    </div>
  );
};

export default FormularioUsuario;
