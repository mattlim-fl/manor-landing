import Footer from '../components/Footer'
import Header from '../components/Header'
import {
  NavigationButtons,
  OpeningHours,
  RotatingBadge,
  Sparkle,
} from '../components/homepage'

/**
 * Homepage with overlapping image layout.
 * NOTE: Contains many hardcoded positioning values fine-tuned to match designer's vision.
 * See TECHNICAL_DEBT.md for details on refactoring opportunities.
 */
const Index = () => {
  return (
    <div className="min-h-screen leopard-bg text-white overflow-hidden">
      <Header showLogo={true} />

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-24 md:pb-8 pt-24">

        {/* ========== MOBILE LAYOUT (< md) ========== */}
        <div className="md:hidden relative max-w-md mx-auto pt-4" style={{ minHeight: '85vh' }}>

          {/* Left side images - overlapping behind center */}
          <img
            src="/venue-disco-balls.jpg"
            alt="Disco balls"
            className="absolute w-[58%] h-auto rounded-lg shadow-2xl object-cover"
            style={{ left: '10%', top: '80px', zIndex: 5 }}
          />

          <img
            src="/venue-dancefloor.jpg"
            alt="Dance floor"
            loading="lazy"
            className="absolute w-[78%] h-auto rounded-lg shadow-2xl object-cover"
            style={{ left: '-10%', top: '42%', zIndex: 5 }}
          />

          {/* Right side images */}
          <img
            src="/venue-bar-crowd.jpg"
            alt="Bar and crowd"
            loading="lazy"
            className="absolute w-[60%] h-auto rounded-lg shadow-2xl object-cover"
            style={{ left: '50%', top: '32%', zIndex: 5 }}
          />

          <img
            src="/venue-shots.jpg"
            alt="Shots"
            loading="lazy"
            className="absolute w-[58%] h-auto rounded-lg shadow-2xl object-cover"
            style={{ left: '50%', transform: 'translateX(-40%)', top: '68%', zIndex: 5 }}
          />

          {/* Center Content - In front of all images */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ top: '35%', zIndex: 20 }}
          >
            <OpeningHours />
            <NavigationButtons />
          </div>

          {/* Leopard Disco Ball with sparkles */}
          <div className="absolute" style={{ right: '15%', top: '5%', zIndex: 25 }}>
            <Sparkle size={10} className="absolute -top-2 -right-1" delay={0} />
            <Sparkle size={8} className="absolute -top-3 right-4" delay={1} />
            <img
              src="/leopard-mirrorball.png"
              alt="Leopard disco ball"
              className="w-24 h-24 object-contain"
            />
            <Sparkle size={8} className="absolute -bottom-1 -left-2" delay={2} />
          </div>

          {/* Rotating Badge */}
          <div
            className="absolute"
            style={{ left: '5%', top: 'calc(68% + 200px)', zIndex: 15 }}
          >
            <RotatingBadge className="w-20 h-20" />
          </div>
        </div>

        {/* ========== DESKTOP LAYOUT (md+) ========== */}
        <div className="hidden md:block max-w-6xl mx-auto">
          <div className="relative" style={{ minHeight: '90vh' }}>

            {/* ===== LEFT COLUMN ===== */}
            <div
              className="absolute"
              style={{
                top: '0',
                left: 'clamp(40px, 8vw, 120px)',
                width: 'clamp(280px, 38vw, 420px)',
                zIndex: 5,
              }}
            >
              <img
                src="/venue-disco-balls.jpg"
                alt="Disco balls"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            <div
              className="absolute"
              style={{
                top: 'clamp(340px, 50vh, 480px)',
                left: 'clamp(100px, 14vw, 180px)',
                width: 'clamp(280px, 38vw, 420px)',
                zIndex: 5,
              }}
            >
              <img
                src="/venue-dancefloor.jpg"
                alt="Dance floor"
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            <div
              className="absolute"
              style={{
                top: 'clamp(550px, 68vh, 800px)',
                left: 'clamp(40px, 6vw, 100px)',
                zIndex: 15,
              }}
            >
              <RotatingBadge />
            </div>

            {/* ===== CENTER CONTENT ===== */}
            <div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ top: 'clamp(200px, 32vh, 300px)', zIndex: 20 }}
            >
              <OpeningHours />
              <NavigationButtons />
            </div>

            {/* ===== RIGHT COLUMN ===== */}
            <div
              className="absolute"
              style={{
                top: 'clamp(60px, 8vh, 120px)',
                right: 'clamp(40px, 8vw, 120px)',
                width: 'clamp(280px, 38vw, 420px)',
                zIndex: 5,
              }}
            >
              <img
                src="/venue-bar-crowd.jpg"
                alt="Bar and crowd"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Leopard Disco Ball with Sparkles */}
            <div
              className="absolute"
              style={{
                top: 'clamp(280px, 42vh, 380px)',
                right: 'clamp(80px, 14vw, 200px)',
                zIndex: 25,
              }}
            >
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

            <div
              className="absolute"
              style={{
                top: 'clamp(360px, 52vh, 480px)',
                right: 'clamp(40px, 8vw, 120px)',
                width: 'clamp(224px, 30.4vw, 336px)',
                zIndex: 5,
              }}
            >
              <img
                src="/venue-shots.jpg"
                alt="Shots"
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Index
