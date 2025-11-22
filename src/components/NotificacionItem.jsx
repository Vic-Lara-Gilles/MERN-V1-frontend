import { CheckCircle, UserCheck, Users, X, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Notification, NotificationTitle, NotificationDescription } from '@/components/ui/notification';

// Configuración de tipos de notificación
const NOTIFICATION_CONFIG = {
    confirmacion: {
        icono: CheckCircle,
        variant: 'success',
        colorIcono: 'text-green-600 dark:text-green-400'
    },
    usuario: {
        icono: UserCheck,
        variant: 'info',
        colorIcono: 'text-blue-600 dark:text-blue-400'
    },
    cliente: {
        icono: Users,
        variant: 'warning',
        colorIcono: 'text-purple-600 dark:text-purple-400'
    }
};

const NotificacionItem = ({ notificacion, onClose, onClick }) => {
    const [visible, setVisible] = useState(false);
    const [saliendo, setSaliendo] = useState(false);

    useEffect(() => {
        // Animación de entrada
        setTimeout(() => setVisible(true), 10);
    }, []);

    const handleClose = () => {
        setSaliendo(true);
        setTimeout(() => onClose(notificacion.id), 300);
    };

    const config = NOTIFICATION_CONFIG[notificacion.tipo] || NOTIFICATION_CONFIG.confirmacion;
    const IconComponent = config.icono;

    const getTiempoTranscurrido = () => {
        const ahora = new Date();
        const diff = Math.floor((ahora - new Date(notificacion.timestamp)) / 1000);
        
        if (diff < 60) return 'Ahora';
        if (diff < 3600) return `Hace ${Math.floor(diff / 60)}m`;
        if (diff < 86400) return `Hace ${Math.floor(diff / 3600)}h`;
        return `Hace ${Math.floor(diff / 86400)}d`;
    };

    return (
        <Notification
            variant={config.variant}
            isUnread={!notificacion.leida}
            className={`min-w-[320px] max-w-md cursor-pointer transition-all duration-300 ${
                visible && !saliendo ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
            onClick={() => onClick && onClick(notificacion)}
        >
            <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                    <IconComponent className={`h-5 w-5 ${config.colorIcono}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <NotificationTitle>{notificacion.titulo}</NotificationTitle>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClose();
                            }}
                            className="shrink-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            aria-label="Cerrar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    
                    <NotificationDescription className="mb-2">
                        {notificacion.mensaje}
                    </NotificationDescription>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{getTiempoTranscurrido()}</span>
                    </div>
                </div>
            </div>
        </Notification>
    );
};

export default NotificacionItem;
