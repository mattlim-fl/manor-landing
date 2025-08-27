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
   return <div className="h-screen" style={{
    backgroundColor: '#271308',
    color: '#FFFFFF'
  }}>
      <Header />
      
      {/* Main Content */}
      <div className="h-full flex flex-col" style={{
        backgroundColor: '#271308'
      }}>
        {/* Top spacing - Reduced by 50% */}
        <div className="h-20"></div>
        
        {/* Center content - Heading and Button */}
        <div className="flex flex-col items-center text-center px-4 z-10">
          <h1 className="manor-heading text-6xl md:text-8xl lg:text-9xl mb-6 animate-fade-in" style={{
            color: '#CD3E28'
          }}>
            <div>KARAOKE</div>
            <div>BOOTHS</div>
          </h1>
          <div className="space-y-4 mb-12 animate-fade-in">
            <button onClick={handleBookKaraoke} disabled={isBookingLoading} className="inline-block font-bold px-8 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed" style={{
              backgroundColor: '#D04E2B',
              color: '#060201'
            }}>
              {isBookingLoading ? 'Loading...' : 'Book Now'}
            </button>
          </div>
        </div>

        {/* Middle spacing - Reduced by 50% */}
        <div className="h-24"></div>

        {/* Pill Box - Centered in lower section */}
        <div className="flex items-center justify-center px-4 pb-16 z-10">
          <div className="text-center max-w-2xl">
            <div className="rounded-full px-8 py-6 border-2" style={{
              backgroundColor: '#060201',
              color: '#D04E2B',
              borderColor: '#D04E2B'
            }}>
              <p className="text-lg md:text-xl mb-2">Private karaoke booth now available for hire!</p>
              <p className="text-sm md:text-base">Perfect for birthdays, special occasions or just a fun night out with friends.</p>
            </div>
          </div>
        </div>

        {/* Bottom spacing - Reduced by 70% */}
        <div className="h-16"></div>
      </div>
      <KaraokeBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>;
};
export default Karaoke;