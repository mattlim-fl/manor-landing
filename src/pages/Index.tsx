// Current version with lava animation
import React, { useState, useRef, useEffect } from 'react';
import manorLogo from '../assets/img/manor-logo.png';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lavaBlobs, setLavaBlobs] = useState<Array<{id: string, text: string, action: () => void, delay: number, x: number, y: number}>>([]);
  const stepInsideRef = useRef<HTMLButtonElement>(null);

  const handleStepInsideClick = () => {
    // Add haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    
    if (isMenuOpen) {
      // If menu is open, close it
      setIsMenuOpen(false);
      setLavaBlobs([]);
      return;
    }

    // Get button position
    if (stepInsideRef.current) {
      const rect = stepInsideRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Create lava blobs with staggered delays and positions
      const menuItems = [
        { text: 'Karaoke', action: () => window.location.href = '/karaoke' },
        { text: 'Venue Hire', action: () => window.location.href = '/services' },
        { text: '25+ Priority', action: () => window.location.href = '/priority-entry' },
        { text: 'Guest List', action: () => window.location.href = '/contact' },
        { text: 'VIP Entry', action: () => {
          setIsMenuOpen(false);
          setLavaBlobs([]);
          setTimeout(() => window.openVIPModal?.(), 300);
        }}
      ];

      const newBlobs = menuItems.map((item, index) => ({
        id: `blob-${index}`,
        text: item.text,
        action: item.action,
        delay: index * 200,
        x: centerX + (index - 2) * 120, // Spread horizontally
        y: centerY
      }));

      setLavaBlobs(newBlobs);
      setIsMenuOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#060201' }}>
      {/* Full-screen video background */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0 z-10"
        style={{ backgroundColor: 'rgba(6, 2, 1, 0.6)' }}
      />

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center p-6">
        {/* Empty space for layout balance */}
        <div className="w-24"></div>
        
        {/* Center logo */}
        <div className="flex-1 flex justify-center">
          <img src={manorLogo} alt="Manor" className="h-12 md:h-16" />
        </div>
        
        {/* Hippie Club link */}
        <Link 
          to="/services"
          className="text-white text-sm md:text-base hover:text-orange-400 transition-colors duration-300"
          style={{ color: '#F2993B' }}
        >
          Hippie Club
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6">
        {/* Step Inside Button */}
        <button
          ref={stepInsideRef}
          onClick={handleStepInsideClick}
          className="relative mx-auto block px-8 py-4 text-xl font-bold transition-all duration-500 hover:scale-105"
          style={{
            backgroundColor: '#F2993B',
            color: '#060201',
            border: '2px solid #F2993B',
            borderRadius: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#060201';
            e.currentTarget.style.color = '#F2993B';
            e.currentTarget.style.borderColor = '#F2993B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#F2993B';
            e.currentTarget.style.color = '#060201';
            e.currentTarget.style.borderColor = '#F2993B';
          }}
        >
          {isMenuOpen ? 'CLOSE' : 'STEP INSIDE'}
        </button>
      </main>

      {/* Lava Blob Menu Items */}
      {lavaBlobs.map((blob) => (
        <LavaBlob
          key={blob.id}
          text={blob.text}
          startX={blob.x}
          startY={blob.y}
          delay={blob.delay}
          onClick={blob.action}
        />
      ))}

      {/* Contact info footer */}
      <footer className="relative z-20 text-center text-white p-6 space-y-2">
        <div className="text-sm md:text-base">
          <div>📍 59 Northbourne Ave, Canberra City</div>
          <div>📞 Phone: (02) 6262 1158</div>
          <div>✉️ Email: info@themanornightclub.com.au</div>
        </div>
      </footer>
    </div>
  );
};

interface LavaBlobProps {
  text: string;
  startX: number;
  startY: number;
  delay: number;
  onClick: () => void;
}

const LavaBlob: React.FC<LavaBlobProps> = ({ text, startX, startY, delay, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Mark as settled after animation completes
      setTimeout(() => setIsSettled(true), 1500);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <div
      className="lava-blob px-4 py-2 text-sm font-semibold"
      style={{
        left: `${startX - 60}px`,
        top: `${startY}px`,
        animation: isSettled 
          ? 'lava-settle 0.5s ease-out forwards' 
          : 'lava-drip 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        animationDelay: '0ms',
        pointerEvents: isSettled ? 'auto' : 'none'
      }}
      onClick={isSettled ? onClick : undefined}
    >
      {text}
    </div>
  );
};

export default Index;