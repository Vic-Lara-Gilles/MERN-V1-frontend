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
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-300/40 dark:border-gray-600/40 hover:bg-white dark:hover:bg-gray-700 transition-all shadow-2xl"
            title={nextLabel}
            aria-label={label}
        >
            <Icon className="h-5 w-5 text-slate-700 dark:text-yellow-500" />
        </button>
    )
}

export default ThemeToggle
