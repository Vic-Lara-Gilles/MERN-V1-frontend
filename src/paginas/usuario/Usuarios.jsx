import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Search, Filter, Shield, Stethoscope, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';
import clienteAxios from '../../config/axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filtrarUsuarios();
  }, [busqueda, filtroRol, usuarios]);

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios('/usuarios', config);
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setCargando(false);
    }
  };

  const filtrarUsuarios = () => {
    let resultado = usuarios;

    // Filtrar por búsqueda
    if (busqueda) {
      resultado = resultado.filter(
        (usuario) =>
          usuario.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
          usuario.email?.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtrar por rol
    if (filtroRol !== 'todos') {
      resultado = resultado.filter((usuario) => usuario.rol === filtroRol);
    }

    setUsuariosFiltrados(resultado);
  };

  const toggleActivo = async (id, activoActual) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      if (activoActual) {
        await clienteAxios.put(`/usuarios/desactivar/${id}`, {}, config);
      } else {
        await clienteAxios.put(`/usuarios/activar/${id}`, {}, config);
      }

      obtenerUsuarios();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  const getRolBadge = (rol) => {
    const badges = {
      admin: { bg: 'bg-purple-100', text: 'text-purple-800', icon: Shield, label: 'Admin' },
      veterinario: { bg: 'bg-blue-100', text: 'text-gray-900', icon: Stethoscope, label: 'Veterinario' },
      recepcion: { bg: 'bg-green-100', text: 'text-green-800', icon: Phone, label: 'Recepción' },
    };
    return badges[rol] || badges.recepcion;
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-slate-900 dark:border-lime-500 border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground dark:text-slate-300">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Users className="h-8 w-8 text-slate-900 dark:text-lime-500" />
            Usuarios del Sistema
          </h1>
          <p className="text-muted-foreground dark:text-slate-300 mt-1">
            Gestiona los usuarios internos de la plataforma
          </p>
        </div>
        <Link
          to="/admin/usuarios/nuevo"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-lime-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-lime-700 transition-colors text-sm font-medium"
        >
          <UserPlus className="h-4 w-4" />
          Nuevo Usuario
        </Link>
      </div>

      {/* Buscador y Filtros */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-transparent dark:border-gray-700 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-gray-400" />
            <select
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent appearance-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="todos">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="veterinario">Veterinario</option>
              <option value="recepción">Recepción</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-gray-700">
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground dark:text-slate-300">
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((usuario) => {
                  const { bg, text, icon: Icon, label } = getRolBadge(usuario.rol);
                  
                  // Definir colores específicos para cada rol en el avatar
                  const getAvatarColors = (rol) => {
                    switch(rol) {
                      case 'admin':
                        return {
                          bg: 'bg-purple-900/20 dark:bg-purple-900/30',
                          icon: 'text-purple-600 dark:text-purple-400'
                        };
                      case 'veterinario':
                        return {
                          bg: 'bg-blue-900/20 dark:bg-blue-900/30',
                          icon: 'text-blue-600 dark:text-blue-400'
                        };
                      case 'recepcion':
                        return {
                          bg: 'bg-green-900/20 dark:bg-green-900/30',
                          icon: 'text-green-600 dark:text-green-400'
                        };
                      default:
                        return {
                          bg: 'bg-gray-900/20 dark:bg-gray-900/30',
                          icon: 'text-gray-600 dark:text-gray-400'
                        };
                    }
                  };
                  
                  const avatarColors = getAvatarColors(usuario.rol);
                  
                  return (
                    <tr
                      key={usuario._id}
                      className="hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                      onClick={e => {
                        // Evitar que el click en el botón de activar/desactivar dispare el row click
                        if (e.target.closest('button')) return;
                        window.location.href = `/admin/usuarios/${usuario._id}`;
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-10 w-10 ${avatarColors.bg} rounded-full flex items-center justify-center`}>
                            <Icon className={`h-5 w-5 ${avatarColors.icon}`} />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-slate-900 dark:text-white">{usuario.nombre}</div>
                            {usuario.especialidad && (
                              <div className="text-sm text-muted-foreground dark:text-slate-300">{usuario.especialidad}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-sm text-slate-900 dark:text-slate-200">
                            <Mail className="h-3 w-3 mr-2 text-muted-foreground dark:text-gray-400" />
                            {usuario.email}
                          </div>
                          {usuario.telefono && (
                            <div className="flex items-center text-sm text-slate-900 dark:text-slate-200">
                              <Phone className="h-3 w-3 mr-2 text-muted-foreground dark:text-gray-400" />
                              {usuario.telefono}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}>
                          <Icon className="h-4 w-4" />
                          {label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {usuario.activo ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-4 w-4" />
                              Activo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                              <XCircle className="h-4 w-4" />
                              Inactivo
                            </span>
                          )}
                          {!usuario.confirmado && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                              <Mail className="h-4 w-4" />
                              Sin confirmar
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            toggleActivo(usuario._id, usuario.activo);
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            usuario.activo
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                              : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                          }`}
                        >
                          {usuario.activo ? 'Desactivar' : 'Activar'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
