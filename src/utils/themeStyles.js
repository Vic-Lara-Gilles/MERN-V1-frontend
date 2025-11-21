/**
 * Utilidad para aplicar estilos de tema al body
 */

const THEME_STYLES = {
    dark: {
        backgroundColor: '#111827',
        backgroundImage: 'radial-gradient(circle, rgba(148, 163, 184, 0.15) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
    },
    light: {
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle, rgba(71, 85, 105, 0.2) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
    }
}

/**
 * Aplica los estilos de fondo según el tema
 * @param {string} theme - 'dark' o 'light'
 */
export const applyThemeStyles = (theme) => {
    const body = document.body
    const styles = THEME_STYLES[theme]
    
    if (styles) {
        Object.assign(body.style, styles)
    }
}

/**
 * Obtiene el tema del sistema
 * @returns {string} 'dark' o 'light'
 */
export const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Aplica la clase de tema al elemento root
 * @param {string} theme - 'dark' o 'light'
 */
export const applyThemeClass = (theme) => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    applyThemeStyles(theme)
}

/**
 * Obtiene el tema guardado en localStorage o usa el del sistema
 * @returns {string} 'dark' o 'light'
 */
export const getSavedTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || getSystemTheme()
}

/**
 * Persiste el tema en localStorage
 * @param {string} theme - 'dark' o 'light'
 */
export const saveTheme = (theme) => {
    localStorage.setItem('theme', theme)
}

/**
 * Alterna entre light y dark
 * @param {string} currentTheme - Tema actual
 * @returns {string} Tema opuesto
 */
export const toggleThemeValue = (currentTheme) => {
    return currentTheme === 'light' ? 'dark' : 'light'
}
