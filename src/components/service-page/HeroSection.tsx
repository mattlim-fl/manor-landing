
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
    <div>
      {/* Image container */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      {/* Title and button below image */}
      <div className="flex flex-col items-center justify-center py-8" style={{ backgroundColor: '#2A1205' }}>
        <h1 className="manor-heading text-4xl md:text-6xl lg:text-8xl text-center mb-6" style={{ color: '#E14116' }}>
          {heroTitle}
        </h1>
        <Badge 
          onClick={onBookingClick}
          className="px-6 py-3 text-lg font-semibold cursor-pointer hover:opacity-80 transition-opacity" 
          style={{ backgroundColor: '#F2993B', color: '#060201', border: '1px solid #060201' }}
        >
          ENQUIRE
        </Badge>
      </div>
    </div>
  );
};

export default HeroSection;
