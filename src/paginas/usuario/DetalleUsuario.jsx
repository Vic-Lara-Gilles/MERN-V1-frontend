
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Shield, Stethoscope, Phone, Mail, ArrowLeft, Edit, Calendar, FileText, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import clienteAxios from '../../config/axios';

const roles = {
    admin: { 
        label: 'Administrador', 
        icon: Shield, 
        color: 'text-purple-700 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        borderColor: 'border-purple-500 dark:border-purple-400'
    },
    veterinario: { 
        label: 'Veterinario', 
        icon: Stethoscope, 
        color: 'text-blue-700 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        borderColor: 'border-blue-500 dark:border-blue-400'
    },
    recepcion: { 
        label: 'Recepción', 
        icon: Phone, 
        color: 'text-green-700 dark:text-green-400',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        borderColor: 'border-green-500 dark:border-green-400'
    },
};

const UsuarioDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            setCargando(true);
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
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-slate-900 dark:border-lime-500 border-r-transparent"></div>
                    <p className="mt-4 text-muted-foreground dark:text-slate-300">Cargando usuario...</p>
                </div>
            </div>
        );
    }

    if (error || !usuario) {
        return (
            <div className="p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {error || 'Usuario no encontrado'}
                    </h2>
                    <Button 
                        className="mt-4 bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700" 
                        onClick={() => navigate('/admin/usuarios')}
                    >
                        Volver a Usuarios
                    </Button>
                </div>
            </div>
        );
    }

    const rolInfo = roles[usuario.rol] || { 
        label: usuario.rol, 
        icon: Shield, 
        color: 'text-gray-700 dark:text-gray-400',
        bgColor: 'bg-gray-100 dark:bg-gray-900/30',
        borderColor: 'border-gray-500 dark:border-gray-400'
    };
    const IconRol = rolInfo.icon;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/admin/usuarios')}
                        className="hover:bg-slate-100 dark:hover:bg-gray-700"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {usuario.nombre}
                        </h1>
                        <p className="text-muted-foreground dark:text-slate-300 mt-1">Información del usuario</p>
                    </div>
                </div>
                <Button asChild className="bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700">
                    <Link to={`/admin/usuarios/editar/${id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Usuario
                    </Link>
                </Button>
            </div>

            {/* Información del usuario */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Datos personales */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                            Información Personal
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground dark:text-slate-400">Nombre Completo</p>
                                <p className="text-lg font-medium text-slate-900 dark:text-white">
                                    {usuario.nombre}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground dark:text-slate-400">Rol</p>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${rolInfo.bgColor} border ${rolInfo.borderColor}`}>
                                    <IconRol className={`h-4 w-4 ${rolInfo.color}`} />
                                    <span className={rolInfo.color}>{rolInfo.label}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-200 dark:border-gray-700 pt-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                            Información de Contacto
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground dark:text-slate-400" />
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">Email</p>
                                    <p className="text-base font-medium text-slate-900 dark:text-white">{usuario.email}</p>
                                </div>
                            </div>
                            {usuario.telefono && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-muted-foreground dark:text-slate-400" />
                                    <div>
                                        <p className="text-sm text-muted-foreground dark:text-slate-400">Teléfono</p>
                                        <p className="text-base font-medium text-slate-900 dark:text-white">{usuario.telefono}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {usuario.especialidad && (
                        <div className="border-t border-slate-200 dark:border-gray-700 pt-6">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                Información Profesional
                            </h2>
                            <div className="flex items-center gap-3">
                                <Stethoscope className="h-5 w-5 text-muted-foreground dark:text-slate-400" />
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">Especialidad</p>
                                    <p className="text-base font-medium text-slate-900 dark:text-white">{usuario.especialidad}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Estadísticas */}
                <div className="space-y-4">
                    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 ${rolInfo.borderColor}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground dark:text-slate-400">Estado de Cuenta</p>
                                <span className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                                    usuario.activo
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-700'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-700'
                                }`}>
                                    {usuario.activo ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                            <IconRol className={`h-12 w-12 ${rolInfo.color} opacity-50`} />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-indigo-500 dark:border-indigo-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground dark:text-slate-400">Estado Email</p>
                                <span className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                                    usuario.confirmado
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-700'
                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700'
                                }`}>
                                    {usuario.confirmado ? 'Confirmado' : 'Sin Confirmar'}
                                </span>
                            </div>
                            <Mail className="h-12 w-12 text-indigo-500 dark:text-indigo-400 opacity-50" />
                        </div>
                    </div>

                    {usuario.rol === 'veterinario' && (
                        <>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-purple-500 dark:border-purple-400">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground dark:text-slate-400">Consultas Realizadas</p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
                                    </div>
                                    <FileText className="h-12 w-12 text-purple-500 dark:text-purple-400 opacity-50" />
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500 dark:border-blue-400">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground dark:text-slate-400">Pacientes Atendidos</p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
                                    </div>
                                    <Users className="h-12 w-12 text-blue-500 dark:text-blue-400 opacity-50" />
                                </div>
                            </div>
                        </>
                    )}

                    {usuario.rol === 'recepcion' && (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500 dark:border-green-400">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">Citas Agendadas</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
                                </div>
                                <Calendar className="h-12 w-12 text-green-500 dark:text-green-400 opacity-50" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsuarioDetalle;