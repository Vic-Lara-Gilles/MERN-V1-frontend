const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Círculos animados */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      {/* Patrón de puntos */}
      <div className="absolute inset-0 opacity-[0.15]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}></div>
      
      {/* Formas geométricas flotantes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-200 rounded-lg rotate-12 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-purple-200 rounded-full animate-float animation-delay-3000"></div>
      <div className="absolute top-1/2 right-1/3 w-20 h-20 border-2 border-pink-200 rotate-45 animate-float animation-delay-1000"></div>
      
      {/* Iconos veterinarios flotantes */}
      <div className="absolute top-1/3 right-1/4 text-blue-200 opacity-30 animate-float-slow">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
        </svg>
      </div>
      
      <div className="absolute bottom-1/3 left-1/3 text-purple-200 opacity-30 animate-float-slow animation-delay-2000">
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedBackground;
