# 🔄 Ejemplo de Migración: ClienteDashboard.jsx

## Antes (con clases Tailwind directas)

```jsx
// Muchas clases repetidas
<div className="bg-gray-200 dark:bg-gray-900 min-h-screen">
  <Header ... />
  
  <div className="px-6 pb-6 space-y-6">
    {/* Stats cards con divs manuales */}
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-transparent dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Mis Mascotas</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalMascotas}</p>
        </div>
        <PawPrint className="h-10 w-10 text-blue-500 dark:text-blue-400" />
      </div>
      <Link to="/portal/mis-mascotas" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 mt-2">
        Ver todas →
      </Link>
    </div>
  </div>
</div>
```

## Después (con componentes centralizados)

```jsx
import { PageContainer, PageContent } from '@/components/ui/page-container';
import { StatsCard } from '@/components/ui/stats-card';
import { Card, CardContent } from '@/components/ui/card';

// Mucho más limpio y mantenible
<PageContainer>
  <Header ... />
  
  <PageContent>
    {/* Stats con componente reutilizable */}
    <StatsCard
      title="Mis Mascotas"
      value={totalMascotas}
      icon={PawPrint}
      variant="blue"
      linkText="Ver todas"
      linkHref="/portal/mis-mascotas"
    />
    
    {/* Card info personal */}
    <Card>
      <CardContent className="p-6">
        {/* contenido */}
      </CardContent>
    </Card>
  </PageContent>
</PageContainer>
```

## Beneficios de la migración:

### Antes:
- **170+ caracteres** de clases Tailwind repetidas por cada stat card
- **Difícil de mantener**: cambiar el color requiere buscar y reemplazar en múltiples lugares
- **Propenso a errores**: olvidar una clase dark: rompe el tema
- **Código repetitivo**: cada card tiene las mismas clases

### Después:
- **~100 caracteres** por stat card (40% menos código)
- **Fácil de mantener**: cambiar color se hace en `stats-card.jsx` una vez
- **Consistente**: imposible olvidar clases, el componente las tiene todas
- **Reutilizable**: mismo componente en todas las páginas

---

## Comparación línea por línea

| Aspecto | Antes (Tailwind directo) | Después (Componentes) |
|---------|--------------------------|----------------------|
| Líneas de código | ~230 | ~180 (-22%) |
| Clases Tailwind | ~60 repetidas | ~10 únicas |
| Mantenibilidad | Baja (cambios en múltiples archivos) | Alta (cambios en 1 componente) |
| Legibilidad | Media (mucho ruido visual) | Alta (código semántico) |
| Errores potenciales | Alto (olvidar clases dark:) | Bajo (todo centralizado) |
| Tiempo de desarrollo | Lento (copiar/pegar clases) | Rápido (importar componente) |

---

## Próximas páginas a migrar

1. **MisMascotas.jsx** - Usar StatsCard y Card
2. **MiHistorial.jsx** - Usar Card para tabla
3. **SolicitarCita.jsx** - Usar FormField en lugar de inputs manuales
4. **Dashboard (admin)** - Usar PageContainer y StatsCard
5. **Formularios (Nuevo/Editar)** - Usar FormField en todos

---

## Testing

Después de migrar, verifica:

✅ Apariencia visual idéntica en light/dark mode  
✅ Responsive funciona igual  
✅ Hover states correctos  
✅ Focus states para accesibilidad  
✅ No hay errores de console  
✅ Performance igual o mejor  

---

