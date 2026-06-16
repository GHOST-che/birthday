import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import CanvasParticles from './components/CanvasParticles';
import ScreenShatter from './components/ScreenShatter';
import RealisticBook from './components/RealisticBook';

function App() {
  const [scene, setScene] = useState(1);
  const [countdown, setCountdown] = useState(3);
  const [flash, setFlash] = useState(false);
  const [showFollowBtn, setShowFollowBtn] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);

  const memories = [
    {
      id: 1,
      tag: "MOMENT 01",
      title: "Le Premier Regard",
      description: "Le jour où nos yeux se sont croisés pour la première fois, le monde s'est arrêté de tourner.",
      src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
      type: "image"
    },
    {
      id: 2,
      tag: "MOMENT 02",
      title: "Main dans la Main",
      description: "Sentir ta main dans la mienne me donne la force de gravir toutes les montagnes.",
      src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
      type: "image"
    },
    {
      id: 3,
      tag: "MOMENT 03",
      title: "Sous la Lune",
      description: "Chaque seconde passée à contempler le ciel avec toi est un souvenir gravé à jamais.",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      type: "image"
    },
    {
      id: 4,
      tag: "MOMENT 04",
      title: "Ton Sourire",
      description: "Ton sourire est le plus beau des cadeaux, la plus belle mélodie de mes journées.",
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
      type: "image"
    },
    {
      id: 5,
      tag: "MOMENT 05",
      title: "Notre Étoile",
      description: "Je regarde le ciel et je vois notre étoile qui brille pour nous.",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
      type: "image"
    }
  ];

  const triggerConfetti = () => {
    const defaults = {
      spread: 360,
      ticks: 120,
      gravity: 0.6,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#FF69B4', '#FFD700', '#FF1493']
    };
    confetti({ ...defaults, particleCount: 50, scalar: 1.2 });
    confetti({ ...defaults, particleCount: 30, scalar: 0.8 });
  };

  useEffect(() => {
    if (scene !== 1) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 3) return 2;
        if (prev === 2) return 1;
        if (prev === 1) return "❤️";
        
        clearInterval(timer);
        triggerConfetti();
        setScene(2);
        return 3;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [scene]);

  useEffect(() => {
    if (scene === 4) {
      setShowFollowBtn(false);
      const timer = setTimeout(() => {
        setShowFollowBtn(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [scene]);

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
    }, 150);
  };

  const handleShatterComplete = () => {
    setScene(4);
  };

  const handleFollowClick = () => {
    triggerConfetti();
    setScene(5);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black select-none text-[#e2e2e2] font-sans">
      
      <CanvasParticles mode={scene <= 3 ? 'petals' : 'sparkles'} />

      <header 
        className={`fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center transition-all duration-1000 ${
          scene === 5 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="font-display-royal text-2xl text-primary-pink tracking-tight drop-shadow-[0_0_8px_rgba(255,105,180,0.5)]">
          Ma Reine
        </div>
      </header>

      <main className="relative w-full h-screen">
        
        {/* SCÈNE 1: COUNTDOWN */}
        <div className={`scene ${scene === 1 ? 'active' : ''}`}>
          <div className="text-center">
            <h1 className="font-display-royal countdown-text text-primary-pink drop-shadow-[0_0_40px_#FF1493] animate-pulse">
              {countdown}
            </h1>
            <p className="font-label-caps text-xs md:text-sm tracking-[0.6em] text-white/50 mt-12 transition-all">
              PRÉPARE-TOI
            </p>
          </div>
        </div>

        {/* SCÈNE 2: ANNIVERSAIRE + BRIS */}
        <div className={`scene bg-black/40 backdrop-blur-[2px] ${scene === 2 ? 'active' : ''}`}>
          <div className="text-center px-8 z-10 pointer-events-none select-none">
            <h2 className="font-display-royal text-4xl md:text-6xl text-primary-pink mb-6 leading-tight drop-shadow-[0_0_20px_rgba(255,20,147,0.3)]">
              Joyeux Anniversaire<br />
              <span className="shimmer-text">Ma Reine 👑</span>
            </h2>
            <div className="mt-16 md:mt-28">
              <p className="font-body-lg text-lg text-primary-pink/80 animate-bounce tracking-wide">
                Touche l'écran 3 fois 💗
              </p>
            </div>
          </div>
          
          {scene === 2 && (
            <ScreenShatter 
              onShatterComplete={handleShatterComplete} 
              triggerFlash={triggerFlash} 
            />
          )}
        </div>

        {/* SCÈNE 4: ÂGE + BOUTON */}
        <div className={`scene ${scene === 4 ? 'active' : ''}`}>
          <div className="text-center px-6 z-10">
            <h3 className="shimmer-text font-display-royal age-title mb-12 drop-shadow-[0_0_30px_rgba(255,105,180,0.4)]">
              J'ai 19 ans 🌸
            </h3>
            <div className="h-24 flex items-center justify-center">
              {showFollowBtn && (
                <button
                  onClick={handleFollowClick}
                  className="float-btn px-8 md:px-10 py-4 rounded-full bg-deep-pink hover:bg-primary-pink text-white font-label-caps text-sm tracking-widest shadow-[0_0_30px_#FF1493] hover:shadow-[0_0_40px_#FFD700] hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-royal-gold/20"
                >
                  Suivez-moi 💫
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SCÈNE 5: GALERIE "Mes moments" */}
        <div className={`scene overflow-y-auto pt-28 pb-32 items-start justify-start ${scene === 5 ? 'active bg-surface' : ''}`}>
          <div className="w-full px-6 mb-4 text-center mt-2">
            <h4 className="font-display-royal text-3xl md:text-4xl text-primary-pink tracking-wide drop-shadow-[0_0_10px_rgba(255,105,180,0.3)]">
              Mes moments
            </h4>
            <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="w-full flex justify-center items-center">
            <RealisticBook memories={memories} onCardSelect={(m) => setSelectedMemory(m)} />
          </div>

          <p className="w-full text-center mt-8 px-12 font-body-lg text-primary-pink/60 italic tracking-wide">
            "Chaque seconde à tes côtés est une éternité de bonheur..."
          </p>
        </div>

      </main>

      {/* BOUTON CŒUR FLOTTANT (SCÈNE 5 UNIQUEMENT) */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-1000 ${
        scene === 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}>
        <button
          onClick={triggerConfetti}
          className="w-14 h-14 bg-deep-pink hover:bg-primary-pink rounded-full flex items-center justify-center shadow-2xl shadow-deep-pink/50 active:scale-95 transition-all duration-300"
        >
          <span className="material-symbols-outlined text-white text-[28px]">favorite</span>
        </button>
      </div>

      {/* FLASH BLANC */}
      <div 
        className="fixed inset-0 bg-white pointer-events-none z-[200] transition-opacity duration-150"
        style={{ opacity: flash ? 1 : 0 }}
      />

      {/* LIGHTBOX */}
      {selectedMemory && (
        <div 
          className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6 transition-all duration-300"
          onClick={() => setSelectedMemory(null)}
        >
          <div 
            className="glass-card max-w-md w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,20,147,0.3)] border border-royal-gold/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <img 
                src={selectedMemory.src} 
                alt={selectedMemory.title} 
                className="w-full h-full object-cover" 
              />
              <button 
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-royal-gold/30 flex items-center justify-center text-royal-gold transition-transform hover:scale-110 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            
            <div className="p-6 bg-surface">
              <span className="text-[10px] font-bold text-royal-gold bg-black/60 border border-royal-gold/20 px-2.5 py-1 rounded tracking-widest uppercase">
                {selectedMemory.tag}
              </span>
              <h5 className="font-display-royal text-2xl text-white mt-3 mb-2 drop-shadow-md">
                {selectedMemory.title}
              </h5>
              <p className="font-body-lg text-sm text-[#e2e2e2]/80 leading-relaxed mt-2 italic">
                "{selectedMemory.description}"
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;