
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import HeroSection from './service-page/HeroSection';
import DescriptionSection from './service-page/DescriptionSection';
import OverviewSection from './service-page/OverviewSection';
import BookingContainer from './service-page/BookingContainer';
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
  bookingUrl: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  showSectionsAfterOverview?: boolean;
}

const ServicePageTemplate: React.FC<ServicePageProps> = ({
  heroImage,
  heroTitle,
  description,
  accordionItems,
  greatForCards,
  bookingUrl,
  whatsappNumber,
  whatsappMessage,
  showSectionsAfterOverview = true
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
    <div className="min-h-screen bg-manor-black">
      <Header />
      
      <HeroSection 
        heroImage={heroImage}
        heroTitle={heroTitle}
        onBookingClick={openBooking}
      />

      <DescriptionSection description={description} />

      <OverviewSection accordionItems={accordionItems} />

      {showSectionsAfterOverview && (
        <>
          <BookingContainer 
            bookingUrl={bookingUrl}
            showBooking={showBooking}
            whatsappNumber={whatsappNumber}
            whatsappMessage={whatsappMessage}
          />

          <GreatForSection greatForCards={greatForCards} />

          <NewsletterSection />
        </>
      )}
    </div>
  );
};

export default ServicePageTemplate;
