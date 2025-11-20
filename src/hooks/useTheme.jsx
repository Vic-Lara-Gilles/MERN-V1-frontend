import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Intentar obtener el tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Si no hay tema guardado, usar el preferido del sistema
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return savedTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Remover ambas clases primero
    root.classList.remove('light', 'dark');
    
    // Aplicar tema según la preferencia
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      // Actualizar patrón de puntos para dark mode
      body.style.backgroundColor = '#111827';
      body.style.backgroundImage = 'radial-gradient(circle, rgba(148, 163, 184, 0.15) 1px, transparent 1px)';
    } else if (theme === 'light') {
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
      // Actualizar patrón de puntos para light mode
      body.style.backgroundColor = '#ffffff';
      body.style.backgroundImage = 'radial-gradient(circle, rgba(71, 85, 105, 0.2) 1px, transparent 1px)';
    } else {
      // theme === 'system'
      localStorage.removeItem('theme');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      // Actualizar patrón de puntos según tema del sistema
      if (systemTheme === 'dark') {
        body.style.backgroundColor = '#111827';
        body.style.backgroundImage = 'radial-gradient(circle, rgba(148, 163, 184, 0.15) 1px, transparent 1px)';
      } else {
        body.style.backgroundColor = '#ffffff';
        body.style.backgroundImage = 'radial-gradient(circle, rgba(71, 85, 105, 0.2) 1px, transparent 1px)';
      }
    }
    body.style.backgroundSize = '20px 20px';
  }, [theme]);

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        const root = document.documentElement;
        const body = document.body;
        root.classList.remove('light', 'dark');
        root.classList.add(e.matches ? 'dark' : 'light');
        
        // Actualizar patrón de puntos
        if (e.matches) {
          body.style.backgroundColor = '#111827';
          body.style.backgroundImage = 'radial-gradient(circle, rgba(148, 163, 184, 0.15) 1px, transparent 1px)';
        } else {
          body.style.backgroundColor = '#ffffff';
          body.style.backgroundImage = 'radial-gradient(circle, rgba(71, 85, 105, 0.2) 1px, transparent 1px)';
        }
        body.style.backgroundSize = '20px 20px';
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
  };

  return { theme, setTheme, toggleTheme };
};

export default useTheme;
