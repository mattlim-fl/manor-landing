import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/karaoke", label: "Karaoke" },
    { to: "/venue-hire", label: "Venue Hire" },
    { to: "/priority-entry", label: "25+ Priority" },
    { to: "/guest-list", label: "Guest List" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="relative z-[100] w-8 h-8 flex flex-col justify-center items-center gap-1.5 transition-all duration-300"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-[#E59D50] transition-all duration-300 origin-center ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-[#E59D50] transition-all duration-300 ${
            isOpen ? "opacity-0 scale-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-[#E59D50] transition-all duration-300 origin-center ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Full Screen Overlay */}
      <div
        className={`fixed inset-0 z-[90] nav-overlay transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Navigation Links */}
        <nav className="relative z-10 h-full flex flex-col items-center justify-center gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={`font-blur font-bold text-2xl md:text-4xl uppercase tracking-wider transition-all duration-300 hover:scale-110 ${
                location.pathname === link.to
                  ? "text-[#FF3B1F]"
                  : "text-[#E59D50] hover:text-[#FF3B1F]"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`,
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Social Icons in Nav */}
          <div className="flex items-center gap-4 mt-8">
            <a
              href="https://instagram.com/manorleederville"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
              aria-label="Follow us on Instagram"
            >
              <svg width={28} height={28} viewBox="0 0 24 24" fill="#E59D50">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/manorleederville"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
              aria-label="Follow us on Facebook"
            >
              <svg width={28} height={28} viewBox="0 0 24 24" fill="#E59D50">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;




