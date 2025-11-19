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
      <FormularioUsuarioForm onSubmit={handleSubmit} alerta={alerta} />
    </div>
  );
};

export default FormularioUsuario;
