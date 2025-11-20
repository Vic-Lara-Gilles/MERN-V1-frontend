const AnimatedBackground = ({ tipoAcceso = 'personal' }) => {
  const dotColor = tipoAcceso === 'cliente' ? '#3b82f6' : '#475569'; // blue-500 para cliente, slate-600 para personal
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      {/* Patrón de puntos simple con mejor opacidad */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-500"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Efecto de gradiente sutil en las esquinas */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 transition-colors duration-500 ${
        tipoAcceso === 'cliente' ? 'bg-blue-400' : 'bg-slate-400'
      }`}></div>
      <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 transition-colors duration-500 ${
        tipoAcceso === 'cliente' ? 'bg-blue-300' : 'bg-slate-300'
      }`}></div>
    </div>
  );
};

export default AnimatedBackground;
