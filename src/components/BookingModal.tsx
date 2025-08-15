import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { X } from 'lucide-react';

// Extend window type for GM Widget
declare global {
  interface Window {
    GMBookingWidget?: {
      init: () => void;
    };
    GMBookingModal?: (options: {
      venue: string;
      venueArea?: string;
      theme?: string;
      primaryColor?: string;
      showSpecialRequests?: boolean;
    }) => void;
  }
}

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
  // Use the new GMBookingModal function when modal opens
  useEffect(() => {
    const handleBookingSuccess = (event: CustomEvent) => {
      console.log('Booking successful:', event.detail.bookingId);
      alert('Thank you for your booking! We\'ll contact you within 24 hours.');
      onClose(); // Close modal after successful booking
    };

    if (isOpen) {
      document.addEventListener('gm-booking-success', handleBookingSuccess as EventListener);
      
      // Open the GM modal instead of rendering inline widget
      const openGMModal = () => {
        if (window.GMBookingModal) {
          try {
            console.log('Opening GM modal...');
            window.GMBookingModal({
              venue,
              venueArea: venueArea,
              theme,
              primaryColor,
              showSpecialRequests: true
            });
            // Close our React modal since GM modal will handle everything
            onClose();
          } catch (error) {
            console.log('GM Modal error:', error);
          }
        }
      };
      
      // Small delay to ensure GM widget is loaded
      setTimeout(openGMModal, 100);
    }
    
    return () => {
      document.removeEventListener('gm-booking-success', handleBookingSuccess as EventListener);
    };
  }, [isOpen, onClose, venue, venueArea, theme, primaryColor]);

  // Since we're using GMBookingModal directly, we don't need to render content
  // The modal will close immediately and open the GM modal
  return null;
};

export default BookingModal;