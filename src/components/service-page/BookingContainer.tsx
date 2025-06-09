
import React from 'react';

interface BookingContainerProps {
  bookingUrl: string;
  showBooking: boolean;
}

const BookingContainer: React.FC<BookingContainerProps> = ({
  bookingUrl,
  showBooking
}) => {
  if (!showBooking) return null;

  return (
    <div id="booking-container" className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-manor-white rounded-lg shadow-lg overflow-hidden">
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
