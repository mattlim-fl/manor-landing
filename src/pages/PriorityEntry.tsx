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
      <div className="flex-1 flex flex-col pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto w-full text-center">
          
          {/* Page Title */}
          <h1 
            className="font-blur font-bold text-4xl md:text-5xl lg:text-6xl mb-8 uppercase tracking-wider"
            style={{ color: '#E59D50' }}
          >
            25+ Priority Entry
          </h1>

          {/* Description */}
          <div className="mb-8 space-y-2">
            <p 
              className="text-lg md:text-xl font-acumin"
              style={{ color: '#E59D50' }}
            >
              Disco from 11 'til late.
            </p>
            <p 
              className="text-base md:text-lg font-acumin"
              style={{ color: '#E59D50' }}
            >
              Skip the queue with Priority Entry and head straight inside.
            </p>
            <p 
              className="text-base md:text-lg font-acumin"
              style={{ color: '#E59D50' }}
            >
              Curated for a 25+ crowd.
            </p>
          </div>

          {/* Book Now Button */}
          <div className="mb-12">
            <a 
              href="https://megatix.com.au/white-label/manor-leederville-priority-entry"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-btn inline-block font-blur font-bold px-10 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300"
            >
              BOOK NOW
            </a>
          </div>

          {/* Large Venue Photo */}
          <div className="w-full">
            <img 
              src="/venue-courtyard.png" 
              alt="Manor courtyard" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>

        </div>
      </div>

      <Footer />

      {/* Ticket Booking Modal */}
      <TicketBookingModal 
        isOpen={isTicketModalOpen} 
        onClose={() => setIsTicketModalOpen(false)} 
        defaultVenue="manor" 
      />
    </div>
  );
};

export default PriorityEntry;
