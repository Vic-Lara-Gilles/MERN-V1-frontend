import { useEffect, useState } from 'react'
import { 
    applyThemeClass,
    getSavedTheme,
    saveTheme,
    toggleThemeValue
} from '../utils/themeStyles'

/**
 * Hook para gestionar el tema de la aplicación
 */
const useTheme = () => {
    const [theme, setTheme] = useState(getSavedTheme)

    useEffect(() => {
        applyThemeClass(theme)
        saveTheme(theme)
    }, [theme])

    const toggleTheme = () => setTheme(toggleThemeValue)

    return { theme, setTheme, toggleTheme }
}

export default useTheme
