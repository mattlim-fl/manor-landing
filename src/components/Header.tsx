import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

interface HeaderProps {
  showLogo?: boolean;
}

const Header = ({ showLogo = true }: HeaderProps) => {
  return (
    <header className="w-full absolute top-0 left-0 right-0 z-[100] pt-6 md:pt-8 px-4">
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
          <div className="-mt-6">
            <MobileNav />
          </div>
        </div>
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

        {/* Hamburger Menu - Right side */}
        <div className="flex items-center gap-3 absolute right-4 -mt-6">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
