
import React from 'react';
import { Badge } from '../ui/badge';
import ImageGallery from './ImageGallery';

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
  // Create gallery images using the existing image as placeholders
  const galleryImages = [
    heroImage,
    heroImage,
    heroImage,
    heroImage,
    heroImage
  ];

  return (
    <div>
      {/* Image gallery container */}
      <ImageGallery 
        images={galleryImages}
        className="relative h-64 sm:h-80 md:h-96 lg:h-screen"
      />
      
      {/* Title and button below image */}
      <div className="flex flex-col items-center justify-center py-4" style={{ backgroundColor: '#2A1205' }}>
        <h1 className="manor-heading text-2xl md:text-4xl lg:text-6xl text-center mb-4" style={{ color: '#E14116' }}>
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
