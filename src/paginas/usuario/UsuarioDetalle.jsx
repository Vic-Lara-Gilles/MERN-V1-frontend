
import { useEffect, useState, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Stethoscope, Phone, Mail, ArrowLeft } from 'lucide-react';
import clienteAxios from '../../config/axios';

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
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-gray-700 p-8 mt-8 opacity-0 animate-[fadeIn_0.15s_ease-in_forwards]">
                <div className="h-4 w-32 bg-slate-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse"></div>
                    <div className="flex-1">
                        <div className="h-8 w-48 bg-slate-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                        <div className="h-6 w-32 bg-slate-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="h-5 w-full bg-slate-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-5 w-3/4 bg-slate-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-5 w-2/3 bg-slate-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-red-200 dark:border-red-700 p-8 mt-8">
                <div className="text-center text-red-500 dark:text-red-400">{error}</div>
            </div>
        );
    }
    if (!usuario) {
        return (
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-gray-700 p-8 mt-8">
                <div className="text-center text-slate-500 dark:text-gray-400">Usuario no encontrado.</div>
            </div>
        );
    }

    const rolInfo = roles[usuario.rol] || { label: usuario.rol, icon: Shield, color: 'text-gray-700' };
    const IconRol = rolInfo.icon;

    return (
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-gray-700 p-8 mt-8 opacity-0 animate-[fadeIn_0.2s_ease-in_forwards]">
            <Link to="/admin/usuarios" className="inline-flex items-center text-sm text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" /> Volver a usuarios
            </Link>
            <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-linear-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 flex items-center justify-center text-3xl font-bold text-purple-700 dark:text-purple-300 border-2 border-purple-200 dark:border-purple-700">
                    {usuario.nombre?.charAt(0) || '?'}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{usuario.nombre}</h2>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-slate-50 dark:bg-gray-700 border-2 ${rolInfo.color} dark:border-gray-600`}>
                        <IconRol className="h-4 w-4" />
                        <span className="dark:text-gray-200">{rolInfo.label}</span>
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                    <Mail className="h-4 w-4" />
                    <span>{usuario.email}</span>
                </div>
                {usuario.telefono && (
                    <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                        <Phone className="h-4 w-4" />
                        <span>{usuario.telefono}</span>
                    </div>
                )}
                {usuario.especialidad && (
                    <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                        <Stethoscope className="h-4 w-4" />
                        <span>{usuario.especialidad}</span>
                    </div>
                )}
                <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                    <span className="font-semibold">Estado:</span>
                    {usuario.activo ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium border border-green-200 dark:border-green-700">Activo</span>
                    ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-700">Inactivo</span>
                    )}
                </div>
                {!usuario.confirmado && (
                    <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                        <Mail className="h-4 w-4" />
                        <span>Sin confirmar</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsuarioDetalle;