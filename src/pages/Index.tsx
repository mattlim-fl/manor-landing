import { Link } from "react-router-dom";

// Declare global functions for VIP booking
declare global {
  interface Window {
    openVIPModal: () => void;
    openManorVIPModal: () => void;
    openHippieVIPModal: () => void;
  }
}

const Index = () => {

  return (
    <div className="min-h-screen text-manor-white" style={{ backgroundColor: '#271308' }}>
      {/* Fixed Navigation Buttons - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <Link 
          to="/karaoke"
          className="btn-menu font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
          style={{ 
            backgroundColor: '#D04E2B', 
            color: '#060201',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#D04E2B'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#060201';
            e.currentTarget.style.color = '#D04E2B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#D04E2B';
            e.currentTarget.style.color = '#060201';
          }}
        >
          Karaoke
        </Link>
        
        <Link 
          to="/services"
          className="btn-menu font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
          style={{ 
            backgroundColor: '#D04E2B', 
            color: '#060201',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#D04E2B'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#060201';
            e.currentTarget.style.color = '#D04E2B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#D04E2B';
            e.currentTarget.style.color = '#060201';
          }}
        >
          Venue Hire
        </Link>
        
        <Link 
          to="/priority-entry"
          className="btn-menu font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
          style={{ 
            backgroundColor: '#D04E2B', 
            color: '#060201',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#D04E2B'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#060201';
            e.currentTarget.style.color = '#D04E2B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#D04E2B';
            e.currentTarget.style.color = '#060201';
          }}
        >
          25+ Priority
        </Link>
        
        <Link 
          to="/birthdays-occasions"
          className="btn-menu font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
          style={{ 
            backgroundColor: '#D04E2B', 
            color: '#060201',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#D04E2B'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#060201';
            e.currentTarget.style.color = '#D04E2B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#D04E2B';
            e.currentTarget.style.color = '#060201';
          }}
        >
          Guest List
        </Link>
      </div>
      {/* Hero Section - Full Width */}
      <div className="relative min-h-screen flex flex-col">
        {/* Main Hero */}
        <div className="flex-1 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0" style={{ backgroundColor: '#271308' }} />
          
          
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
                    backgroundColor: '#D04E2B', 
                    color: '#060201'
                  }}
                >
                  TEST BRANCH 4
                </h1>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Index;
