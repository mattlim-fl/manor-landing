import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TicketBookingModal from "../components/TicketBookingModal";

const PriorityEntry = () => {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col leopard-bg text-white">
      <Header showLogo={true} />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
          
          {/* Disco Ball with Stars */}
          <div className="relative mb-8">
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
          <h1 
            className="font-blur font-bold text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-center mb-12"
            style={{ color: '#E59D50' }}
          >
            25+ Priority Entry
          </h1>
          
          {/* Book Now Button */}
          <button 
            onClick={() => setIsTicketModalOpen(true)}
            className="nav-btn font-blur font-bold px-10 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300 mb-8"
          >
            BOOK NOW
          </button>

          {/* Information Container */}
          <div className="text-center max-w-2xl">
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
      </main>

      <Footer />

      {/* Ticket Booking Modal */}
      <TicketBookingModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} defaultVenue="manor" />
    </div>
  );
};

export default PriorityEntry;