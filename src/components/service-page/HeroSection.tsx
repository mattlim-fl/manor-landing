
import React from 'react';

interface HeroSectionProps {
  heroImage: string;
  heroTitle: string;
  onBookingClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  heroImage,
  heroTitle,
  onBookingClick
}) => {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroImage}')` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="manor-heading text-6xl md:text-8xl text-manor-white text-center mb-8">
          {heroTitle}
        </h1>
        <button 
          onClick={onBookingClick}
          className="manor-btn-primary"
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
