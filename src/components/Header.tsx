import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

interface HeaderProps {
  showLogo?: boolean;
}

const Header = ({ showLogo = true }: HeaderProps) => {
  // Social icons component for reuse
  const SocialIcons = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
    <div className={`flex items-center gap-2 ${className}`}>
      <a 
        href="https://instagram.com/manorleederville" 
        target="_blank" 
        rel="noopener noreferrer"
        className="transition-transform hover:scale-110"
        aria-label="Follow us on Instagram"
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#E59D50">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
      <a 
        href="https://facebook.com/manorleederville" 
        target="_blank" 
        rel="noopener noreferrer"
        className="transition-transform hover:scale-110"
        aria-label="Follow us on Facebook"
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#E59D50">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
      </a>
    </div>
  );

  return (
    <header className="w-full absolute top-0 left-0 right-0 z-50 pt-6 md:pt-8 px-4">
      {/* ========== MOBILE HEADER (< md) ========== */}
      <div className="md:hidden flex flex-col items-center pt-4">
        {/* Top row with logo and hamburger */}
        <div className="flex items-center justify-between w-full">
          {/* Empty spacer for balance */}
          <div className="w-8" />
          
          {/* Manor Script Logo - Centered, smaller on mobile */}
          {showLogo && (
            <Link to="/" className="flex flex-col items-center">
              <img 
                src="/manor-logo.png" 
                alt="Manor" 
                className="h-8 w-auto"
              />
              <img 
                src="/leederville-subheader.svg" 
                alt="Leederville" 
                className="h-2.5 w-auto mt-2"
              />
            </Link>
          )}
          
          {/* Hamburger Menu - Right side on mobile */}
          <MobileNav />
        </div>
        
        {/* Social Icons - Below logo on mobile */}
        <SocialIcons size={18} className="mt-3" />
      </div>

      {/* ========== DESKTOP HEADER (md+) ========== */}
      <div className="hidden md:flex max-w-6xl mx-auto justify-between items-center relative">
        {/* Manor Script Logo - Centered */}
        {showLogo && (
          <Link to="/" className="flex-1 flex flex-col items-center">
            <img 
              src="/manor-logo.png" 
              alt="Manor" 
              className="h-12 lg:h-14 w-auto"
            />
            <img 
              src="/leederville-subheader.svg" 
              alt="Leederville" 
              className="h-4 w-auto mt-2"
            />
          </Link>
        )}

        {/* Follow Us with Social Icons + Hamburger - Right side, centered with logo */}
        <div className="flex items-center gap-3 absolute right-4">
          <span 
            className="text-xs font-blur tracking-wide"
            style={{ color: '#E59D50' }}
          >
            Follow Us
          </span>
          <SocialIcons size={16} />
          <div className="ml-2">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
