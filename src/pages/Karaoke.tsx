import React, { useState } from 'react';
import Header from '../components/Header';

// Extend window type for Karaoke Widget
declare global {
  interface Window {
    GMKaraokeBookingModal?: (bookingType: string, venue: string) => void;
  }
}
const Karaoke = () => {
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const handleBookKaraoke = () => {
    setIsBookingLoading(true);

    // Open the GM Karaoke Booking Modal
    if (window.GMKaraokeBookingModal) {
      try {
        window.GMKaraokeBookingModal('karaoke', 'Manor');
      } catch (error) {
        console.error('Karaoke booking error:', error);
        alert('Booking system temporarily unavailable. Please try again later.');
      }
    } else {
      // Fallback: try to use existing booking modal with karaoke venue
      if (window.GMBookingModal) {
        try {
          window.GMBookingModal({
            venue: 'manor',
            bookingType: 'karaoke',
            venueArea: 'karaoke',
            theme: 'dark',
            primaryColor: '#F2993B',
            showSpecialRequests: true
          });
        } catch (error) {
          console.error('Karaoke booking error:', error);
          alert('Booking system temporarily unavailable. Please try again later.');
        }
      } else {
        alert('Booking system is loading. Please try again in a moment.');
      }
    }
    setTimeout(() => setIsBookingLoading(false), 1000);
  };
  return <div className="min-h-screen" style={{
    backgroundColor: '#2A1205',
    color: '#FFFFFF'
  }}>
      <Header />
      
      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0" style={{
          backgroundColor: '#2A1205'
        }} />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <div className="pt-20 pb-8">
              <h1 className="manor-heading text-6xl md:text-8xl lg:text-9xl mb-6 animate-fade-in" style={{
              color: '#E14116'
            }}>
                <div>KARAOKE</div>
                <div>BOOTHS</div>
              </h1>
              <div className="space-y-4 mb-12 animate-fade-in">
                <button onClick={handleBookKaraoke} disabled={isBookingLoading} className="inline-block font-bold px-8 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed" style={{
                backgroundColor: '#F2993B',
                color: '#060201'
              }}>
                  {isBookingLoading ? 'Loading...' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Third - Updated Text in Pill Box */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 flex items-center justify-center px-4 z-10">
            <div className="text-center max-w-2xl">
              <div className="rounded-full px-8 py-6 border-2" style={{
              backgroundColor: '#060201',
              color: '#F2993B',
              borderColor: '#F2993B'
            }}>
                <p className="text-lg md:text-xl mb-2">Private karaoke booth now available for hire!</p>
                <p className="text-sm md:text-base">
                  Perfect for birthdays, special occasions or just a fun night out with friends. Book your booth today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Karaoke;