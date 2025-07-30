
import React, { useEffect } from 'react';
import WhatsAppButton from '../WhatsAppButton';

interface BookingContainerProps {
  bookingUrl: string;
  showBooking: boolean;
  whatsappNumber?: string;
  whatsappMessage?: string;
  venue?: 'manor' | 'hippie' | 'both';
  venueArea?: 'upstairs' | 'downstairs' | 'full_venue';
  theme?: 'light' | 'dark';
  primaryColor?: string;
}

const BookingContainer: React.FC<BookingContainerProps> = ({
  bookingUrl,
  showBooking,
  whatsappNumber,
  whatsappMessage,
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
        {/* WhatsApp Chat Option */}
        {whatsappNumber && (
          <div className="bg-gray-50 border-b border-gray-200 p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Chat with us directly
            </h3>
            <p className="text-gray-600 mb-4">
              Get personalized assistance and instant responses for your booking
            </p>
            <WhatsAppButton
              phoneNumber={whatsappNumber}
              message={whatsappMessage}
              className="mx-auto"
            >
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        )}
        
        {/* GM Booking Widget */}
        <div className="p-6">
          <div 
            data-gm-widget="booking"
            data-venue={venue}
            data-venue-area={venueArea}
            data-theme={theme}
            data-primary-color={primaryColor}
            data-show-special-requests="true"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingContainer;
