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
    <div className="min-h-screen text-manor-white">
      {/* Top Section - Dark Background with Leopard and Manor Logo */}
      <div className="relative h-screen flex flex-col">
        {/* Top 50% - Dark Background */}
        <div className="flex-1 relative" style={{ backgroundColor: '#271308' }}>
          {/* Leopard Image (simple PNG, no filters) */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
            <img
              src="/leopard-silhouette.png"
              alt="Leopard"
              className="w-40 h-40 md:w-48 md:h-48 object-contain"
            />
          </div>
          
          {/* Manor Logo and Leederville Subheader */}
          <div className="absolute top-56 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <div className="space-y-4">
              {/* Manor Logo */}
              <div className="flex justify-center">
                <img 
                  src="/manor-logo.png"
                  alt="Manor"
                  className="h-16 md:h-20 lg:h-24"
                />
              </div>
              
              {/* Leederville Subheader */}
              <div className="flex justify-center">
                <img 
                  src="/leederville-subheader.png"
                  alt="Leederville"
                  className="h-8 md:h-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 50% - Leopard Pattern Background */}
        <div className="flex-1 relative">
          {/* Leopard Pattern Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/leopard-pattern-bg.png)',
              backgroundSize: 'cover'
            }}
          />
          
          {/* Button Container - Centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black rounded-2xl p-4 mx-4 max-w-64 w-full">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/karaoke"
                  className="font-blur font-medium px-3 py-2 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap"
                  style={{ 
                    backgroundColor: '#D04E2B', 
                    color: '#271308',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: '#D04E2B'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#D04E2B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#D04E2B';
                    e.currentTarget.style.color = '#271308';
                  }}
                >
                  KARAOKE
                </Link>
                
                <Link 
                  to="/services"
                  className="font-blur font-medium px-3 py-2 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap"
                  style={{ 
                    backgroundColor: '#D04E2B', 
                    color: '#271308',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: '#D04E2B'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#D04E2B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#D04E2B';
                    e.currentTarget.style.color = '#271308';
                  }}
                >
                  VENUE HIRE
                </Link>
                
                <Link 
                  to="/priority-entry"
                  className="font-blur font-medium px-3 py-2 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap"
                  style={{ 
                    backgroundColor: '#D04E2B', 
                    color: '#271308',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: '#D04E2B'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#D04E2B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#D04E2B';
                    e.currentTarget.style.color = '#271308';
                  }}
                >
                  25+ PRIORITY
                </Link>
                
                <Link 
                  to="/birthdays-occasions"
                  className="font-blur font-medium px-3 py-2 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap"
                  style={{ 
                    backgroundColor: '#D04E2B', 
                    color: '#271308',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: '#D04E2B'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#D04E2B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#D04E2B';
                    e.currentTarget.style.color = '#271308';
                  }}
                >
                  GUEST LIST
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;