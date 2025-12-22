import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Index = () => {
  // NOTE: This page contains many hardcoded positioning values fine-tuned to match designer's vision.
  // See TECHNICAL_DEBT.md for details on refactoring opportunities.

  // Shared navigation buttons component
  const NavigationButtons = () => (
    <div className="flex flex-col gap-3 w-full" style={{ minWidth: '200px', maxWidth: '280px' }}>
      <Link 
        to="/karaoke"
        className="nav-btn font-blur font-bold px-8 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-center text-base"
      >
        Karaoke
      </Link>
      
      <Link 
        to="/services"
        className="nav-btn font-blur font-bold px-8 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-center text-base"
      >
        Venue Hire
      </Link>
      
      <Link 
        to="/priority-entry"
        className="nav-btn font-blur font-bold px-8 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-center text-base"
      >
        25+ Priority
      </Link>
      
      <Link 
        to="/birthdays-occasions"
        className="nav-btn font-blur font-bold px-8 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-center text-base"
      >
        Guest List
      </Link>
    </div>
  );

  // Shared opening hours component
  const OpeningHours = () => (
    <p 
      className="font-blur text-lg md:text-xl tracking-wider mb-6 text-center leading-tight"
      style={{ color: '#E59D50', lineHeight: '1.2' }}
    >
      Saturdays
      <br />
      9pm - 5am
    </p>
  );

  // Rotating "Give Me The Night" Badge SVG
  const RotatingBadge = ({ className = "" }: { className?: string }) => (
    <div className={className}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <path
            id="circlePath"
            d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
          />
        </defs>
        <text fill="#E59D50" fontSize="11" fontFamily="FF Blur, Inter, sans-serif" fontWeight="bold" letterSpacing="2">
          <textPath href="#circlePath" startOffset="0%">
            GIVE ME THE NIGHT · GIVE ME THE NIGHT · 
          </textPath>
        </text>
      </svg>
    </div>
  );

  // Sparkle/Star decoration component
  const Sparkle = ({ size = 16, className = "", delay = 0 }: { size?: number; className?: string; delay?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="#E59D50" 
      className={`${delay === 0 ? 'animate-sparkle' : delay === 1 ? 'animate-sparkle-delayed' : 'animate-sparkle-delayed-2'} ${className}`}
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );

  return (
    <div className="min-h-screen leopard-bg text-white overflow-hidden">
      <Header showLogo={true} />

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-24 md:pb-8 pt-24">
        
        {/* ========== MOBILE LAYOUT (< md) ========== */}
        <div className="md:hidden relative max-w-md mx-auto pt-4" style={{ minHeight: '85vh' }}>
          
          {/* Left side images - overlapping behind center */}
          {/* Disco balls - top left, extending toward center */}
          <img 
            src="/venue-disco-balls.png" 
            alt="Disco balls" 
            className="absolute w-[58%] h-auto rounded-lg shadow-2xl object-cover"
            style={{ 
              left: '10%', 
              top: '80px', 
              zIndex: 5
            }}
          />
          
          {/* Dancefloor - bottom left, overlapping behind buttons */}
          <img 
            src="/venue-dancefloor.png" 
            alt="Dance floor" 
            className="absolute w-[78%] h-auto rounded-lg shadow-2xl object-cover"
            style={{ 
              left: '-10%', 
              top: '42%', 
              zIndex: 5
            }}
          />

          {/* Right side images - overlapping behind center */}
          {/* Bar crowd - positioned behind buttons */}
          <img 
            src="/venue-bar-crowd.png" 
            alt="Bar and crowd" 
            className="absolute w-[60%] h-auto rounded-lg shadow-2xl object-cover"
            style={{ 
              left: '50%', 
              top: '32%', 
              zIndex: 5
            }}
          />
          
          {/* Shots - below buttons, more central */}
          <img 
            src="/venue-shots.png" 
            alt="Shots" 
            className="absolute w-[58%] h-auto rounded-lg shadow-2xl object-cover"
            style={{ 
              left: '50%', 
              transform: 'translateX(-40%)',
              top: '68%', 
              zIndex: 5
            }}
          />

          {/* Center Content - In front of all images */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ top: '35%', zIndex: 20 }}
          >
            <OpeningHours />
            <NavigationButtons />
          </div>

          {/* Leopard Disco Ball with sparkles - overlapping disco balls image */}
          <div 
            className="absolute"
            style={{ right: '15%', top: '5%', zIndex: 25 }}
          >
            <Sparkle size={10} className="absolute -top-2 -right-1" delay={0} />
            <Sparkle size={8} className="absolute -top-3 right-4" delay={1} />
            <img 
              src="/leopard-mirrorball.png" 
              alt="Leopard disco ball" 
              className="w-24 h-24 object-contain"
            />
            <Sparkle size={8} className="absolute -bottom-1 -left-2" delay={2} />
          </div>

          {/* Rotating Badge - positioned to the left of shots photo */}
          <div 
            className="absolute"
            style={{ 
              left: '5%', 
              top: 'calc(68% + 200px)', 
              zIndex: 15
            }}
          >
            <RotatingBadge className="w-20 h-20" />
          </div>
        </div>

        {/* ========== DESKTOP LAYOUT (md+) ========== */}
        <div className="hidden md:block max-w-6xl mx-auto">
          <div className="relative" style={{ minHeight: '90vh' }}>
            
            {/* ===== LEFT COLUMN - Photos positioned to overlap behind center ===== */}
            {/* Disco Balls Photo - Top left, extending toward center */}
            <div 
              className="absolute"
              style={{ 
                top: '0', 
                left: 'clamp(40px, 8vw, 120px)',
                width: 'clamp(280px, 38vw, 420px)',
                zIndex: 5
              }}
            >
              <img 
                src="/venue-disco-balls.png" 
                alt="Disco balls" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Dancefloor Photo - Below disco balls, overlapping behind buttons */}
            <div 
              className="absolute"
              style={{ 
                top: 'clamp(340px, 50vh, 480px)', 
                left: 'clamp(100px, 14vw, 180px)',
                width: 'clamp(280px, 38vw, 420px)',
                zIndex: 5
              }}
            >
              <img 
                src="/venue-dancefloor.png" 
                alt="Dance floor" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Rotating Badge - Bottom left, overlapping dancefloor */}
            <div 
              className="absolute"
              style={{ 
                top: 'clamp(550px, 68vh, 800px)', 
                left: 'clamp(40px, 6vw, 100px)',
                zIndex: 15
              }}
            >
              <RotatingBadge />
            </div>

            {/* ===== CENTER CONTENT - In front of images ===== */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ 
                top: 'clamp(200px, 32vh, 300px)',
                zIndex: 20
              }}
            >
              <OpeningHours />
              <NavigationButtons />
            </div>

            {/* ===== RIGHT COLUMN - Photos positioned to overlap behind center ===== */}
            {/* Bar Crowd Photo - Top right, extending toward center */}
            <div 
              className="absolute"
              style={{ 
                top: 'clamp(60px, 8vh, 120px)', 
                right: 'clamp(40px, 8vw, 120px)',
                width: 'clamp(280px, 38vw, 420px)',
                zIndex: 5
              }}
            >
              <img 
                src="/venue-bar-crowd.png" 
                alt="Bar and crowd" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Leopard Disco Ball with Sparkles - Right side near buttons */}
            <div 
              className="absolute"
              style={{ 
                top: 'clamp(280px, 42vh, 380px)', 
                right: 'clamp(80px, 14vw, 200px)',
                zIndex: 25
              }}
            >
              {/* Sparkles around the ball */}
              <Sparkle size={14} className="absolute -top-4 left-0" delay={0} />
              <Sparkle size={10} className="absolute -top-2 right-2" delay={1} />
              <Sparkle size={12} className="absolute top-16 -right-4" delay={2} />
              <Sparkle size={10} className="absolute bottom-4 -left-3" delay={1} />
              
              <img 
                src="/leopard-mirrorball.png" 
                alt="Leopard disco ball" 
                className="w-[134px] h-[134px] lg:w-[173px] lg:h-[173px] object-contain"
              />
            </div>

            {/* Shots Photo - Bottom right, overlapping behind buttons */}
            <div 
              className="absolute"
              style={{ 
                top: 'clamp(360px, 52vh, 480px)', 
                right: 'clamp(40px, 8vw, 120px)',
                width: 'clamp(224px, 30.4vw, 336px)',
                zIndex: 5
              }}
            >
              <img 
                src="/venue-shots.png" 
                alt="Shots" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
