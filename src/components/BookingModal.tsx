import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue?: 'manor' | 'hippie' | 'both';
  venueArea?: 'upstairs' | 'downstairs' | 'full_venue';
  theme?: 'light' | 'dark';
  primaryColor?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">Book Your Venue</DialogTitle>
        <DialogDescription className="sr-only">
          Complete the booking form to reserve your venue
        </DialogDescription>
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-background">
          <h2 className="text-2xl font-bold text-foreground">
            Book Your Venue
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>

        {/* GM Booking Widget */}
        <div className="p-6 bg-background">
          <div 
            data-gm-widget="booking"
            data-venue={venue}
            data-venue-area={venueArea}
            data-theme={theme}
            data-primary-color={primaryColor}
            data-show-special-requests="true"
            className="min-h-[400px]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;