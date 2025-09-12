
import React from 'react';
import { ENABLE_WHATSAPP_ENQUIRY, WHATSAPP_PHONE, WHATSAPP_TEMPLATE, ENABLE_SOCIAL_ENQUIRY, INSTAGRAM_HANDLE, FACEBOOK_PAGE_URL } from '@/lib/config';
import { getWhatsAppEnquiryUrl } from '@/lib/whatsapp';
import { Badge } from '../ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageGallery from './ImageGallery';

interface HeroSectionProps {
  heroImage: string;
  heroTitle: string;
  onBookingClick: () => void;
  currentPage?: string;
  galleryImages?: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  heroImage,
  heroTitle,
  onBookingClick,
  currentPage,
  galleryImages
}) => {
  const navigate = useNavigate();

  const getNavigationPaths = () => {
    switch (currentPage) {
      case 'downstairs':
        return { left: '/full-venue', right: '/upstairs' };
      case 'upstairs':
        return { left: '/downstairs', right: '/full-venue' };
      case 'full-venue':
        return { left: '/upstairs', right: '/downstairs' };
      case 'birthdays-occasions':
        return { left: null, right: null }; // No navigation for birthdays page
      default:
        return { left: null, right: null };
    }
  };

  const { left, right } = getNavigationPaths();
  // Use custom gallery images if provided, otherwise use hero image as placeholders
  const images = galleryImages || [
    heroImage,
    heroImage,
    heroImage,
    heroImage,
    heroImage
  ];

  const isBirthdaysPage = currentPage === 'birthdays-occasions';
  const whatsappUrl = isBirthdaysPage && ENABLE_WHATSAPP_ENQUIRY
    ? getWhatsAppEnquiryUrl({ phone: WHATSAPP_PHONE, message: WHATSAPP_TEMPLATE })
    : null;

  return (
    <div>
      {/* Image gallery container */}
      <ImageGallery 
        images={images}
        className="relative h-64 sm:h-80 md:h-96 lg:h-screen"
      />
      
      {/* Title and button below image */}
      <div className="flex flex-col items-center justify-center py-3 mt-5 sm:mt-7" style={{ backgroundColor: '#271308' }}>
        <div className="flex items-center justify-center w-full max-w-7xl mx-auto px-4 mb-4">
          {left && (
            <button
              onClick={() => navigate(left)}
              className="mr-4 p-2 transition-all duration-300 hover:scale-110"
              style={{ color: '#CD3E28' }}
            >
              <ChevronLeft size={32} className="md:w-12 md:h-12" />
            </button>
          )}
          <h1 className="font-blur font-medium text-4xl md:text-8xl lg:text-[12rem] text-center flex-1 uppercase tracking-wider" style={{ color: '#CD3E28' }}>
            {heroTitle}
          </h1>
          {right && (
            <button
              onClick={() => navigate(right)}
              className="ml-4 p-2 transition-all duration-300 hover:scale-110"
              style={{ color: '#CD3E28' }}
            >
              <ChevronRight size={32} className="md:w-12 md:h-12" />
            </button>
          )}
        </div>
        {
          <Badge
            onClick={onBookingClick}
            className="px-6 py-3 text-lg font-blur font-medium cursor-pointer transition-all duration-300 mt-6" 
            style={{ 
              backgroundColor: '#C63D1E', 
              color: '#FFFFFF', 
              border: '1px solid #C63D1E'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#C63D1E';
              e.currentTarget.style.borderColor = '#C63D1E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#C63D1E';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#C63D1E';
            }}
          >
            ENQUIRE
          </Badge>
        }
      </div>
    </div>
  );
};

export default HeroSection;
