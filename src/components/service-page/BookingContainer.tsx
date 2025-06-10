
import React from 'react';
import WhatsAppButton from '../WhatsAppButton';

interface BookingContainerProps {
  bookingUrl: string;
  showBooking: boolean;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

const BookingContainer: React.FC<BookingContainerProps> = ({
  bookingUrl,
  showBooking,
  whatsappNumber,
  whatsappMessage
}) => {
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
        
        {/* Booking Form */}
        <iframe
          src={bookingUrl}
          width="100%"
          height="800"
          frameBorder="0"
          className="w-full"
          title="Booking Form"
        />
      </div>
    </div>
  );
};

export default BookingContainer;
