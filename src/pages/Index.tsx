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
          
          {/* Hippie Club - Top Right */}
          <div className="absolute top-6 right-6 text-right z-10">
            <div className="manor-heading text-2xl md:text-3xl lg:text-4xl" style={{ color: '#E14116' }}>
              <div>HIPPIE</div>
              <div className="mb-3">CLUB</div>
              <Link 
                to="#"
                className="font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap inline-block"
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
                <div>SISTER</div>
                <div>VENUE</div>
              </Link>
            </div>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <div className="pt-20 pb-8">
              <h1 className="manor-heading text-6xl md:text-8xl lg:text-9xl mb-6 animate-fade-in" style={{ color: '#E14116' }}>
                MANOR
              </h1>
              <div className="space-y-4 mb-12 animate-fade-in">
                <div 
                  className="inline-block font-bold px-4 py-2 rounded-full uppercase tracking-wider text-sm"
                  style={{ 
                    backgroundColor: '#F2993B', 
                    color: '#060201'
                  }}
                >
                  Leederville
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons - Bottom Right */}
          <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-20">
            <Link 
              to="/karaoke"
              className="font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
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
              className="font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
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
              className="font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
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
              className="font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 text-xs text-center whitespace-nowrap"
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
  );
};

export default Index;
