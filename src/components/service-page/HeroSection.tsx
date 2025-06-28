
import React from 'react';
import { Badge } from '../ui/badge';

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
        <Badge 
          onClick={onBookingClick}
          className="px-6 py-3 text-lg font-semibold cursor-pointer hover:opacity-80 transition-opacity" 
          style={{ backgroundColor: '#060201', color: '#F2993B', border: '1px solid #F2993B' }}
        >
          ENQUIRE
        </Badge>
      </div>
    </div>
  );
};

export default HeroSection;
