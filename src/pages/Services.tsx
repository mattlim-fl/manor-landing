import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import DirectVenueBookingModal from "../components/DirectVenueBookingModal";
const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<{
    venue: 'manor';
    venueArea: 'upstairs' | 'downstairs' | 'full_venue';
  }>({
    venue: 'manor',
    venueArea: 'downstairs'
  });
  const openBookingModal = (venueArea: 'upstairs' | 'downstairs' | 'full_venue') => {
    setSelectedVenue({
      venue: 'manor',
      venueArea
    });
    setIsModalOpen(true);
  };
   return <div className="min-h-screen text-manor-white" style={{
    backgroundColor: '#271308'
  }}>
      <Header />
      
      {/* Services Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center">
        {/* Background */}
        <div className="absolute inset-0" style={{
        backgroundColor: '#271308'
      }} />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 pt-20 md:pt-0">
          <h1 className="font-blur font-medium text-5xl md:text-7xl lg:text-8xl mb-12 animate-fade-in uppercase tracking-wider" style={{
          color: '#CD3E28'
        }}>
            VENUE HIRE
          </h1>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 animate-fade-in">
            {/* Downstairs */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px] flex flex-col">
              <div className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" style={{
              backgroundImage: `url('/downstairs-1.jpg')`
            }} />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-12 py-8">
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="font-blur font-medium text-3xl md:text-4xl lg:text-5xl mb-6 uppercase tracking-wider" style={{
                  color: '#CD3E28'
                }}>
                    DOWNSTAIRS
                  </h2>
                  <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg mx-auto">
                    Featuring the main bar, dance floor and courtyard.
                  </p>
                  <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg mx-auto">For 50 to 150 guests.</p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  
                  <Link to="/downstairs" className="font-blur font-medium px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap" style={{
                  backgroundColor: '#D04E2B',
                  color: '#060201',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: '#D04E2B'
                }} onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#D04E2B';
                }} onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#D04E2B';
                  e.currentTarget.style.color = '#060201';
                }}>
                    INFO
                  </Link>
                </div>
              </div>
            </div>

            {/* Upstairs */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px] flex flex-col">
              <div className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" style={{
              backgroundImage: `url('/upstairs-2.jpg')`
            }} />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-between text-center px-12 py-8">
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="font-blur font-medium text-3xl md:text-4xl lg:text-5xl mb-6 uppercase tracking-wider" style={{
                  color: '#CD3E28'
                }}>
                    UPSTAIRS
                  </h2>
                  <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg mx-auto">
                    Featuring the karaoke booth, lounge bar and dance floor views.
                  </p>
                  <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg mx-auto">For 20 to 70 guests.</p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  
                  <Link to="/upstairs" className="font-blur font-medium px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap" style={{
                  backgroundColor: '#D04E2B',
                  color: '#060201',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: '#D04E2B'
                }} onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#D04E2B';
                }} onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#D04E2B';
                  e.currentTarget.style.color = '#060201';
                }}>
                    INFO
                  </Link>
                </div>
              </div>
            </div>

            {/* Full Venue */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px] lg:col-span-1 md:col-span-2 flex flex-col">
              <div className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" style={{
              backgroundImage: `url('/full-venue-1.jpg')`
            }} />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-between text-center px-12 py-8">
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="font-blur font-medium text-3xl md:text-4xl lg:text-5xl mb-6 uppercase tracking-wider" style={{
                  color: '#CD3E28'
                }}>
                    FULL VENUE
                  </h2>
                  <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg mx-auto">Exclusive hire of Manor for events, celebrations and corporate functions.</p>
                  <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg mx-auto">For 150 to 250 guests.</p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  
                  <Link to="/full-venue" className="font-blur font-medium px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap" style={{
                  backgroundColor: '#D04E2B',
                  color: '#060201',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: '#D04E2B'
                }} onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#D04E2B';
                }} onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#D04E2B';
                  e.currentTarget.style.color = '#060201';
                }}>
                    INFO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Booking Modal */}
      <DirectVenueBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} defaultVenue={selectedVenue.venue} defaultVenueArea={selectedVenue.venueArea} />
    </div>;
};
export default Services;