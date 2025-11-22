import { Bell, BellOff, Eye, List } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import useNotificaciones from '../hooks/useNotificaciones';

const NotificationFloatingButton = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [silencio, setSilencio] = useState(false);
    const menuRef = useRef(null);
    const { agregarNotificacion, notificaciones, noLeidas } = useNotificaciones();

    // Cerrar menú al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAbierto(false);
            }
        };

        if (menuAbierto) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuAbierto]);

    const probarNotificacion = () => {
        if (silencio) return;

        const ejemplos = [
            {
                tipo: 'confirmacion',
                titulo: 'Nueva cuenta confirmada',
                mensaje: 'Dr. Juan Pérez (veterinario) ha confirmado su cuenta'
            },
            {
                tipo: 'usuario',
                titulo: 'Acción de usuario',
                mensaje: 'María González ha actualizado su perfil'
            },
            {
                tipo: 'cliente',
                titulo: 'Cliente verificado',
                mensaje: 'Carlos Rodríguez ha verificado su email'
            }
        ];

        const notificacion = ejemplos[Math.floor(Math.random() * ejemplos.length)];
        agregarNotificacion(notificacion);
        setMenuAbierto(false);
    };

    const mostrarTodas = () => {
        const ejemplos = [
            {
                tipo: 'confirmacion',
                titulo: 'Nueva cuenta confirmada',
                mensaje: 'Dr. Juan Pérez (veterinario) ha confirmado su cuenta'
            },
            {
                tipo: 'usuario',
                titulo: 'Acción de usuario',
                mensaje: 'María González ha actualizado su perfil'
            },
            {
                tipo: 'cliente',
                titulo: 'Cliente verificado',
                mensaje: 'Carlos Rodríguez ha verificado su email'
            }
        ];

        ejemplos.forEach((notif, index) => {
            setTimeout(() => {
                if (!silencio) agregarNotificacion(notif);
            }, index * 500);
        });

        setMenuAbierto(false);
    };

    const toggleSilencio = () => {
        setSilencio(!silencio);
    };

    return (
        <div ref={menuRef} className="fixed bottom-6 right-6 z-9997 flex flex-col items-end gap-6">
            {/* Menú desplegable */}
            {menuAbierto && (
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-300/40 dark:border-gray-600/40 rounded-xl shadow-2xl overflow-hidden min-w-[220px] animate-in slide-in-from-bottom-2 duration-200 space-y-1">
                    <button
                        onClick={toggleSilencio}
                        className="w-full px-5 py-3.5 flex items-center gap-3 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
                    >
                        {silencio ? (
                            <>
                                <BellOff className="h-5 w-5 text-red-600 dark:text-red-400" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Activar notificaciones</span>
                            </>
                        ) : (
                            <>
                                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Silenciar</span>
                            </>
                        )}
                    </button>

                    <div className="border-t border-gray-200/40 dark:border-gray-700/40" />

                    <button
                        onClick={probarNotificacion}
                        disabled={silencio}
                        className="w-full px-5 py-3.5 flex items-center gap-3 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Mostrar una</span>
                    </button>

                    <div className="border-t border-gray-200/40 dark:border-gray-700/40" />

                    <button
                        onClick={mostrarTodas}
                        disabled={silencio}
                        className="w-full px-5 py-3.5 flex items-center gap-3 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <List className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Mostrar todas</span>
                    </button>
                </div>
            )}

            {/* Botón flotante */}
            <button
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-300/40 dark:border-gray-600/40 hover:bg-white dark:hover:bg-gray-700 transition-all shadow-2xl"
                title="Notificaciones de prueba"
                aria-label="Menú de notificaciones"
            >
                {silencio ? (
                    <BellOff className="h-6 w-6 text-red-600 dark:text-red-400" />
                ) : (
                    <Bell className="h-6 w-6 text-slate-700 dark:text-lime-500" />
                )}
                
                {/* Badge de notificaciones sin leer */}
                {noLeidas > 0 && !silencio && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-800">
                        {noLeidas > 9 ? '9+' : noLeidas}
                    </span>
                )}
            </button>
        </div>
    );
};

export default NotificationFloatingButton;
