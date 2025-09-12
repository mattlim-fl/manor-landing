
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  showLogo?: boolean;
}

const Header = ({ showLogo = true }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full" style={{ backgroundColor: 'rgba(42, 18, 5, 0.9)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo - conditionally rendered */}
          {showLogo && (
            <Link to="/" className="relative">
              <img 
                src="/manor-logo-updated.png"
                alt="Manor"
                className="h-8 md:h-10"
              />
            </Link>
          )}

          {/* Mobile Menu Button - Hidden since no navigation items */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative p-2 hidden"
            style={{ color: '#FFFFFF' }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Hidden since no navigation items */}
      <div className={`md:hidden transition-transform duration-300 hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ backgroundColor: '#000000' }}>
        <div className="flex flex-col justify-center items-center h-full space-y-8">
          {/* No navigation items */}
        </div>
      </div>
    </header>
  );
};

export default Header;
