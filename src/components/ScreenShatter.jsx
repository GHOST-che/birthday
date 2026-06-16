import React, { useState, useRef, useEffect } from 'react';

const ScreenShatter = ({ onShatterComplete, triggerFlash }) => {
  const [cracks, setCracks] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [isShattered, setIsShattered] = useState(false);
  const [impactPoint, setImpactPoint] = useState({ x: 50, y: 50 });
  const [isVibrating, setIsVibrating] = useState(false);
  const containerRef = useRef(null);

  // ===== FONCTION DE VIBRATION =====
  const triggerVibration = (level) => {
    if (window.navigator && window.navigator.vibrate) {
      const patterns = {
        1: [30, 20, 30],
        2: [50, 30, 50, 30, 50],
        3: [80, 40, 80, 40, 80, 40, 100]
      };
      const pattern = patterns[level] || patterns[1];
      window.navigator.vibrate(pattern);
    }

    setIsVibrating(true);
    const intensity = {
      1: { x: 3, y: 2, duration: 150 },
      2: { x: 6, y: 4, duration: 250 },
      3: { x: 10, y: 6, duration: 400 }
    };

    const config = intensity[level] || intensity[1];
    const container = containerRef.current;
    
    if (container) {
      container.style.transition = 'none';
      
      const shake = () => {
        const shakeX = (Math.random() - 0.5) * config.x * 2;
        const shakeY = (Math.random() - 0.5) * config.y * 2;
        container.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
      };

      const stopShake = () => {
        container.style.transform = 'translate(0, 0)';
        container.style.transition = 'transform 0.1s ease';
        setIsVibrating(false);
      };

      const numShakes = Math.floor(config.duration / 30);
      let shakeCount = 0;
      
      const shakeInterval = setInterval(() => {
        if (shakeCount < numShakes) {
          shake();
          shakeCount++;
        } else {
          clearInterval(shakeInterval);
          stopShake();
        }
      }, 30);

      setTimeout(() => {
        clearInterval(shakeInterval);
        stopShake();
      }, config.duration + 100);
    }
  };

  // ===== GÉNÉRATION DE FISSURES RÉALISTES (STYLE ALAMY) =====
  const generateRealisticCracks = (cx, cy, level, containerWidth, containerHeight) => {
    const cracks = [];
    
    // Nombre de fissures principales
    const numMainCracks = level === 1 ? 6 : level === 2 ? 10 : 14;
    // Nombre de branches secondaires
    const numBranches = level === 1 ? 2 : level === 2 ? 4 : 8;
    
    // Longueur max des fissures
    const maxLength = level === 1 ? 200 : level === 2 ? 400 : 700;

    // === FISSURES PRINCIPALES (partent du point d'impact) ===
    for (let i = 0; i < numMainCracks; i++) {
      // Angle avec regroupement pour un effet réaliste
      const baseAngle = (i / numMainCracks) * Math.PI * 2;
      // Ajouter une légère variation pour un aspect naturel
      const angle = baseAngle + (Math.random() - 0.5) * 0.4;
      
      // Longueur variable
      const length = maxLength * (0.4 + Math.random() * 0.6);
      
      // Points de contrôle pour la courbure
      const cp1x = cx + Math.cos(angle + (Math.random() - 0.5) * 0.3) * (length * 0.3);
      const cp1y = cy + Math.sin(angle + (Math.random() - 0.5) * 0.3) * (length * 0.3);
      const cp2x = cx + Math.cos(angle + (Math.random() - 0.5) * 0.4) * (length * 0.7);
      const cp2y = cy + Math.sin(angle + (Math.random() - 0.5) * 0.4) * (length * 0.7);
      
      const endX = cx + Math.cos(angle + (Math.random() - 0.5) * 0.2) * length;
      const endY = cy + Math.sin(angle + (Math.random() - 0.5) * 0.2) * length;

      // Épaisseur variable (plus épaisse près de l'impact)
      const strokeWidth = (1.5 + Math.random() * 0.5) * (1 - (Math.random() * 0.5));
      
      // Couleur : or et rose
      const color = Math.random() > 0.6 ? '#FF1493' : '#FFD700';

      // Path avec courbure naturelle
      const path = `M ${cx},${cy} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;

      cracks.push({
        id: Math.random() * 1000000 + i,
        path: path,
        stroke: color,
        width: strokeWidth,
        opacity: 0.7 + Math.random() * 0.3,
        delay: Math.random() * 80,
      });

      // === BRANCHES SECONDAIRES ===
      const numBranchesForThisCrack = Math.floor(Math.random() * numBranches) + 1;
      
      for (let j = 0; j < numBranchesForThisCrack; j++) {
        // Position sur la fissure principale (entre 30% et 70% de la longueur)
        const t = 0.3 + Math.random() * 0.4;
        const branchX = cx + (endX - cx) * t + (Math.random() - 0.5) * 30;
        const branchY = cy + (endY - cy) * t + (Math.random() - 0.5) * 30;
        
        // Angle de la branche (perpendiculaire ou légèrement inclinée)
        const branchAngle = angle + (Math.random() - 0.5) * 1.2 + (Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2);
        const branchLength = length * (0.2 + Math.random() * 0.3);
        
        const branchEndX = branchX + Math.cos(branchAngle) * branchLength;
        const branchEndY = branchY + Math.sin(branchAngle) * branchLength;
        
        // Courbure de la branche
        const bCpX = branchX + Math.cos(branchAngle + (Math.random() - 0.5) * 0.5) * (branchLength * 0.5);
        const bCpY = branchY + Math.sin(branchAngle + (Math.random() - 0.5) * 0.5) * (branchLength * 0.5);
        
        const branchPath = `M ${branchX},${branchY} Q ${bCpX},${bCpY} ${branchEndX},${branchEndY}`;
        
        cracks.push({
          id: Math.random() * 1000000 + i + j * 100,
          path: branchPath,
          stroke: color,
          width: strokeWidth * (0.4 + Math.random() * 0.3),
          opacity: 0.5 + Math.random() * 0.4,
          delay: 50 + Math.random() * 150,
        });

        // === SOUS-BRANCHES (pour le niveau 3) ===
        if (level === 3 && Math.random() > 0.5) {
          const subT = 0.4 + Math.random() * 0.3;
          const subX = branchX + (branchEndX - branchX) * subT;
          const subY = branchY + (branchEndY - branchY) * subT;
          const subAngle = branchAngle + (Math.random() - 0.5) * 0.8;
          const subLength = branchLength * (0.2 + Math.random() * 0.3);
          const subEndX = subX + Math.cos(subAngle) * subLength;
          const subEndY = subY + Math.sin(subAngle) * subLength;
          
          const subPath = `M ${subX},${subY} L ${subEndX},${subEndY}`;
          
          cracks.push({
            id: Math.random() * 1000000 + i + j * 1000,
            path: subPath,
            stroke: color,
            width: strokeWidth * (0.2 + Math.random() * 0.2),
            opacity: 0.3 + Math.random() * 0.3,
            delay: 100 + Math.random() * 200,
          });
        }
      }
    }

    // === FISSURES CIRCULAIRES (effet de verre) ===
    if (level === 3) {
      for (let i = 0; i < 6; i++) {
        const radius = 80 + Math.random() * 250;
        const startAngle = Math.random() * Math.PI * 2;
        const endAngle = startAngle + (Math.random() * 0.6 + 0.2);
        const path = `M ${cx + Math.cos(startAngle) * radius},${cy + Math.sin(startAngle) * radius} A ${radius},${radius} 0 0,1 ${cx + Math.cos(endAngle) * radius},${cy + Math.sin(endAngle) * radius}`;
        cracks.push({
          id: Math.random() * 1000000 + 9999 + i,
          path: path,
          stroke: '#FFD700',
          width: 0.3 + Math.random() * 0.4,
          opacity: 0.2 + Math.random() * 0.2,
          delay: 150 + Math.random() * 250,
        });
      }
    }

    // === FISSURES D'IMPACT (petites fissures autour du point d'impact) ===
    for (let i = 0; i < (level === 3 ? 12 : level === 2 ? 6 : 3); i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * (level === 3 ? 80 : 40);
      const endX = cx + Math.cos(angle) * distance;
      const endY = cy + Math.sin(angle) * distance;
      const path = `M ${cx + Math.cos(angle - 0.1) * (distance * 0.3)},${cy + Math.sin(angle - 0.1) * (distance * 0.3)} Q ${cx + Math.cos(angle) * (distance * 0.6)},${cy + Math.sin(angle) * (distance * 0.6)} ${endX},${endY}`;
      cracks.push({
        id: Math.random() * 1000000 + 99999 + i,
        path: path,
        stroke: '#FFD700',
        width: 0.5 + Math.random() * 0.5,
        opacity: 0.4 + Math.random() * 0.4,
        delay: 20 + Math.random() * 60,
      });
    }

    return cracks;
  };

  // ===== GESTION DU CLIC =====
  const handleClick = (e) => {
    if (isShattered) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const containerWidth = rect.width || window.innerWidth;
    const containerHeight = rect.height || window.innerHeight;

    const impactX = (x / containerWidth) * 100;
    const impactY = (y / containerHeight) * 100;
    setImpactPoint({ x: impactX, y: impactY });

    const newClickCount = clickCount + 1;
    triggerVibration(newClickCount);
    setClickCount(newClickCount);

    // Générer les fissures
    const newCracks = generateRealisticCracks(
      x, y, 
      newClickCount,
      containerWidth,
      containerHeight
    );

    setCracks(prev => [...prev, ...newCracks]);

    // Effet d'impact lumineux
    const impact = document.createElement('div');
    impact.className = 'impact-flash-realistic';
    impact.style.left = (e.clientX - rect.left) + 'px';
    impact.style.top = (e.clientY - rect.top) + 'px';
    document.body.appendChild(impact);
    setTimeout(() => impact.remove(), 600);

    // Si 3 clics, explosion complète
    if (newClickCount >= 3) {
      setIsShattered(true);
      
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([100, 50, 100, 50, 150]);
      }

      // Débris de verre
      for (let i = 0; i < 60; i++) {
        const shard = document.createElement('div');
        shard.className = 'glass-shard-realistic';
        const size = 10 + Math.random() * 50;
        shard.style.width = size + 'px';
        shard.style.height = (size * (0.5 + Math.random())) + 'px';
        shard.style.left = (Math.random() * 100) + '%';
        shard.style.top = (Math.random() * 100) + '%';
        shard.style.setProperty('--tx', (Math.random() - 0.5) * 1000 + 'px');
        shard.style.setProperty('--ty', (Math.random() - 0.5) * 1000 + 'px');
        shard.style.setProperty('--rot', (Math.random() - 0.5) * 720 + 'deg');
        shard.style.animationDelay = (Math.random() * 0.8) + 's';
        shard.style.background = `rgba(255, 255, 255, ${0.05 + Math.random() * 0.15})`;
        shard.style.borderColor = `rgba(255, 215, 0, ${0.05 + Math.random() * 0.15})`;
        document.body.appendChild(shard);
        setTimeout(() => shard.remove(), 2500);
      }

      setTimeout(() => {
        triggerFlash();
        setTimeout(() => {
          onShatterComplete();
        }, 500);
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      document.querySelectorAll('.impact-flash-realistic, .glass-shard-realistic').forEach(el => el.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-50 cursor-pointer select-none overflow-hidden ${isVibrating ? 'vibrating' : ''}`}
      onClick={handleClick}
      style={{
        background: isShattered ? 'rgba(0,0,0,0.5)' : 'transparent',
        transition: 'background 0.8s ease',
        transform: 'translate(0, 0)',
      }}
    >
      {/* Fissures SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
        preserveAspectRatio="none"
        style={{
          filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.15))',
        }}
      >
        {cracks.map((crack) => (
          <path
            key={crack.id}
            d={crack.path}
            stroke={crack.stroke}
            strokeWidth={crack.width}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0}
            style={{
              animation: `crackAppearRealistic ${0.3 + Math.random() * 0.3}s ease ${crack.delay}ms forwards`,
            }}
          />
        ))}
      </svg>

      {/* Point d'impact lumineux */}
      {!isShattered && clickCount > 0 && (
        <div 
          className="impact-glow"
          style={{
            left: impactPoint.x + '%',
            top: impactPoint.y + '%',
            transform: 'translate(-50%, -50%)',
            width: (clickCount * 120) + 'px',
            height: (clickCount * 120) + 'px',
          }}
        />
      )}

      {/* Indicateurs de progression */}
      {!isShattered && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index < clickCount 
                  ? 'bg-royal-gold shadow-[0_0_30px_rgba(255,215,0,0.8)] scale-150' 
                  : index === clickCount
                  ? 'bg-white/50 animate-pulse scale-110'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      )}

      {/* Overlay de verre brisé */}
      {isShattered && (
        <div className="shattered-overlay-realistic" />
      )}

      <style>{`
        @keyframes crackAppearRealistic {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(${Math.random() * 8 - 4}deg);
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            stroke-dashoffset: 0;
          }
        }

        .impact-flash-realistic {
          position: fixed;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 215, 0, 0.8) 0%,
            rgba(255, 105, 180, 0.4) 20%,
            rgba(255, 20, 147, 0.2) 40%,
            transparent 70%
          );
          pointer-events: none;
          transform: translate(-50%, -50%) scale(0);
          animation: impactFlashRealistic 0.6s ease forwards;
          z-index: 100;
          filter: blur(5px);
        }

        @keyframes impactFlashRealistic {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(3.5);
            opacity: 0;
          }
        }

        .impact-glow {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 215, 0, 0.15) 0%,
            rgba(255, 105, 180, 0.08) 30%,
            rgba(255, 20, 147, 0.04) 60%,
            transparent 80%
          );
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: glowPulse 1.5s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        .glass-shard-realistic {
          position: fixed;
          pointer-events: none;
          border: 1px solid;
          border-radius: 2px;
          z-index: 100;
          opacity: 0;
          animation: shardFlyRealistic 1.5s ease forwards;
          transform-origin: center;
          clip-path: polygon(
            0% 0%,
            60% 10%,
            100% 30%,
            80% 60%,
            90% 100%,
            30% 80%,
            0% 50%
          );
        }

        @keyframes shardFlyRealistic {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(0deg) scale(0.5);
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0);
          }
        }

        .shattered-overlay-realistic {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 49;
          background: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(255, 255, 255, 0.01) 3px,
              rgba(255, 255, 255, 0.01) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3px,
              rgba(255, 255, 255, 0.01) 3px,
              rgba(255, 255, 255, 0.01) 4px
            ),
            radial-gradient(
              circle at 50% 50%,
              rgba(255, 215, 0, 0.03) 0%,
              transparent 70%
            );
          animation: glassShimmerRealistic 3s ease-in-out infinite;
        }

        @keyframes glassShimmerRealistic {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .vibrating {
          animation: screenShake 0.3s ease-in-out;
        }

        @keyframes screenShake {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-4px, -3px); }
          20% { transform: translate(6px, 4px); }
          30% { transform: translate(-8px, -5px); }
          40% { transform: translate(10px, 6px); }
          50% { transform: translate(-6px, -4px); }
          60% { transform: translate(4px, 3px); }
          70% { transform: translate(-3px, -2px); }
          80% { transform: translate(2px, 1px); }
          90% { transform: translate(-1px, -0.5px); }
          100% { transform: translate(0, 0); }
        }

        @media (max-width: 640px) {
          .impact-flash-realistic {
            width: 120px;
            height: 120px;
          }
          .impact-glow {
            width: ${clickCount * 60}px !important;
            height: ${clickCount * 60}px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ScreenShatter;