import React, { useState, useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';

const RealisticBook = ({ memories, onCardSelect }) => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bookOpacity, setBookOpacity] = useState(1);
  const flipBookRef = useRef(null);
  const totalPages = memories.length;

  // Ouvrir le livre avec animation
  const openBook = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Animation d'ouverture
    const container = document.querySelector('.book-container');
    if (container) {
      container.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease';
      container.style.transform = 'perspective(1200px) rotateY(0deg) scale(1)';
      container.style.opacity = '1';
    }
    
    setTimeout(() => {
      setIsBookOpen(true);
      setIsAnimating(false);
    }, 400);
  };

  // Fermer le livre avec animation
  const closeBook = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Animation de fermeture
    const container = document.querySelector('.book-container');
    if (container) {
      container.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease';
      container.style.transform = 'perspective(1200px) rotateY(180deg) scale(0.8)';
      container.style.opacity = '0';
    }
    
    setTimeout(() => {
      setIsBookOpen(false);
      setIsAnimating(false);
      setCurrentPage(0);
      if (flipBookRef.current) {
        flipBookRef.current.pageFlip().flip(0);
      }
      // Réinitialiser la position
      if (container) {
        container.style.transform = 'perspective(1200px) rotateY(0deg) scale(1)';
        container.style.opacity = '1';
      }
    }, 800);
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.data);
    setIsFlipping(false);
  };

  const handleFlipStart = () => {
    setIsFlipping(true);
  };

  const goToPage = (index) => {
    if (flipBookRef.current && !isFlipping && !isAnimating) {
      setIsFlipping(true);
      flipBookRef.current.pageFlip().flip(index);
    }
  };

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isBookOpen || isAnimating) return;
      if (e.key === 'ArrowRight' && !isFlipping) {
        flipBookRef.current?.pageFlip().flipNext();
      }
      if (e.key === 'ArrowLeft' && !isFlipping) {
        flipBookRef.current?.pageFlip().flipPrev();
      }
      if (e.key === 'Escape') {
        closeBook();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookOpen, isFlipping, isAnimating]);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-6 md:py-8">
      
      {!isBookOpen ? (
        // ===== LIVRE FERMÉ =====
        <div className="relative flex flex-col items-center justify-center">
          {/* Ombre portée */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-gradient-to-r from-transparent via-deep-pink/20 to-transparent blur-xl"></div>
          
          {/* Livre fermé */}
          <div 
            className="book-closed cursor-pointer group"
            onClick={openBook}
          >
            <div className="relative w-[180px] sm:w-[260px] md:w-[320px] lg:w-[380px] aspect-[3/4] rounded-lg shadow-2xl shadow-deep-pink/30 transition-all duration-500 group-hover:shadow-deep-pink/50 group-hover:scale-105 group-hover:-translate-y-2">
              
              {/* Couverture */}
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-[#1a0a12] via-[#2a0a1a] to-[#1a0a12] border-2 border-royal-gold/30">
                
                {/* Motif décoratif */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[60%] border-2 border-royal-gold/20 rounded-lg"></div>
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60%] h-[40%] border-2 border-royal-gold/10 rounded-lg"></div>
                </div>
                
                {/* Titre */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h2 className="font-display-royal text-2xl sm:text-3xl md:text-4xl text-royal-gold shimmer-text">
                    Mon Livre
                  </h2>
                  <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-royal-gold/40 to-transparent my-3"></div>
                  <p className="font-body-lg text-[10px] sm:text-xs text-white/50 tracking-[0.2em]">
                    Souvenirs d'Amour
                  </p>
                  <div className="mt-4 sm:mt-6 px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-royal-gold/10 border border-royal-gold/20 text-royal-gold text-[10px] sm:text-xs font-label-caps tracking-[0.2em] transition-all duration-300 group-hover:bg-royal-gold/20 group-hover:scale-105">
                    📖 Ouvrir
                  </div>
                </div>

                {/* Reliure */}
                <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-3 bg-gradient-to-r from-royal-gold/20 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-2 sm:w-3 bg-gradient-to-l from-royal-gold/20 to-transparent"></div>
                
                {/* Tranche du livre */}
                <div className="absolute -right-3 sm:-right-4 top-2 bottom-2 w-2 sm:w-3 bg-gradient-to-l from-[#0a0508] to-[#1a0a12] rounded-r-sm shadow-inner"></div>
              </div>
            </div>
          </div>

          {/* Message d'invitation */}
          <p className="text-white/40 text-[10px] sm:text-xs mt-6 font-body-lg animate-pulse">
            Clique sur le livre pour l'ouvrir ✨
          </p>
        </div>
      ) : (
        // ===== LIVRE OUVERT AVEC ANIMATION 3D =====
        <div className="relative">
          
          {/* Indicateurs de progression */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {memories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                  index === currentPage 
                    ? 'w-8 sm:w-10 bg-royal-gold shadow-[0_0_12px_rgba(255,215,0,0.6)]' 
                    : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Livre avec effet 3D */}
          <div className="book-container relative" style={{
            transform: 'perspective(1200px) rotateY(0deg) scale(1)',
            opacity: 1,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease',
            transformStyle: 'preserve-3d',
          }}>
            
            {/* Ombre du livre */}
            <div className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 w-[95%] h-10 sm:h-12 bg-gradient-to-r from-transparent via-deep-pink/30 to-transparent blur-2xl"></div>
            
            {/* Le livre */}
            <HTMLFlipBook
              ref={flipBookRef}
              width={550}
              height={733}
              size="stretch"
              minWidth={280}
              maxWidth={800}
              minHeight={380}
              maxHeight={950}
              maxShadowOpacity={0.7}
              showCover={false}
              mobileScrollSupport={true}
              className="flipbook-container"
              onFlip={handlePageChange}
              onFlipStart={handleFlipStart}
              startPage={0}
              drawShadow={true}
              flippingTime={900}
              usePortrait={true}
              startZIndex={0}
              autoSize={true}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={15}
              showPageCorners={true}
              disableFlipByClick={false}
              style={{ 
                margin: '0 auto',
                borderRadius: '16px',
              }}
            >
              {/* Page de garde */}
              <div className="flip-page relative w-full h-full">
                <div className="w-full h-full bg-gradient-to-br from-[#1a0a12] to-[#0a0508] rounded-lg flex flex-col items-center justify-center p-6 sm:p-8 border border-royal-gold/10">
                  <span className="text-royal-gold/20 text-3xl sm:text-4xl">✦</span>
                  <h2 className="font-display-royal text-2xl sm:text-3xl md:text-4xl text-royal-gold shimmer-text text-center mt-4">
                    Mes Souvenirs
                  </h2>
                  <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-royal-gold/30 to-transparent my-3"></div>
                  <p className="font-body-lg text-xs sm:text-sm text-white/60 text-center max-w-xs">
                    Un voyage à travers nos plus beaux moments
                  </p>
                  <p className="text-white/30 text-[10px] sm:text-xs mt-4 font-display-royal tracking-[0.3em] animate-pulse">
                    ✦ Tourne la page ✦
                  </p>
                </div>
              </div>

              {/* Pages du livre */}
              {memories.map((memory, index) => (
                <div key={memory.id} className="flip-page relative w-full h-full">
                  <div 
                    className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => onCardSelect(memory)}
                  >
                    {memory.type === 'video' ? (
                      <video
                        src={memory.src}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                    ) : (
                      <img
                        src={memory.src}
                        alt={memory.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                      <div className="mb-1 sm:mb-2">
                        <span className="text-[7px] sm:text-[8px] md:text-[10px] font-bold text-royal-gold bg-black/60 border border-royal-gold/20 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded tracking-widest uppercase">
                          {memory.tag}
                        </span>
                      </div>
                      <h3 className="font-display-royal text-base sm:text-lg md:text-2xl text-white drop-shadow-lg leading-tight">
                        {memory.title}
                      </h3>
                      {memory.description && (
                        <p className="font-body-lg text-[10px] sm:text-xs md:text-sm text-white/80 mt-0.5 sm:mt-1 italic max-w-lg line-clamp-2">
                          "{memory.description}"
                        </p>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/30 font-body-lg text-[8px] sm:text-xs">
                      {index + 1} / {totalPages}
                    </div>
                  </div>
                </div>
              ))}

              {/* Dernière page */}
              <div className="flip-page relative w-full h-full">
                <div className="w-full h-full bg-gradient-to-br from-[#0a0508] to-[#1a0a12] rounded-lg flex flex-col items-center justify-center p-6 sm:p-8 border border-royal-gold/10">
                  <span className="text-royal-gold/20 text-3xl sm:text-4xl mb-3">✦</span>
                  <h2 className="font-display-royal text-2xl sm:text-3xl text-royal-gold shimmer-text text-center">
                    Fin
                  </h2>
                  <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-royal-gold/30 to-transparent my-3"></div>
                  <p className="font-body-lg text-xs sm:text-sm text-white/60 text-center max-w-xs">
                    Merci d'avoir partagé ces moments avec moi
                  </p>
                  <button
                    onClick={closeBook}
                    className="mt-4 sm:mt-6 px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-deep-pink/20 border border-royal-gold/30 text-royal-gold text-[10px] sm:text-xs font-label-caps tracking-[0.2em] hover:bg-deep-pink/40 transition-all duration-300 hover:scale-105"
                  >
                    ✦ Fermer le livre ✦
                  </button>
                </div>
              </div>
            </HTMLFlipBook>
          </div>

          {/* Indications */}
          <div className="flex justify-between items-center mt-3 sm:mt-4 text-white/40 text-[10px] sm:text-xs font-body-lg px-2">
            <span className={`transition-opacity duration-300 ${currentPage === 0 ? 'opacity-20' : 'opacity-60'}`}>
              ← Glisser pour reculer
            </span>
            <span className="text-royal-gold/50 text-[8px] sm:text-[10px] font-display-royal">
              {currentPage + 1} / {totalPages + 2}
            </span>
            <span className={`transition-opacity duration-300 ${currentPage === totalPages + 1 ? 'opacity-20' : 'opacity-60'}`}>
              Glisser pour avancer →
            </span>
          </div>

          {/* Bouton fermer */}
          <button
            onClick={closeBook}
            className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-black/60 backdrop-blur-md border border-royal-gold/20 text-royal-gold text-[8px] sm:text-xs font-label-caps tracking-[0.2em] hover:bg-deep-pink/30 transition-all duration-300 hover:scale-105"
          >
            ✦ Fermer ✦
          </button>
        </div>
      )}
    </div>
  );
};

export default RealisticBook;