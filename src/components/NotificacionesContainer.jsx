import { createPortal } from 'react-dom';
import useNotificaciones from '../hooks/useNotificaciones';
import NotificacionItem from './NotificacionItem';

const NotificacionesContainer = () => {
    const { notificaciones, removerNotificacion, marcarComoLeida } = useNotificaciones();

    const handleClick = (notificacion) => {
        if (!notificacion.leida) {
            marcarComoLeida(notificacion.id);
        }
    };

    if (notificaciones.length === 0) return null;

    return createPortal(
        <div className="fixed top-20 right-4 z-9998 flex flex-col gap-3 pointer-events-none">
            <div className="flex flex-col gap-3 pointer-events-auto">
                {notificaciones.slice(0, 5).map(notificacion => (
                    <NotificacionItem
                        key={notificacion.id}
                        notificacion={notificacion}
                        onClose={removerNotificacion}
                        onClick={handleClick}
                    />
                ))}
            </div>
        </div>,
        document.body
    );
};

export default NotificacionesContainer;
