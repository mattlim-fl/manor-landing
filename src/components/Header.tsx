
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-manor-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo - conditionally rendered */}
          {showLogo && (
            <Link to="/" className="z-50 relative">
              <h1 className="manor-heading text-manor-white text-2xl md:text-3xl">
                MANOR
              </h1>
            </Link>
          )}

          {/* Mobile Menu Button - Hidden since no navigation items */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-[70] relative text-manor-white p-2 hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Hidden since no navigation items */}
      <div className={`md:hidden fixed inset-0 bg-black z-[60] transition-transform duration-300 hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col justify-center items-center h-full space-y-8">
          {/* No navigation items */}
        </div>
      </div>
    </header>
  );
};

export default Header;
