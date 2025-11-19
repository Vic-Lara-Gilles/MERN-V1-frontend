import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Stethoscope, Phone, Mail, ArrowLeft } from 'lucide-react';
import clienteAxios from '../config/axios';

const roles = {
  admin: { label: 'Administrador', icon: Shield, color: 'text-purple-700' },
  veterinario: { label: 'Veterinario', icon: Stethoscope, color: 'text-blue-700' },
  recepcion: { label: 'Recepción', icon: Phone, color: 'text-green-700' },
};

const UsuarioDetalle = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios(`/usuarios/${id}`, config);
        setUsuario(data);
      } catch (err) {
        setError('No se pudo cargar el usuario.');
      } finally {
        setCargando(false);
      }
    };
    fetchUsuario();
  }, [id]);

  if (cargando) {
    return <div className="p-8 text-center text-gray-500">Cargando usuario...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }
  if (!usuario) {
    return <div className="p-8 text-center text-gray-500">Usuario no encontrado.</div>;
  }

  const rolInfo = roles[usuario.rol] || { label: usuario.rol, icon: Shield, color: 'text-gray-700' };
  const IconRol = rolInfo.icon;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
      <Link to="/admin/usuarios" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver a usuarios
      </Link>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-700">
          {usuario.nombre?.charAt(0) || '?'}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{usuario.nombre}</h2>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-50 border ${rolInfo.color} border-gray-200`}>
            <IconRol className="h-4 w-4" />
            {rolInfo.label}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Mail className="h-4 w-4" />
          <span>{usuario.email}</span>
        </div>
        {usuario.telefono && (
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="h-4 w-4" />
            <span>{usuario.telefono}</span>
          </div>
        )}
        {usuario.especialidad && (
          <div className="flex items-center gap-2 text-gray-700">
            <Stethoscope className="h-4 w-4" />
            <span>{usuario.especialidad}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-semibold">Estado:</span>
          {usuario.activo ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">Activo</span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-medium">Inactivo</span>
          )}
        </div>
        {!usuario.confirmado && (
          <div className="flex items-center gap-2 text-yellow-700">
            <Mail className="h-4 w-4" />
            <span>Sin confirmar</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsuarioDetalle;