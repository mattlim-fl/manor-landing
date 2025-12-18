import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Index = () => {
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
      className="font-blur text-lg md:text-xl tracking-wider mb-6 text-center"
      style={{ color: '#E59D50' }}
    >
      Saturdays
      <br />
      9pm - 5am
    </p>
  );

  return (
    <div className="min-h-screen leopard-bg text-white overflow-hidden">
      <Header showLogo={true} showFollowLabel="always" />

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-8 pt-24">
        
        {/* ========== MOBILE LAYOUT (< md) ========== */}
        <div className="md:hidden flex flex-col items-center max-w-sm mx-auto pt-8">
          
          {/* Top Photos - Overlapping, behind content */}
          <div className="relative w-full h-52 mb-2">
            <img 
              src="/venue-disco-balls.png" 
              alt="Disco balls" 
              className="absolute left-0 top-8 w-[52%] h-auto rounded-lg shadow-2xl object-cover"
              style={{ zIndex: 1 }}
            />
            <img 
              src="/venue-bar-crowd.png" 
              alt="Bar and crowd" 
              className="absolute right-0 top-0 w-[52%] h-auto rounded-lg shadow-2xl object-cover"
              style={{ zIndex: 2 }}
            />
            {/* Leopard Disco Ball - overlapping photos */}
            <img 
              src="/leopard-mirrorball.png" 
              alt="Leopard disco ball" 
              className="absolute w-14 h-14 object-contain"
              style={{ right: '25%', bottom: '0px', zIndex: 10 }}
            />
          </div>

          {/* Hours + Buttons Section - on top of images */}
          <div className="relative w-full flex flex-col items-center" style={{ zIndex: 20 }}>
            <OpeningHours />
            <NavigationButtons />
          </div>

          {/* Bottom Photos - Overlapping, behind content */}
          <div className="relative w-full h-40 mt-4">
            <img 
              src="/venue-dancefloor.png" 
              alt="Dance floor" 
              className="absolute left-0 top-0 w-[52%] h-auto rounded-lg shadow-2xl object-cover"
              style={{ zIndex: 1 }}
            />
            <img 
              src="/venue-shots.png" 
              alt="Shots" 
              className="absolute right-0 top-6 w-[52%] h-auto rounded-lg shadow-2xl object-cover"
              style={{ zIndex: 2 }}
            />
          </div>
        </div>

        {/* ========== DESKTOP LAYOUT (md+) ========== */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="relative" style={{ minHeight: '85vh' }}>
            
            {/* Top Left - Disco Balls Photo */}
            <div 
              className="absolute z-10"
              style={{ 
                top: '0', 
                left: '0',
                width: 'clamp(180px, 35vw, 320px)'
              }}
            >
              <img 
                src="/venue-disco-balls.png" 
                alt="Disco balls" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Top Right - Bar Crowd Photo */}
            <div 
              className="absolute z-10"
              style={{ 
                top: '20px', 
                right: '0',
                width: 'clamp(180px, 35vw, 320px)'
              }}
            >
              <img 
                src="/venue-bar-crowd.png" 
                alt="Bar and crowd" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Center Content */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
              style={{ top: 'clamp(200px, 30vh, 280px)' }}
            >
              <OpeningHours />
              <NavigationButtons />
            </div>

            {/* Leopard Disco Ball (Right of buttons) */}
            <div 
              className="absolute z-30"
              style={{ 
                top: 'clamp(220px, 32vh, 300px)', 
                right: 'clamp(20px, 15vw, 180px)'
              }}
            >
              <img 
                src="/leopard-mirrorball.png" 
                alt="Leopard disco ball" 
                className="w-32 h-32 object-contain"
              />
            </div>

            {/* Bottom Left - Dancefloor Photo */}
            <div 
              className="absolute z-10"
              style={{ 
                bottom: '80px', 
                left: '0',
                width: 'clamp(180px, 35vw, 320px)'
              }}
            >
              <img 
                src="/venue-dancefloor.png" 
                alt="Dance floor" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Bottom Right - Shots Photo */}
            <div 
              className="absolute z-10"
              style={{ 
                bottom: '40px', 
                right: '0',
                width: 'clamp(180px, 35vw, 320px)'
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
