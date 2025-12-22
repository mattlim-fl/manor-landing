import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-12 px-4 relative z-10">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        {/* Leopard Mascot - Using designer asset */}
        <div className="mb-6">
          <img 
            src="/leopard-silhouette.svg" 
            alt="Manor Leopard" 
            className="w-16 h-28 md:w-20 md:h-36 object-contain"
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-1 mb-6">
          <p 
            className="text-xs font-acumin tracking-wide"
            style={{ color: '#E59D50' }}
          >
            663 Newcastle St, Leederville WA 6060
          </p>
          <p 
            className="text-xs font-acumin tracking-wide"
            style={{ color: '#E59D50' }}
          >
            P{' '}
            <a 
              href="tel:+61892278349" 
              className="hover:underline"
            >
              (08) 9227 8349
            </a>
          </p>
          <p 
            className="text-xs font-acumin tracking-wide"
            style={{ color: '#E59D50' }}
          >
            E{' '}
            <a 
              href="mailto:afterdark@manorleederville.com.au" 
              className="hover:underline"
            >
              afterdark@manorleederville.com.au
            </a>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2">
          <a 
            href="https://instagram.com/manorleederville" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 transition-transform hover:scale-110"
            aria-label="Follow us on Instagram"
          >
            <Instagram size={24} style={{ color: '#E59D50' }} />
          </a>
          <a 
            href="https://facebook.com/manorleederville" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 transition-transform hover:scale-110"
            aria-label="Follow us on Facebook"
          >
            <Facebook size={24} style={{ color: '#E59D50' }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
