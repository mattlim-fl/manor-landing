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

type VenueArea = 'downstairs' | 'upstairs' | 'full_venue';

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
  // New unified props
  venueArea?: VenueArea;
  useLeopardBackground?: boolean;
  enableSocialEnquiry?: boolean;
  customBadges?: string[];
  customCapacity?: number;
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
  galleryImages,
  // New props with defaults
  venueArea = 'downstairs',
  useLeopardBackground = true,
  enableSocialEnquiry = true,
  customBadges,
  customCapacity,
}) => {
  const [showBooking, setShowBooking] = useState(false);
  const [showSocialEnquiry, setShowSocialEnquiry] = useState(false);
  const location = useLocation();

  // Check for booking hash on component mount and location changes
  useEffect(() => {
    if (location.hash === '#booking-container') {
      setShowBooking(true);
      setTimeout(() => {
        document.getElementById('booking-container')?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [location.hash]);

  const openBooking = () => {
    if (currentPage === 'birthdays-occasions' && ENABLE_SOCIAL_ENQUIRY && enableSocialEnquiry) {
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

  // Determine background class based on variant
  const backgroundClass = useLeopardBackground
    ? 'leopard-bg text-white'
    : 'bg-manor-brown text-white';

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <Header />

      <div className="pt-12">
        <HeroSection
          heroImage={heroImage}
          heroTitle={heroTitle}
          onBookingClick={openBooking}
          currentPage={currentPage ?? venueArea}
          galleryImages={galleryImages}
        />

        <DescriptionSection
          description={description}
          venueArea={venueArea}
          badges={customBadges}
          capacity={customCapacity}
        />

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
        defaultVenueArea={venueArea}
      />

      {enableSocialEnquiry && (
        <SocialEnquiryModal
          isOpen={showSocialEnquiry}
          onClose={() => setShowSocialEnquiry(false)}
          instagramHandle={INSTAGRAM_HANDLE}
          facebookPageUrl={FACEBOOK_PAGE_URL}
        />
      )}
    </div>
  );
};

export default ServicePageTemplate;
