# Sistema de Notificaciones - Documentación

## 📋 Descripción General

Sistema completo de notificaciones en tiempo real para VetManager. Permite mostrar alertas visuales cuando usuarios y clientes confirman sus cuentas, con un historial completo en la página de Reportes.

## 🎯 Características

- ✅ **Notificaciones flotantes** en esquina superior derecha
- ✅ **Auto-dismiss** después de 8 segundos
- ✅ **Animaciones** suaves de entrada/salida
- ✅ **Marcado de leídas/no leídas** con indicador visual
- ✅ **Historial completo** en página de Reportes
- ✅ **Soporte para múltiples tipos**: confirmación, usuario, cliente
- ✅ **Portal-based** rendering (z-index alto)

## 📦 Componentes Creados

### 1. `NotificacionesProvider.jsx`
Context API que gestiona el estado global de notificaciones.

**Funciones principales:**
- `agregarNotificacion(notificacion)` - Agrega nueva notificación
- `removerNotificacion(id)` - Elimina notificación por ID
- `marcarComoLeida(id)` - Marca como leída
- `marcarTodasLeidas()` - Marca todas como leídas
- `limpiarNotificaciones()` - Limpia todas
- `notificarConfirmacionCuenta(usuario)` - Helper para confirmaciones

### 2. `useNotificaciones.jsx`
Hook personalizado para acceder al contexto.

```javascript
const { 
    notificaciones, 
    agregarNotificacion, 
    noLeidas,
    notificarConfirmacionCuenta 
} = useNotificaciones();
```

### 3. `NotificacionItem.jsx`
Componente visual de cada notificación individual.

**Props:**
- `notificacion` - Objeto con datos de la notificación
- `onClose` - Callback al cerrar
- `onClick` - Callback al hacer click

**Características:**
- Animación de entrada/salida (slide from right)
- Botón de cierre manual
- Indicador de tiempo transcurrido
- Borde verde para notificaciones no leídas

### 4. `NotificacionesContainer.jsx`
Contenedor que renderiza todas las notificaciones activas.

**Características:**
- Renderizado con `createPortal`
- Posición fija en esquina superior derecha
- Máximo 5 notificaciones visibles
- z-index 9998 (debajo de Alerta que tiene 9999)

## 🚀 Uso Básico

### Ejemplo 1: Notificación de Confirmación de Cuenta

```javascript
import useNotificaciones from '../hooks/useNotificaciones';

function MiComponente() {
    const { notificarConfirmacionCuenta } = useNotificaciones();
    
    const handleConfirmacion = (usuario) => {
        notificarConfirmacionCuenta({
            nombre: 'Dr. Juan Pérez',
            rol: 'veterinario'
        });
    };
}
```

### Ejemplo 2: Notificación Personalizada

```javascript
import useNotificaciones from '../hooks/useNotificaciones';

function MiComponente() {
    const { agregarNotificacion } = useNotificaciones();
    
    const handleEvento = () => {
        agregarNotificacion({
            tipo: 'usuario',
            titulo: 'Nueva acción',
            mensaje: 'El usuario ha realizado una acción importante',
            icono: 'user-check'
        });
    };
}
```

## 📊 Estructura de Datos

### Objeto Notificación

```javascript
{
    id: Number,                    // Auto-generado
    tipo: String,                  // 'confirmacion' | 'usuario' | 'cliente'
    titulo: String,                // Título de la notificación
    mensaje: String,               // Mensaje descriptivo
    timestamp: Date,               // Fecha/hora de creación
    leida: Boolean,                // Estado de lectura
    icono: String,                 // Tipo de icono a mostrar
    usuario: Object                // Datos adicionales del usuario (opcional)
}
```

## 🎨 Tipos de Notificaciones

### 1. Confirmación (verde)
```javascript
{
    tipo: 'confirmacion',
    titulo: 'Nueva cuenta confirmada',
    mensaje: 'Dr. Juan Pérez (veterinario) ha confirmado su cuenta'
}
```

### 2. Usuario (azul)
```javascript
{
    tipo: 'usuario',
    titulo: 'Acción de usuario',
    mensaje: 'Descripción de la acción'
}
```

### 3. Cliente (morado)
```javascript
{
    tipo: 'cliente',
    titulo: 'Acción de cliente',
    mensaje: 'Descripción de la acción'
}
```

## 📍 Integración en App.jsx

```javascript
import { NotificacionesProvider } from './context/NotificacionesProvider';
import NotificacionesContainer from './components/NotificacionesContainer';

function App() {
    return (
        <AuthProvider>
            <NotificacionesProvider>
                {/* Resto de providers */}
                <NotificacionesContainer />
                {/* Resto de la app */}
            </NotificacionesProvider>
        </AuthProvider>
    );
}
```

## 📈 Historial en Reportes

La página de Reportes (`/admin/reportes`) incluye una tabla completa con:

- ✅ Estado (icono de confirmación)
- ✅ Tipo (Usuario/Cliente con badge)
- ✅ Nombre completo
- ✅ Email
- ✅ Rol o RUT
- ✅ Fecha y hora de confirmación

**Características:**
- Muestra últimas 50 aprobaciones
- Ordenadas por fecha descendente
- Filtradas solo confirmadas/verificadas
- Responsive y con dark mode

## 🔔 Notificaciones en Tiempo Real (Futuro)

Para implementar notificaciones en tiempo real cuando un usuario confirma su cuenta:

### Opción 1: Polling

```javascript
useEffect(() => {
    const interval = setInterval(() => {
        // Consultar API cada X segundos
        checkNuevasConfirmaciones();
    }, 30000); // 30 segundos
    
    return () => clearInterval(interval);
}, []);
```

### Opción 2: WebSockets

```javascript
// Backend con Socket.io
io.on('connection', (socket) => {
    socket.on('cuenta_confirmada', (usuario) => {
        socket.broadcast.emit('nueva_confirmacion', usuario);
    });
});

// Frontend
socket.on('nueva_confirmacion', (usuario) => {
    notificarConfirmacionCuenta(usuario);
});
```

### Opción 3: Server-Sent Events (SSE)

```javascript
const eventSource = new EventSource('/api/notificaciones/stream');

eventSource.addEventListener('confirmacion', (event) => {
    const usuario = JSON.parse(event.data);
    notificarConfirmacionCuenta(usuario);
});
```

## 🎯 Casos de Uso

### 1. Cuando un usuario confirma su email
```javascript
// En ConfirmarCuenta.jsx
const { notificarConfirmacionCuenta } = useNotificaciones();

// Después de confirmar
notificarConfirmacionCuenta({
    nombre: data.usuario.nombre,
    rol: data.usuario.rol
});
```

### 2. Cuando un cliente confirma su email
```javascript
// En portal/ConfirmarEmail.jsx
agregarNotificacion({
    tipo: 'cliente',
    titulo: 'Cliente verificado',
    mensaje: `${cliente.nombre} ${cliente.apellido} ha verificado su email`
});
```

### 3. Badge de notificaciones no leídas
```javascript
const { noLeidas } = useNotificaciones();

return (
    <button className="relative">
        <Bell />
        {noLeidas > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">
                {noLeidas}
            </span>
        )}
    </button>
);
```

## �� Personalización

### Cambiar duración de auto-dismiss

En `NotificacionesProvider.jsx`:
```javascript
// Cambiar de 8000ms a otro valor
setTimeout(() => {
    removerNotificacion(id);
}, 5000); // 5 segundos
```

### Cambiar posición

En `NotificacionesContainer.jsx`:
```javascript
// Cambiar "top-20 right-4" a otra posición
<div className="fixed top-20 left-4 ...">
```

### Agregar más tipos

En `NotificacionItem.jsx`:
```javascript
const getIcono = () => {
    switch (notificacion.tipo) {
        case 'confirmacion':
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'alerta':
            return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
        case 'error':
            return <XCircle className="h-5 w-5 text-red-500" />;
        // ...más tipos
    }
};
```

## 🧪 Testing

### Prueba manual rápida

Agregar en cualquier componente:
```javascript
const { agregarNotificacion } = useNotificaciones();

<button onClick={() => agregarNotificacion({
    tipo: 'confirmacion',
    titulo: 'Prueba',
    mensaje: 'Esta es una notificación de prueba'
})}>
    Probar Notificación
</button>
```

## 📝 Notas Importantes

1. **z-index**: NotificacionesContainer usa z-index 9998, mientras que Alerta usa 9999
2. **Portal**: Se renderiza fuera del árbol DOM normal
3. **Persistencia**: Las notificaciones NO persisten en localStorage (se pierden al recargar)
4. **Límite**: Se muestran máximo 5 notificaciones simultáneas
5. **Performance**: Usa `useCallback` para optimizar re-renders

## 🔧 Troubleshooting

### Las notificaciones no aparecen
- Verificar que `NotificacionesProvider` envuelva el componente
- Verificar que `NotificacionesContainer` esté en App.jsx
- Revisar console para errores

### Las notificaciones no se auto-ocultan
- Verificar que el timeout no se esté limpiando prematuramente
- Revisar que `autoDismiss` no esté en `false`

### z-index issues
- Verificar que no haya elementos con z-index mayor a 9998
- Usar portales para evitar conflictos de stacking context

## 📚 Recursos Adicionales

- [React Context API](https://react.dev/reference/react/useContext)
- [React Portals](https://react.dev/reference/react-dom/createPortal)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Última actualización**: Noviembre 2025
**Versión**: 1.0.0
**Autor**: VetManager Team
