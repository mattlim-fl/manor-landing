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
    <div className="min-h-screen text-manor-white relative">
      {/* Top Section - Dark background with leopard silhouette */}
      <div className="relative" style={{ backgroundColor: '#2A1205', minHeight: '60vh' }}>
        {/* Leopard Silhouette at top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
          <img 
            src="/lovable-uploads/bf01414e-bf10-4821-8917-503d8692dfca.png"
            alt="Leopard silhouette"
            className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain animate-fade-in"
            loading="lazy"
          />
        </div>
        
        {/* Manor Logo - Centered */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
          <div className="pb-8">
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
            
            {/* Leederville Custom Image */}
            <div className="animate-fade-in">
              <img 
                src="/lovable-uploads/3b271aa8-2754-4f18-9c45-311d82e548d9.png"
                alt="Leederville"
                className="mx-auto h-8 md:h-10 lg:h-12 object-contain"
                loading="lazy"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.4))'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Leopard Pattern Background with Navigation */}
      <div 
        className="relative min-h-[40vh] flex flex-col justify-center items-center px-4 py-12"
        style={{
          backgroundImage: `url('/lovable-uploads/776dd338-05a7-4cb8-9db0-b41f503928ca.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Navigation Buttons */}
        <div className="relative z-10 flex flex-col space-y-4 max-w-xs w-full">
          <Link 
            to="/karaoke"
            className="btn-menu font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap shadow-lg"
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
            className="btn-menu font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap shadow-lg"
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
            className="btn-menu font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap shadow-lg"
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
            className="btn-menu font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap shadow-lg"
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
  );
};

export default Index;
