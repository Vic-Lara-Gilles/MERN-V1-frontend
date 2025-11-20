const AnimatedBackground = ({ tipoAcceso = 'personal' }) => {
  const dotColor = tipoAcceso === 'cliente' ? '#3b82f6' : '#94a3b8'; // blue-500 para cliente, slate-400 para personal
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      {/* Patrón de puntos simple */}
      <div 
        className="absolute inset-0 opacity-40 transition-all duration-500"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
