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
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Main Content Container */}
      <div className="min-h-screen flex flex-col">
        
        {/* Top Section - Clean white background with all brand elements */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 space-y-8">
          
          {/* Leopard Silhouette */}
          <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
            <img 
              src="/lovable-uploads/bf01414e-bf10-4821-8917-503d8692dfca.png"
              alt="Leopard silhouette"
              className="w-full h-full object-contain animate-fade-in"
              loading="lazy"
            />
          </div>
          
          {/* Manor Logo */}
          <div className="w-full max-w-xs">
            <img 
              src="/lovable-uploads/b93c74ae-d273-4840-bbfb-081124365b94.png"
              alt="Manor nightclub logo"
              className="w-full h-auto animate-fade-in"
              loading="lazy"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.2))'
              }}
            />
          </div>
          
          {/* Leederville Text */}
          <div className="h-6 md:h-8">
            <img 
              src="/lovable-uploads/3b271aa8-2754-4f18-9c45-311d82e548d9.png"
              alt="Leederville"
              className="h-full w-auto animate-fade-in"
              loading="lazy"
              style={{
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.2))'
              }}
            />
          </div>
        </div>

        {/* Navigation Section - Clean gray background */}
        <div className="bg-gray-100 px-4 py-8">
          <div className="max-w-xs mx-auto flex flex-col space-y-4">
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
    </div>
  );
};

export default Index;
