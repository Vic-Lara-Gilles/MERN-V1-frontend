# Utils

Utilidades JavaScript puras sin dependencias de React.

## Estructura

```
utils/
├── themeStyles.js    # Utilidades para gestión de temas
└── README.md         # Esta documentación
```

## Convenciones

- **Solo JavaScript puro**: Sin hooks ni componentes React
- **Funciones puras**: Sin efectos secundarios cuando sea posible
- **JSDoc**: Todas las funciones exportadas deben tener documentación
- **Testeable**: Funciones fáciles de testear en aislamiento

## Diferencia con `/lib`

- **`/utils`**: Utilidades propias del proyecto
- **`/lib`**: Configuraciones y helpers de librerías externas (ej: shadcn/ui)

## Uso

```javascript
// Importar directamente del archivo
import { applyThemeStyles, getSavedTheme } from '@/utils/themeStyles'
```
