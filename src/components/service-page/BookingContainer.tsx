
import React, { useEffect } from 'react';

interface BookingContainerProps {
  bookingUrl: string;
  showBooking: boolean;
  venue?: 'manor' | 'hippie' | 'both';
  venueArea?: 'upstairs' | 'downstairs' | 'full_venue';
  theme?: 'light' | 'dark';
  primaryColor?: string;
}

const BookingContainer: React.FC<BookingContainerProps> = ({
  bookingUrl,
  showBooking,
  venue = 'manor',
  venueArea,
  theme = 'light',
  primaryColor
}) => {
  // Add success tracking for booking widget
  useEffect(() => {
    const handleBookingSuccess = (event: CustomEvent) => {
      console.log('Booking successful:', event.detail.bookingId);
      alert('Thank you for your booking! We\'ll contact you within 24 hours.');
    };

    document.addEventListener('gm-booking-success', handleBookingSuccess as EventListener);
    
    return () => {
      document.removeEventListener('gm-booking-success', handleBookingSuccess as EventListener);
    };
  }, []);

  if (!showBooking) return null;

  return (
    <div id="booking-container" className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-manor-white rounded-lg shadow-lg overflow-hidden">
        {/* GM Booking Widget */}
        <div className="p-6">
          <div 
            data-gm-widget="booking"
            data-venue={venue}
            data-venue-area={venueArea}
            data-theme={theme}
            data-primary-color={primaryColor}
            data-show-special-requests="true"
            className="size-large min-h-[500px] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingContainer;
