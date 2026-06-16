import React, { useRef, useState, useEffect } from 'react';

const GallerySlider = ({ memories, onCardSelect }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollToCard = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    const card = slider.children[index];
    if (card) {
      const cardWidth = card.offsetWidth + 24; // width + gap
      const scrollPosition = index * cardWidth;
      slider.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < memories.length - 1) {
      scrollToCard(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    }
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cardWidth = slider.children[0]?.offsetWidth + 24 || 0;
    const scrollPosition = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    setShowLeftArrow(scrollPosition > 10);
    setShowRightArrow(scrollPosition < maxScroll - 10);

    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < memories.length) {
      setCurrentIndex(newIndex);
    }
  };

  // Mouse drag events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Snap to nearest card
    const slider = sliderRef.current;
    if (!slider) return;
    
    const cardWidth = slider.children[0]?.offsetWidth + 24 || 0;
    const scrollPosition = slider.scrollLeft;
    const newIndex = Math.round(scrollPosition / cardWidth);
    
    if (newIndex >= 0 && newIndex < memories.length) {
      scrollToCard(newIndex);
    }
  };

  // Auto-update on resize
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        handleScroll();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update indicators on scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      // Initial check
      setTimeout(handleScroll, 100);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const rotations = ['rotate-[-3deg]', 'rotate-[2deg]', 'rotate-[-1deg]', 'rotate-[4deg]', 'rotate-[-2deg]'];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Flèche GAUCHE */}
      {showLeftArrow && (
        <button
          onClick={handlePrev}
          className="absolute left-0 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-md border border-royal-gold/30 flex items-center justify-center text-royal-gold hover:bg-deep-pink/80 hover:border-royal-gold transition-all duration-300 shadow-lg shadow-black/50"
          aria-label="Précédent"
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[22px] md:text-[28px]">chevron_left</span>
        </button>
      )}

      {/* Slider */}
      <div
        ref={sliderRef}
        className="gallery-container select-none touch-pan-x scroll-smooth overflow-x-auto"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {memories.map((m, index) => {
          const rotClass = rotations[index % rotations.length];
          
          return (
            <div
              key={m.id}
              onClick={() => onCardSelect(m)}
              className={`gallery-card glass-card rounded-2xl overflow-hidden ${rotClass} cursor-pointer shadow-[0_4px_20px_rgba(255,105,180,0.15)] hover:shadow-[0_8px_30px_rgba(255,20,147,0.3)] transition-all duration-500 ease-out`}
              style={{
                scrollSnapAlign: 'center',
                flex: '0 0 80%',
                maxWidth: '300px',
                aspectRatio: '3/4',
                '@media (min-width: 640px)': {
                  flex: '0 0 60%',
                  maxWidth: '350px',
                },
                '@media (min-width: 768px)': {
                  flex: '0 0 45%',
                  maxWidth: '380px',
                },
                '@media (min-width: 1024px)': {
                  flex: '0 0 30%',
                  maxWidth: '400px',
                },
                '@media (min-width: 1280px)': {
                  flex: '0 0 25%',
                  maxWidth: '420px',
                },
              }}
            >
              {m.type === 'video' ? (
                <video
                  src={m.src}
                  className="w-full h-full object-cover pointer-events-none"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              ) : (
                <img
                  src={m.src}
                  alt={m.title}
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=500&q=80";
                  }}
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <span className="text-[8px] sm:text-[10px] font-bold text-royal-gold bg-black/60 border border-royal-gold/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded tracking-widest uppercase">
                  {m.tag}
                </span>
                <p className="font-display-royal text-base sm:text-xl md:text-2xl text-white mt-1 sm:mt-2 drop-shadow-md leading-tight">
                  {m.title}
                </p>
                {m.description && (
                  <p className="font-body-lg text-[10px] sm:text-xs text-white/70 mt-0.5 sm:mt-1 line-clamp-2 italic">
                    "{m.description}"
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Flèche DROITE */}
      {showRightArrow && (
        <button
          onClick={handleNext}
          className="absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-md border border-royal-gold/30 flex items-center justify-center text-royal-gold hover:bg-deep-pink/80 hover:border-royal-gold transition-all duration-300 shadow-lg shadow-black/50"
          aria-label="Suivant"
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[22px] md:text-[28px]">chevron_right</span>
        </button>
      )}

      {/* Indicateurs de pagination */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
        {memories.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 sm:w-8 bg-royal-gold' 
                : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Aller à la photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GallerySlider;