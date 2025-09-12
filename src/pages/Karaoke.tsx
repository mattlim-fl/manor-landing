import React, { useState } from 'react';
import Header from '../components/Header';
import KaraokeBookingModal from '../components/KaraokeBookingModal';
const Karaoke = () => {
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBookKaraoke = () => {
    setIsBookingLoading(true);
    setIsModalOpen(true);
    setTimeout(() => setIsBookingLoading(false), 300);
  };
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
          
          {/* KARAOKE BOOTHS Heading */}
          <h1 className="font-blur font-medium text-5xl md:text-7xl lg:text-8xl animate-fade-in uppercase tracking-wider text-center" style={{
            color: '#CD3E28'
          }}>
            <div style={{ color: '#CD3E28' }}>KARAOKE</div>
            <div>BOOTHS</div>
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
            onClick={handleBookKaraoke} 
            disabled={isBookingLoading} 
            className="relative z-10 inline-block font-blur font-medium px-8 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed border-2 mb-8"
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
            {isBookingLoading ? 'Loading...' : 'BOOK NOW'}
          </button>

          {/* Description Box */}
          <div className="relative z-10 text-center max-w-2xl">
            <div className="rounded-2xl px-6 py-4 border-2" style={{
              backgroundColor: '#271308',
              color: '#E59D50',
              borderColor: '#E59D50'
            }}>
              <p className="text-base md:text-lg mb-1">Private karaoke booth now available for hire!</p>
              <p className="text-sm md:text-base">Perfect for birthdays, special occasions or just a fun night out with friends.</p>
            </div>
          </div>
        </div>
      </div>
      <KaraokeBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>;
};
export default Karaoke;