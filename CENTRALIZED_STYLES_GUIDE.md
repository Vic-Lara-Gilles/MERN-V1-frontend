# 📘 Guía de Estilos Centralizados

## ✅ Sistema Implementado: shadcn/ui con Paleta Personalizada

Todos los estilos del proyecto están centralizados en componentes reutilizables ubicados en `src/components/ui/`.

---

## 🎨 Paleta de Colores del Proyecto

### Colores Principales
- **Light Mode**: `slate-900` (botones, texto principal)
- **Dark Mode**: `lime-500/lime-600` (botones, acentos)

### Backgrounds
- **Páginas**: `gray-200` (light) / `gray-900` (dark)
- **Cards**: `white` (light) / `gray-800` (dark)
- **Inputs**: `white` (light) / `gray-700` (dark)

### Borders
- **Light**: `slate-200` (inputs) / `transparent` (cards)
- **Dark**: `gray-600` (inputs) / `gray-700` (cards)

---

## 🧩 Componentes Disponibles

### 1. **Button** (`@/components/ui/button`)

#### Variantes:
```jsx
import { Button } from '@/components/ui/button';

// Default (slate-900/lime-600)
<Button>Guardar</Button>

// Destructive (rojo)
<Button variant="destructive">Eliminar</Button>

// Outline (borde coloreado, fondo transparente)
<Button variant="outline">Cancelar</Button>

// Secondary (gris)
<Button variant="secondary">Secundario</Button>

// Ghost (sin fondo)
<Button variant="ghost">Ghost</Button>

// Link (subrayado)
<Button variant="link">Ver más</Button>
```

#### Tamaños:
```jsx
<Button size="sm">Pequeño</Button>
<Button size="default">Normal</Button>
<Button size="lg">Grande</Button>
<Button size="icon">🔍</Button>
```

---

### 2. **Card** (`@/components/ui/card`)

```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Título de la Card</CardTitle>
    <CardDescription>Descripción opcional</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenido principal...</p>
  </CardContent>
  <CardFooter>
    <Button>Acción</Button>
  </CardFooter>
</Card>
```

**Estilos automáticos:**
- Background: `white/gray-800`
- Border: `transparent/gray-700`
- Shadow: `shadow-md`
- Border radius: `rounded-lg`

---

### 3. **Input** (`@/components/ui/input`)

```jsx
import { Input } from '@/components/ui/input';

<Input 
  type="text" 
  placeholder="Escribe aquí..." 
/>

<Input 
  type="email" 
  placeholder="correo@ejemplo.com"
  className="w-full" // Puedes agregar clases adicionales
/>
```

**Estilos automáticos:**
- Height: `h-10`
- Padding: `px-4 py-2`
- Border: `slate-200/gray-600`
- Focus ring: `slate-900/lime-500`

---

### 4. **Textarea** (`@/components/ui/textarea`)

```jsx
import { Textarea } from '@/components/ui/textarea';

<Textarea 
  placeholder="Escribe un mensaje largo..."
  rows={5}
/>
```

**Estilos automáticos:**
- Min height: `120px`
- Mismo estilo que Input
- Resize: `resize-y` (solo vertical)

---

### 5. **Select** (`@/components/ui/select`)

```jsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selecciona una opción" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="opcion1">Opción 1</SelectItem>
    <SelectItem value="opcion2">Opción 2</SelectItem>
    <SelectItem value="opcion3">Opción 3</SelectItem>
  </SelectContent>
</Select>
```

---

### 6. **FormField** (`@/components/ui/form-field`) ✨ NUEVO

Combina Label + Input/Textarea + mensajes de error en un solo componente.

```jsx
import { FormField } from '@/components/ui/form-field';

// Input normal
<FormField 
  label="Nombre completo"
  placeholder="Ingresa tu nombre"
  required
/>

// Con error
<FormField 
  label="Email"
  type="email"
  placeholder="correo@ejemplo.com"
  error="El email no es válido"
  required
/>

// Textarea
<FormField 
  label="Descripción"
  textarea
  placeholder="Escribe una descripción..."
  rows={4}
/>
```

**Props disponibles:**
- `label`: Texto del label
- `error`: Mensaje de error (rojo)
- `required`: Muestra asterisco rojo
- `textarea`: Usa Textarea en lugar de Input
- Todos los props de Input/Textarea

---

### 7. **PageContainer** y **PageContent** (`@/components/ui/page-container`) ✨ NUEVO

Reemplazan los divs repetitivos en cada página.

```jsx
import { PageContainer, PageContent } from '@/components/ui/page-container';
import Header from '@/components/Header';

const MiPagina = () => {
  return (
    <PageContainer>
      <Header 
        icon={<IconoAqui />}
        title="Título de Página"
        subtitle="Subtítulo"
      />
      
      <PageContent>
        {/* Tu contenido aquí */}
        <Card>...</Card>
      </PageContent>
    </PageContainer>
  );
};
```

**Estilos automáticos:**
- `PageContainer`: `bg-gray-200 dark:bg-gray-900 min-h-screen`
- `PageContent`: `px-6 pb-6 space-y-6`

---

### 8. **StatsCard** (`@/components/ui/stats-card`) ✨ NUEVO

Card para estadísticas con icono y link opcional.

```jsx
import { StatsCard } from '@/components/ui/stats-card';
import { PawPrint } from 'lucide-react';

<StatsCard
  title="Mis Mascotas"
  value={12}
  icon={PawPrint}
  variant="blue"
  linkText="Ver todas"
  linkHref="/portal/mis-mascotas"
/>
```

**Variantes de color:**
- `blue` (default)
- `purple`
- `green`
- `orange`

**Props:**
- `title`: Título pequeño arriba
- `value`: Número grande
- `icon`: Componente de icono (lucide-react)
- `variant`: Color del icono y link
- `linkText`: Texto del enlace
- `linkHref`: URL del enlace
- `children`: Contenido personalizado

---

## 📝 Ejemplos Completos

### Ejemplo 1: Formulario de Login

```jsx
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Login = () => {
  const [errors, setErrors] = useState({});

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField 
          label="Email"
          type="email"
          placeholder="correo@ejemplo.com"
          error={errors.email}
          required
        />
        
        <FormField 
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          error={errors.password}
          required
        />
        
        <Button className="w-full">Ingresar</Button>
      </CardContent>
    </Card>
  );
};
```

### Ejemplo 2: Dashboard con Stats

```jsx
import { PageContainer, PageContent } from '@/components/ui/page-container';
import { StatsCard } from '@/components/ui/stats-card';
import Header from '@/components/Header';
import { Home, PawPrint, Calendar } from 'lucide-react';

const Dashboard = () => {
  return (
    <PageContainer>
      <Header 
        icon={<Home className="h-8 w-8 text-slate-900 dark:text-lime-500" />}
        title="Dashboard"
        subtitle="Panel de control"
      />
      
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Mascotas"
            value={24}
            icon={PawPrint}
            variant="blue"
          />
          
          <StatsCard
            title="Citas Hoy"
            value={8}
            icon={Calendar}
            variant="purple"
          />
        </div>
      </PageContent>
    </PageContainer>
  );
};
```

---

## 🎯 Ventajas de este Sistema

### ✅ Centralizado
- Cambias un componente, se actualiza en TODO el proyecto
- No más clases repetidas en cada archivo

### ✅ Consistente
- Todos los botones se ven iguales
- Todos los inputs tienen el mismo estilo
- Paleta de colores unificada

### ✅ Mantenible
- Modificas `button.jsx` una vez, afecta todo el proyecto
- Fácil agregar variantes nuevas

### ✅ Tipo-seguro
- Props validadas con TypeScript (si usas TS)
- Autocompletado en el editor

---

## 🔄 Migración de Código Existente

### Antes (clases dispersas):
```jsx
<button className="bg-slate-900 dark:bg-lime-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-lime-700 transition-colors">
  Guardar
</button>
```

### Después (componente centralizado):
```jsx
<Button>Guardar</Button>
```

---

### Antes (inputs manuales):
```jsx
<div>
  <label className="text-slate-900 dark:text-white">
    Nombre <span className="text-red-500">*</span>
  </label>
  <input 
    type="text"
    className="w-full px-4 py-2 border border-slate-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500"
  />
  {error && <p className="text-sm text-red-600">{error}</p>}
</div>
```

### Después (componente centralizado):
```jsx
<FormField 
  label="Nombre"
  error={error}
  required
/>
```

---

## 📦 Componentes por Crear (Futuro)

Si necesitas más componentes, puedes crear:

- `AlertBox` - Alertas de éxito/error/warning
- `Modal` - Diálogos modales (ya tienes `dialog.jsx` de shadcn)
- `Table` - Tablas con estilos consistentes (ya tienes `table.jsx`)
- `Badge` - Badges de estado (ya tienes `badge.jsx`)
- `Tabs` - Pestañas (como en MiHistorial)

---

## 🚀 Próximos Pasos

1. ✅ Componentes base creados y configurados
2. ⏳ Actualizar páginas existentes para usar los nuevos componentes
3. ⏳ Documentar componentes adicionales (Badge, Dialog, Table)
4. ⏳ Eliminar clases Tailwind repetidas de archivos existentes

---

## 💡 Reglas de Uso

1. **SIEMPRE usa componentes de `@/components/ui/`** en lugar de elementos HTML nativos
2. **NO agregues clases de Tailwind directamente** a menos que sea necesario para layout específico
3. **Si necesitas un estilo nuevo**, crea una variante en el componente, no una clase nueva
4. **Para estilos únicos**, usa la prop `className` para extender, no reemplazar

---

## 📞 Soporte

Si necesitas agregar un componente nuevo o modificar uno existente, consulta:
- Documentación de shadcn: https://ui.shadcn.com/
- Este archivo para patrones del proyecto
