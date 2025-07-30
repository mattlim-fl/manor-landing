import React, { useEffect } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { X } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue?: 'manor' | 'hippie' | 'both';
  venueArea?: 'upstairs' | 'downstairs' | 'full_venue';
  theme?: 'light' | 'dark';
  primaryColor?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  venue = 'manor',
  venueArea,
  theme = 'light',
  primaryColor,
  whatsappNumber,
  whatsappMessage
}) => {
  // Add success tracking for booking widget
  useEffect(() => {
    const handleBookingSuccess = (event: CustomEvent) => {
      console.log('Booking successful:', event.detail.bookingId);
      alert('Thank you for your booking! We\'ll contact you within 24 hours.');
      onClose(); // Close modal after successful booking
    };

    if (isOpen) {
      document.addEventListener('gm-booking-success', handleBookingSuccess as EventListener);
    }
    
    return () => {
      document.removeEventListener('gm-booking-success', handleBookingSuccess as EventListener);
    };
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0" style={{ backgroundColor: '#F5F5F5' }}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200" style={{ backgroundColor: '#F5F5F5' }}>
          <h2 className="text-2xl font-bold text-gray-800">
            Book Your Venue
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

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
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;