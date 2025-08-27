import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import TicketBookingModal from "../components/TicketBookingModal";
const PriorityEntry = () => {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const navigate = useNavigate();
   return <div className="min-h-screen text-manor-white" style={{
    backgroundColor: '#271308'
  }}>
      <Header />
      
      {/* Priority Entry Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center">
        {/* Background */}
        <div className="absolute inset-0" style={{
        backgroundColor: '#271308'
      }} />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 pt-20 md:pt-0">
          <div className="flex items-center justify-center w-full max-w-7xl mx-auto mb-8">
            <button
              onClick={() => navigate('/birthdays-occasions')}
              className="mr-4 p-2 transition-all duration-300 hover:scale-110"
              style={{ color: '#CD3E28' }}
            >
              <ChevronLeft size={32} className="md:w-12 md:h-12" />
            </button>
            <h1 className="manor-heading text-5xl md:text-7xl lg:text-8xl animate-fade-in flex-1 text-center" style={{
            color: '#E14116'
          }}>
              <div>25+</div>
              <div>PRIORITY</div>
              <div>ENTRY</div>
            </h1>
            <button
              onClick={() => navigate('/birthdays-occasions')}
              className="ml-4 p-2 transition-all duration-300 hover:scale-110"
              style={{ color: '#CD3E28' }}
            >
              <ChevronRight size={32} className="md:w-12 md:h-12" />
            </button>
          </div>
          
          <div className="mb-12 animate-fade-in">
            <button onClick={() => setIsTicketModalOpen(true)} className="font-bold px-8 py-4 rounded-full uppercase tracking-wider transition-all duration-300 text-sm inline-block cursor-pointer" style={{
            backgroundColor: '#D04E2B',
            color: '#FFFFFF',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#271308'
          }} onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = '#D04E2B';
          }} onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#D04E2B';
            e.currentTarget.style.color = '#FFFFFF';
          }}>
              BOOK NOW
            </button>
          </div>
          
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="text-lg leading-relaxed space-y-4 text-manor-white">
              <p>Leederville's late night lounge returns.</p>
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

      {/* Ticket Booking Modal */}
      <TicketBookingModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} defaultVenue="manor" />
    </div>;
};
export default PriorityEntry;