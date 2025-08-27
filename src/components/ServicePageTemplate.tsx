
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import DirectVenueBookingModal from './DirectVenueBookingModal';
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
}

const ServicePageTemplate: React.FC<ServicePageProps> = ({
  heroImage,
  heroTitle,
  description,
  accordionItems,
  greatForCards,
  showSectionsAfterOverview = true,
  showNewsletterSection = true,
  currentPage
}) => {
  const [showBooking, setShowBooking] = useState(false);
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
      
      <div className="pt-20">
      <HeroSection 
        heroImage={heroImage}
        heroTitle={heroTitle}
        onBookingClick={openBooking}
        currentPage={currentPage}
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
    </div>
  );
};

export default ServicePageTemplate;
