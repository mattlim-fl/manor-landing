import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import KaraokeBookingModal from '../components/KaraokeBookingModal';

const karaokeImages = [
  '/venue-bar-crowd.png',
  '/venue-dancefloor.png',
  '/venue-disco-balls.png',
];

const Karaoke = () => {
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookKaraoke = () => {
    setIsBookingLoading(true);
    setIsModalOpen(true);
    setTimeout(() => setIsBookingLoading(false), 300);
  };

  return (
    <div className="min-h-screen flex flex-col leopard-bg text-white">
      <Header showLogo={true} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto w-full">
          
          {/* Page Title */}
          <h1 
            className="font-blur font-bold text-4xl md:text-5xl lg:text-6xl text-center mb-8 uppercase tracking-wider"
            style={{ color: '#E59D50' }}
          >
            Karaoke Booths
          </h1>

          {/* Image Carousel */}
          <div className="mb-8">
            <ImageCarousel 
              images={karaokeImages} 
              alt="Karaoke booth"
            />
          </div>

          {/* Description */}
          <div className="text-center mb-8">
            <p 
              className="text-lg md:text-xl font-acumin mb-2"
              style={{ color: '#D04E2B' }}
            >
              Private karaoke booth now available for hire!
            </p>
            <p 
              className="text-base md:text-lg font-acumin"
              style={{ color: '#E59D50' }}
            >
              Perfect for birthdays, special occasions or just a fun night out with friends.
            </p>
          </div>

          {/* Book Now Button */}
          <div className="flex justify-center">
            <button 
              onClick={handleBookKaraoke} 
              disabled={isBookingLoading} 
              className="nav-btn font-blur font-bold px-10 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isBookingLoading ? 'Loading...' : 'BOOK NOW'}
            </button>
          </div>

        </div>
      </div>

      <Footer />

      <KaraokeBookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Karaoke;
