

import { Link } from "react-router-dom";

const Index = () => {
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
            <div className="pt-20 pb-8">
              <h1 className="manor-heading text-6xl md:text-8xl lg:text-9xl mb-6 animate-fade-in" style={{ color: '#E14116' }}>
                MANOR
              </h1>
              <div className="space-y-4 mb-12 animate-fade-in">
                <p className="text-lg md:text-xl font-light tracking-wider text-manor-gold">Leederville</p>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons - Bottom Right */}
          <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-20">
            <Link 
              to="/karaoke"
              className="font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
              style={{ 
                backgroundColor: '#060201', 
                color: '#F2993B',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: '#F2993B'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F2993B';
                e.currentTarget.style.color = '#060201';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#060201';
                e.currentTarget.style.color = '#F2993B';
              }}
            >
              Karaoke Booth
            </Link>
            
            <Link 
              to="/services"
              className="font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
              style={{ 
                backgroundColor: '#060201', 
                color: '#F2993B',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: '#F2993B'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F2993B';
                e.currentTarget.style.color = '#060201';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#060201';
                e.currentTarget.style.color = '#F2993B';
              }}
            >
              Venue Hire
            </Link>
            
            <Link 
              to="/priority-entry"
              className="font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
              style={{ 
                backgroundColor: '#060201', 
                color: '#F2993B',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: '#F2993B'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F2993B';
                e.currentTarget.style.color = '#060201';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#060201';
                e.currentTarget.style.color = '#F2993B';
              }}
            >
              25+ Priority
            </Link>
            
            <Link 
              to="/birthdays-occasions"
              className="font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
              style={{ 
                backgroundColor: '#060201', 
                color: '#F2993B',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: '#F2993B'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F2993B';
                e.currentTarget.style.color = '#060201';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#060201';
                e.currentTarget.style.color = '#F2993B';
              }}
            >
              Guest List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

