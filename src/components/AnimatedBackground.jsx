const AnimatedBackground = ({ tipoAcceso = 'personal' }) => {
    const dotColor = tipoAcceso === 'cliente' ? '#3b82f6' : '#475569'; // blue-500 para cliente, slate-600 para personal
    const dotColorDark = tipoAcceso === 'cliente' ? '#60a5fa' : '#94a3b8'; // blue-400 para cliente, slate-400 para personal en dark

    return (
        <>
            {/* Light mode background */}
            <div className="fixed inset-0 -z-10 overflow-hidden dark:hidden">
                {/* Efecto de gradiente sutil en las esquinas */}
                <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 transition-colors duration-500 ${tipoAcceso === 'cliente' ? 'bg-blue-400' : 'bg-slate-400'
                    }`}></div>
                <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 transition-colors duration-500 ${tipoAcceso === 'cliente' ? 'bg-blue-300' : 'bg-slate-300'
                    }`}></div>
            </div>

            {/* Dark mode background */}
            <div className="fixed inset-0 -z-10 overflow-hidden hidden dark:block">
                {/* Efecto de gradiente sutil en las esquinas para dark */}
                <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-5 transition-colors duration-500 ${tipoAcceso === 'cliente' ? 'bg-blue-600' : 'bg-slate-600'
                    }`}></div>
                <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-5 transition-colors duration-500 ${tipoAcceso === 'cliente' ? 'bg-blue-500' : 'bg-slate-500'
                    }`}></div>
            </div>
        </>
    );
};

export default AnimatedBackground;
