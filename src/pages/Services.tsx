import { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DirectVenueBookingModal from "../components/DirectVenueBookingModal";
import ImageCarousel from "../components/ImageCarousel";

const venueData = {
  downstairs: {
    images: [
      '/downstairs-1.jpg',
      '/downstairs-2.jpg',
      '/downstairs-3.jpg',
      '/downstairs-4.jpg'
    ],
    title: 'DOWNSTAIRS',
    description: 'Featuring the main bar, dance floor and courtyard.',
    useCase: 'Great for cocktail parties, celebrations, events and corporate functions up to 150 people.',
    features: [
      'Main Bar area with cocktail service',
      'Dance floor with professional sound system',
      'DJ equipment & lighting',
      'Direct access to courtyard',
      'Ample male & female bathrooms'
    ]
  },
  upstairs: {
    images: [
      '/upstairs-1.jpg',
      '/upstairs-2.jpg',
      '/upstairs-3.jpg'
    ],
    title: 'UPSTAIRS',
    description: 'Featuring the karaoke booth, lounge bar and dance floor views.',
    useCase: 'Perfect for intimate celebrations and executive events up to 70 people.',
    features: [
      'Private karaoke booth',
      'Lounge bar area',
      'Views over dance floor',
      'Separate bathroom facilities',
      'Semi-private space'
    ]
  },
  fullVenue: {
    images: [
      '/full-venue-1.jpg',
      '/full-venue-2.jpg',
      '/full-venue-3.jpg'
    ],
    title: 'FULL VENUE',
    description: 'Exclusive hire of Manor for events, celebrations and corporate functions.',
    useCase: 'Perfect for product launches, wedding receptions, and major corporate events up to 250 people.',
    features: [
      'Complete venue exclusivity',
      'Both bars and all spaces',
      'Full sound and lighting',
      'Courtyard access',
      'Customizable setup'
    ]
  }
};

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<{
    venue: 'manor';
    venueArea: 'upstairs' | 'downstairs' | 'full_venue';
  }>({
    venue: 'manor',
    venueArea: 'downstairs'
  });

  const openBookingModal = (venueArea: 'upstairs' | 'downstairs' | 'full_venue') => {
    setSelectedVenue({
      venue: 'manor',
      venueArea
    });
    setIsModalOpen(true);
  };

  const VenueCard = ({ 
    data, 
    venueKey 
  }: { 
    data: typeof venueData.downstairs; 
    venueKey: 'downstairs' | 'upstairs' | 'full_venue';
  }) => {
    return (
      <div className="flex flex-col">
        {/* Venue Title Header */}
        <h2 
          className="font-blur font-bold text-2xl md:text-3xl mb-4 uppercase tracking-wider text-center"
          style={{ color: '#E59D50' }}
        >
          {data.title}
        </h2>
        
        {/* Image Carousel */}
        <div className="mb-4">
          <ImageCarousel 
            images={data.images} 
            alt={data.title}
          />
        </div>

        {/* Description */}
        <p 
          className="text-base md:text-lg mb-2 font-acumin text-center"
          style={{ color: '#D04E2B' }}
        >
          {data.description}
        </p>
        <p 
          className="text-sm md:text-base mb-4 font-acumin text-center"
          style={{ color: '#E59D50' }}
        >
          {data.useCase}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 mb-6">
          <Link
            to={
              venueKey === 'downstairs'
                ? '/downstairs'
                : venueKey === 'upstairs'
                  ? '/upstairs'
                  : '/full-venue'
            }
            className="nav-btn font-blur font-bold px-6 py-3 rounded-full uppercase tracking-wider text-sm text-center"
          >
            INFO
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen leopard-bg text-white">
      <Header showLogo={true} />
      
      {/* Main Content */}
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Page Title */}
          <h1 
            className="font-blur font-bold text-4xl md:text-5xl lg:text-6xl text-center mb-12 uppercase tracking-wider"
            style={{ color: '#E59D50' }}
          >
            Venue Hire
          </h1>

          {/* Venue Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <VenueCard data={venueData.downstairs} venueKey="downstairs" />
            <VenueCard data={venueData.upstairs} venueKey="upstairs" />
            <VenueCard data={venueData.fullVenue} venueKey="full_venue" />
          </div>

        </div>
      </div>

      <Footer />

      {/* Direct Booking Modal */}
      <DirectVenueBookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultVenue={selectedVenue.venue} 
        defaultVenueArea={selectedVenue.venueArea} 
      />
    </div>
  );
};

export default Services;
