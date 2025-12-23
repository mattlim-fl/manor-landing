import { useState } from "react";
import Header from "../components/Header";
import TicketBookingModal from "../components/TicketBookingModal";

const PriorityEntry = () => {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
   return <div className="h-screen flex flex-col" style={{
    backgroundColor: '#271308',
    color: '#FFFFFF'
  }}>
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top 50% - Dark Background */}
        <div className="flex-1 flex flex-col justify-center items-center px-4" style={{ backgroundColor: '#271308' }}>
          {/* Disco Ball with Stars */}
          <div className="relative mb-6">
            {/* Stars around disco ball */}
            <div className="absolute -left-8 top-4 w-4 h-4" style={{ color: '#E59D50' }}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="absolute -right-8 top-4 w-4 h-4" style={{ color: '#E59D50' }}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="absolute -left-6 -top-2 w-3 h-3" style={{ color: '#E59D50' }}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="absolute -right-6 -top-2 w-3 h-3" style={{ color: '#E59D50' }}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            
            {/* Disco Ball */}
            <img
              src="/leopard-mirrorball.png"
              alt="Disco Ball"
              className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
            />
          </div>
          
          {/* 25+ PRIORITY ENTRY Heading */}
          <h1 className="font-blur font-medium text-4xl md:text-6xl lg:text-7xl animate-fade-in uppercase tracking-wider text-center" style={{
            color: '#CD3E28'
          }}>
            <div style={{ color: '#CD3E28' }}>25+</div>
            <div>PRIORITY</div>
            <div>ENTRY</div>
          </h1>
        </div>

        {/* Bottom 50% - Leopard Pattern Background */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 relative">
          {/* Leopard Pattern Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/leopard-pattern-bg.png)',
              backgroundSize: 'cover'
            }}
          />
          
          {/* Book Now Button */}
          <button 
            onClick={() => setIsTicketModalOpen(true)}
            className="relative z-10 inline-block font-blur font-medium px-8 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300 hover:scale-105 border-2 mb-8 cursor-pointer"
            style={{
              backgroundColor: '#D04E2B',
              color: '#FFFFFF',
              borderColor: '#271308'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#D04E2B';
              e.currentTarget.style.borderColor = '#D04E2B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#D04E2B';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#271308';
            }}
          >
            BOOK NOW
          </button>

          {/* Information Container */}
          <div className="relative z-10 text-center max-w-2xl">
            <div className="rounded-2xl px-6 py-4 border-2" style={{
              backgroundColor: '#271308',
              color: '#E59D50',
              borderColor: '#E59D50'
            }}>
              <p className="text-base md:text-lg mb-1">Disco from 11 'til late.</p>
              <p className="text-sm md:text-base mb-1">Skip the queue with Priority Entry and head straight inside.</p>
              <p className="text-sm md:text-base">Curated for a 25+ crowd.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Booking Modal */}
      <TicketBookingModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} defaultVenue="manor" />
    </div>;
};
export default PriorityEntry;