
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import DirectVenueBookingModal from './DirectVenueBookingModal';
import SocialEnquiryModal from './SocialEnquiryModal';
import { ENABLE_SOCIAL_ENQUIRY, INSTAGRAM_HANDLE, FACEBOOK_PAGE_URL } from '@/lib/config';
import HeroSection from './service-page/HeroSection';
import DescriptionSection from './service-page/DescriptionSection';
import OverviewSection from './service-page/OverviewSection';
import GreatForSection from './service-page/GreatForSection';
import NewsletterSection from './service-page/NewsletterSection';

interface AccordionItem {
  title: string;
  content: string;
}

interface GreatForCard {
  title: string;
  description: string;
  image: string;
}

interface ServicePageProps {
  heroImage: string;
  heroTitle: string;
  description: string;
  accordionItems: AccordionItem[];
  greatForCards: GreatForCard[];
  showSectionsAfterOverview?: boolean;
  showNewsletterSection?: boolean;
  currentPage?: string;
  galleryImages?: string[];
}

const ServicePageTemplate: React.FC<ServicePageProps> = ({
  heroImage,
  heroTitle,
  description,
  accordionItems,
  greatForCards,
  showSectionsAfterOverview = true,
  showNewsletterSection = true,
  currentPage,
  galleryImages
}) => {
  const [showBooking, setShowBooking] = useState(false);
  const [showSocialEnquiry, setShowSocialEnquiry] = useState(false);
  const location = useLocation();

  // Check for booking hash on component mount and location changes
  useEffect(() => {
    if (location.hash === '#booking-container') {
      setShowBooking(true);
      // Small delay to ensure the booking container is rendered before scrolling
      setTimeout(() => {
        document.getElementById('booking-container')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    }
  }, [location.hash]);

  const openBooking = () => {
    if (currentPage === 'birthdays-occasions' && ENABLE_SOCIAL_ENQUIRY) {
      setShowSocialEnquiry(true);
      return;
    }
    setShowBooking(true);
    setTimeout(() => {
      document.getElementById('booking-container')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#271308' }}>
      <Header />
      
      <div className="pt-12">
      <HeroSection 
        heroImage={heroImage}
        heroTitle={heroTitle}
        onBookingClick={openBooking}
        currentPage={currentPage}
        galleryImages={galleryImages}
      />

        <DescriptionSection description={description} />

        <OverviewSection accordionItems={accordionItems} />

        {showSectionsAfterOverview && (
          <>
            {greatForCards.length > 0 && <GreatForSection greatForCards={greatForCards} />}

            {showNewsletterSection && <NewsletterSection />}
          </>
        )}
      </div>

      <DirectVenueBookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        defaultVenue="manor"
        defaultVenueArea="downstairs"
      />

      <SocialEnquiryModal
        isOpen={showSocialEnquiry}
        onClose={() => setShowSocialEnquiry(false)}
        instagramHandle={INSTAGRAM_HANDLE}
        facebookPageUrl={FACEBOOK_PAGE_URL}
      />
    </div>
  );
};

export default ServicePageTemplate;
