import { createContext, useState, useCallback } from 'react';

export const NotificacionesContext = createContext();

export const NotificacionesProvider = ({ children }) => {
    const [notificaciones, setNotificaciones] = useState([]);

    const removerNotificacion = useCallback((id) => {
        setNotificaciones(prev => prev.filter(n => n.id !== id));
    }, []);

    const agregarNotificacion = useCallback((notificacion) => {
        const id = Date.now() + Math.random();
        const nuevaNotificacion = {
            id,
            timestamp: new Date(),
            leida: false,
            ...notificacion
        };

        setNotificaciones(prev => [nuevaNotificacion, ...prev]);

        // Auto-remover después de 8 segundos
        setTimeout(() => {
            removerNotificacion(id);
        }, 8000);

        return id;
    }, [removerNotificacion]);

    const marcarComoLeida = useCallback((id) => {
        setNotificaciones(prev =>
            prev.map(n => n.id === id ? { ...n, leida: true } : n)
        );
    }, []);

    const marcarTodasLeidas = useCallback(() => {
        setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
    }, []);

    const limpiarNotificaciones = useCallback(() => {
        setNotificaciones([]);
    }, []);

    // Notificación de confirmación de cuenta
    const notificarConfirmacionCuenta = useCallback((usuario) => {
        return agregarNotificacion({
            tipo: 'confirmacion',
            titulo: 'Nueva cuenta confirmada',
            mensaje: `${usuario.nombre} (${usuario.rol}) ha confirmado su cuenta`,
            usuario,
            icono: 'check-circle'
        });
    }, [agregarNotificacion]);

    const value = {
        notificaciones,
        agregarNotificacion,
        removerNotificacion,
        marcarComoLeida,
        marcarTodasLeidas,
        limpiarNotificaciones,
        notificarConfirmacionCuenta,
        noLeidas: notificaciones.filter(n => !n.leida).length
    };

    return (
        <NotificacionesContext.Provider value={value}>
            {children}
        </NotificacionesContext.Provider>
    );
};
