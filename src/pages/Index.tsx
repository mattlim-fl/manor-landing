import { useState } from "react";
import { Link } from "react-router-dom";
import manorLogo from "../assets/img/manor-logo.png";

// Declare global functions for VIP booking
declare global {
  interface Window {
    openVIPModal: () => void;
    openManorVIPModal: () => void;
    openHippieVIPModal: () => void;
  }
}

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStepInsideClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(15);
    }
    setIsMenuOpen(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen text-manor-white" style={{ backgroundColor: '#2A1205' }}>
      {/* Hero Section - Full Width */}
      <div className="relative min-h-screen flex flex-col">
        {/* Main Hero */}
        <div className="flex-1 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0" style={{ backgroundColor: '#2A1205' }} />
          
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <div className="pb-8" style={{ paddingTop: 'calc(5rem - 24px)' }}>
              <img 
                src="/lovable-uploads/b93c74ae-d273-4840-bbfb-081124365b94.png"
                alt="Manor nightclub logo"
                className="hero-logo animate-fade-in"
                loading="lazy"
                style={{
                  display: 'block',
                  width: '70vw',
                  maxWidth: '260px',
                  height: 'auto',
                  margin: '0 auto 16px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.4))'
                }}
              />
              <div className="space-y-4 mb-12 animate-fade-in">
                <h1 
                  className="inline-block font-bold px-4 py-2 rounded-full uppercase tracking-wider text-sm"
                  style={{ 
                    backgroundColor: '#F2993B', 
                    color: '#060201'
                  }}
                >
                  Leederville
                </h1>
                
                {/* Stacked Pill Buttons */}
                <div className="flex flex-col gap-3 items-center w-full max-w-xs mx-auto">
                  <Link 
                    to="/karaoke"
                    className="w-full font-bold px-4 py-2 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center"
                    style={{ 
                      backgroundColor: '#F2993B', 
                      color: '#060201',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: '#F2993B'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#060201';
                      e.currentTarget.style.color = '#F2993B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F2993B';
                      e.currentTarget.style.color = '#060201';
                    }}
                  >
                    Karaoke
                  </Link>
                  
                  <Link 
                    to="/services"
                    className="w-full font-bold px-4 py-2 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center"
                    style={{ 
                      backgroundColor: '#F2993B', 
                      color: '#060201',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: '#F2993B'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#060201';
                      e.currentTarget.style.color = '#F2993B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F2993B';
                      e.currentTarget.style.color = '#060201';
                    }}
                  >
                    Venue Hire
                  </Link>
                  
                  <Link 
                    to="/priority-entry"
                    className="w-full font-bold px-4 py-2 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center"
                    style={{ 
                      backgroundColor: '#F2993B', 
                      color: '#060201',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: '#F2993B'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#060201';
                      e.currentTarget.style.color = '#F2993B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F2993B';
                      e.currentTarget.style.color = '#060201';
                    }}
                  >
                    25+ Priority
                  </Link>
                  
                  <Link 
                    to="/birthdays-occasions"
                    className="w-full font-bold px-4 py-2 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center"
                    style={{ 
                      backgroundColor: '#F2993B', 
                      color: '#060201',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: '#F2993B'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#060201';
                      e.currentTarget.style.color = '#F2993B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F2993B';
                      e.currentTarget.style.color = '#060201';
                    }}
                  >
                    Guest List
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Index;
