import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Search, Shield, Stethoscope, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';
import clienteAxios from '../config/axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerUsuarios();
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
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              Usuarios del Sistema
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestiona los usuarios internos de la plataforma
            </p>
          </div>
          <Link
            to="/admin/usuarios/nuevo"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <UserPlus className="h-5 w-5" />
            Nuevo Usuario
          </Link>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filtro por Rol */}
          <select
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="todos">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="veterinario">Veterinario</option>
            <option value="recepcion">Recepción</option>
          </select>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Usuario</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Contacto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Rol</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground">
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((usuario) => {
                  const { bg, text, icon: Icon, label } = getRolBadge(usuario.rol);
                  return (
                    <tr key={usuario._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{usuario.nombre}</div>
                        {usuario.especialidad && (
                          <div className="text-sm text-muted-foreground">{usuario.especialidad}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Mail className="h-4 w-4" />
                          {usuario.email}
                        </div>
                        {usuario.telefono && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {usuario.telefono}
                          </div>
                        )}
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
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActivo(usuario._id, usuario.activo)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            usuario.activo
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
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
