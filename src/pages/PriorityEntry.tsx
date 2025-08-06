
import { Link } from "react-router-dom";
import Header from "../components/Header";

// Declare global functions for VIP booking
declare global {
  interface Window {
    openVIPModal: () => void;
    openManorVIPModal: () => void;
    openHippieVIPModal: () => void;
  }
}

const PriorityEntry = () => {
  return (
    <div className="min-h-screen text-manor-white" style={{ backgroundColor: '#2A1205' }}>
      <Header />
      
      {/* Priority Entry Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center">
        {/* Background */}
        <div className="absolute inset-0" style={{ backgroundColor: '#2A1205' }} />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 pt-20 md:pt-0">
          <h1 className="manor-heading text-5xl md:text-7xl lg:text-8xl mb-8 animate-fade-in" style={{ color: '#E14116' }}>
            <div>25+</div>
            <div>PRIORITY</div>
            <div>ENTRY</div>
          </h1>
          
          <div className="mb-12 animate-fade-in">
            <button 
              onClick={() => window.openVIPModal?.()}
              className="font-bold px-8 py-4 rounded-full uppercase tracking-wider transition-all duration-300 text-sm inline-block cursor-pointer"
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
              BOOK VIP ENTRY
            </button>
          </div>
          
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="text-lg leading-relaxed space-y-4 text-manor-white">
              <p>The Manor - Leederville's late night lounge returns.</p>
              <p>Disco from 11 'til late.</p>
              <p>Enter via Hippie Club and take the tunnel.</p>
              <br />
              <p>Skip the queue with Priority Entry and head straight to the front.</p>
              <br />
              <p>Curated for a 25+ crowd.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityEntry;
