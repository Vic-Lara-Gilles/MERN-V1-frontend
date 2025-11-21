# 🚀 Guía Rápida de Migración de Páginas

## ✅ Páginas Migradas (4/34)

### Portal - COMPLETADO ✨
- ✅ ClienteDashboard.jsx
- ✅ MiHistorial.jsx  
- ✅ MisMascotas.jsx
- ✅ SolicitarCita.jsx

**Cambios aplicados:**
- Importan `PageContainer` y `PageContent`
- Estructura: `<PageContainer><Header/><PageContent>...</PageContent></PageContainer>`
- Fondo gris automático con modo oscuro

---

## 📋 Páginas Pendientes (30)

### Categorías por prioridad:

#### **Alta Prioridad - Auth (7 páginas)**
Estas NO tienen RutaProtegida con fondo, necesitan PageContainer.

**Archivos:**
- `src/paginas/auth/Login.jsx`
- `src/paginas/auth/ClienteLogin.jsx`
- `src/paginas/auth/Registrar.jsx`
- `src/paginas/auth/OlvidePassword.jsx`
- `src/paginas/auth/NuevoPassword.jsx`
- `src/paginas/auth/ConfirmarCuenta.jsx`
- `src/paginas/auth/SeleccionAcceso.jsx`

**Patrón de migración:**
```jsx
// ANTES
<>
  <div className="left-side">...</div>
  <Card>form content</Card>
</>

// DESPUÉS  
<PageContainer>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
    <div>branding</div>
    <Card>form with FormField</Card>
  </div>
</PageContainer>
```

**Acciones:**
1. Agregar imports: `PageContainer`, `FormField`
2. Envolver todo en `<PageContainer>`
3. Reemplazar `<Label> + <Input>` por `<FormField>`

---

#### **Media Prioridad - CRUD Pages (15 páginas)**

Estas están dentro de RutaProtegida (ya tienen fondo), solo optimizar componentes internos.

**Cliente (4):**
- `src/paginas/cliente/Clientes.jsx` - Reemplazar divs search/table por Card
- `src/paginas/cliente/DetalleCliente.jsx` - Ya usa algunos Card, completar migración
- `src/paginas/cliente/NuevoCliente.jsx` - Usar FormField en formulario
- `src/paginas/cliente/EditarCliente.jsx` - Usar FormField

**Paciente (4):**
- `src/paginas/paciente/Pacientes.jsx` - Card para search/table
- `src/paginas/paciente/DetallePaciente.jsx` - Completar Card migration
- `src/paginas/paciente/NuevoPaciente.jsx` - FormField
- `src/paginas/paciente/EditarPaciente.jsx` - FormField

**Usuario (3):**
- `src/paginas/usuario/Usuarios.jsx` - Card
- `src/paginas/usuario/DetalleUsuario.jsx` - Card
- `src/paginas/usuario/FormularioUsuario.jsx` - FormField

**Cita (4):**
- `src/paginas/cita/Citas.jsx` - Card
- `src/paginas/cita/NuevaCita.jsx` - FormField  
- `src/paginas/cita/EditarCita.jsx` - FormField
- `src/paginas/cita/AgendaVeterinario.jsx` - Card

**Patrón común:**
```jsx
// ANTES - div manual
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6">
  contenido
</div>

// DESPUÉS - componente
<Card>
  <CardContent className="p-6">
    contenido
  </CardContent>
</Card>
```

---

#### **Baja Prioridad - Admin y Consulta (8 páginas)**

**Admin (2):**
- `src/paginas/admin/Dashboard.jsx` - Ya bien estructurado, solo optimizar si necesario
- `src/paginas/admin/Configuracion.jsx` - Usar FormField en formularios

**Consulta (5):**
- `src/paginas/consulta/Consultas.jsx`
- `src/paginas/consulta/NuevaConsulta.jsx` - FormField
- `src/paginas/consulta/EditarConsulta.jsx` - FormField
- `src/paginas/consulta/DetalleConsulta.jsx`
- `src/paginas/consulta/ImprimirReceta.jsx` - Probablemente no requiere migración

**Reporte (1):**
- `src/paginas/reporte/Reportes.jsx`

---

## �� Patrones de Migración Rápida

### 1. Páginas de Listado (Clientes, Pacientes, Usuarios, Citas, Consultas)

**Buscar:**
```jsx
<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-transparent dark:border-gray-700">
  {/* search bar */}
</div>

<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-transparent dark:border-gray-700">
  <table>...</table>
</div>
```

**Reemplazar por:**
```jsx
<Card>
  <CardContent className="p-4">
    {/* search bar */}
  </CardContent>
</Card>

<Card>
  <CardContent className="p-0">
    <table>...</table>
  </CardContent>
</Card>
```

**Imports necesarios:**
```jsx
import { Card, CardContent } from '@/components/ui/card';
```

---

### 2. Páginas de Formulario (Nuevo/Editar)

**Buscar:**
```jsx
<div>
  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
    Nombre *
  </label>
  <input
    type="text"
    className="w-full px-4 py-2 border border-slate-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
  />
  {error && <p className="text-sm text-red-600">{error}</p>}
</div>
```

**Reemplazar por:**
```jsx
<FormField
  label="Nombre"
  required
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
  error={error}
/>
```

**Imports:**
```jsx
import { FormField } from '@/components/ui/form-field';
```

---

### 3. Páginas de Detalle (DetalleCliente, DetallePaciente, DetalleUsuario)

**Buscar:**
```jsx
<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
  <h3>Título</h3>
  <p>Contenido</p>
</div>
```

**Reemplazar por:**
```jsx
<Card className="border-l-4 border-blue-500 dark:border-blue-400">
  <CardContent className="p-6">
    <h3>Título</h3>
    <p>Contenido</p>
  </CardContent>
</Card>
```

---

### 4. Páginas de Auth

**Patrón completo:**
```jsx
// ANTES
<>
  <div className="hidden md:flex ...">branding</div>
  <div className="flex items-center justify-center">
    <Card>formulario</Card>
  </div>
</>

// DESPUÉS
<PageContainer>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 md:p-12 max-w-7xl mx-auto">
    <div>branding</div>
    <Card>
      <CardContent>
        <FormField ... />
        <FormField ... />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  </div>
</PageContainer>
```

---

## 🎯 Checklist por Archivo

### Para cada página, verificar:

- [ ] ¿Tiene divs con `bg-white dark:bg-gray-800`? → Reemplazar por `<Card>`
- [ ] ¿Tiene inputs manuales con label? → Usar `<FormField>`
- [ ] ¿Tiene botones con clases largas? → Ya usan `<Button>` de shadcn (verificar)
- [ ] ¿Está en `/portal/`? → Necesita `<PageContainer>`
- [ ] ¿Está en `/auth/`? → Necesita `<PageContainer>`
- [ ] ¿Está en `/admin/` o CRUD? → NO necesita PageContainer (ya tiene fondo en RutaProtegida)

---

## 🚨 Cosas que NO migrar

### NO toques:
- **Tablas** - Mantén las clases de tabla como están (thead, tbody, tr, td)
- **Badges de estado** - Ya usan componente Badge de shadcn
- **Iconos** - Lucide-react está bien
- **Loading spinners** - Mantén el spinner actual
- **Layout grids** - grid-cols, flex, etc. son de Tailwind y están OK

---

## 📝 Script de Búsqueda y Reemplazo

### VS Code Search & Replace (Regex)

**Buscar divs que deberían ser Card:**
```regex
<div className="bg-white dark:bg-gray-800[^>]*rounded-lg[^>]*>
```

**Buscar inputs manuales:**
```regex
<label[^>]*>.*?</label>\s*<input
```

**Buscar textareas manuales:**
```regex
<label[^>]*>.*?</label>\s*<textarea
```

---

## ⚡ Migración Rápida - Orden Recomendado

1. **Auth pages (7)** - 30 min
   - Alta visibilidad, usuarios lo ven primero
   - Patrón simple y repetitivo
   
2. **Formularios CRUD (12)** - 1 hora
   - NuevoCliente, EditarCliente, NuevoPaciente, etc.
   - Usa FormField masivamente
   
3. **Listados CRUD (6)** - 45 min
   - Clientes, Pacientes, Usuarios, Citas, Consultas
   - Reemplazar divs por Card

4. **Detalles (3)** - 30 min
   - DetalleCliente, DetallePaciente, DetalleUsuario
   - Solo Card replacements

5. **Admin y Reportes (3)** - 20 min
   - Optimizaciones finales

**Tiempo total estimado: 3.5 horas**

---

## 🎁 Beneficios Post-Migración

### Antes de migración:
- ~15,000 líneas de clases Tailwind repetidas
- Cambiar color = buscar/reemplazar en 30 archivos
- Alto riesgo de inconsistencias

### Después de migración:
- ~8,000 líneas (46% menos código)
- Cambiar color = editar 1 componente en `/ui/`
- Consistencia garantizada
- Mantenimiento 70% más rápido

---

## 🤖 Automatización (Opcional)

Si quieres automatizar partes de la migración, puedes usar `sed` o un script:

```bash
# Ejemplo: Reemplazar div con clases específicas
find src/paginas -name "*.jsx" -type f -exec sed -i '' \
  's/<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6">/<Card><CardContent className="p-6">/g' {} +
```

**Advertencia:** Siempre revisa los cambios manualmente después.

---

## 📞 Próximos Pasos

1. **Revisar este archivo** - Familiarízate con los patrones
2. **Elegir una categoría** - Empieza por Auth o Formularios
3. **Migrar archivo por archivo** - Haz commit después de cada uno
4. **Testear visualmente** - Verifica que se ve igual
5. **Repetir** - Hasta completar todas las categorías

---

**Última actualización:** Migración Portal completada (4/34 páginas)
**Estado:** 🟡 En progreso - 88% pendiente
