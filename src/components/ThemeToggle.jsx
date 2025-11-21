import { Sun, Moon } from 'lucide-react'
import useTheme from '../hooks/useTheme'

/**
 * Componente para alternar entre temas (light/dark)
 */
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    const isDark = theme === 'dark'
    const Icon = isDark ? Moon : Sun
    const label = isDark ? 'Modo oscuro' : 'Modo claro'
    const nextLabel = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all shadow-sm"
            title={nextLabel}
            aria-label={label}
        >
            <Icon className="h-5 w-5 text-slate-700 dark:text-yellow-500" />
        </button>
    )
}

export default ThemeToggle
