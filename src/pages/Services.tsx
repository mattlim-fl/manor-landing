import { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AccordionSection from "../components/AccordionSection";
import DirectVenueBookingModal from "../components/DirectVenueBookingModal";

const venueData = {
  downstairs: {
    image: '/venue-disco-balls.png',
    title: 'DOWNSTAIRS',
    description: 'Featuring the main bar, dance floor and courtyard.',
    capacity: 'For 50 to 150 guests.',
    features: [
      'Main Bar area with cocktail service',
      'Dance floor with professional sound system',
      'DJ equipment & lighting',
      'Direct access to courtyard',
      'Ample male & female bathrooms'
    ]
  },
  upstairs: {
    image: '/venue-shots.png',
    title: 'UPSTAIRS',
    description: 'Featuring the karaoke booth, lounge bar and dance floor views.',
    capacity: 'For 20 to 70 guests.',
    features: [
      'Private karaoke booth',
      'Lounge bar area',
      'Views over dance floor',
      'Separate bathroom facilities',
      'Semi-private space'
    ]
  },
  fullVenue: {
    image: '/venue-bar-crowd.png',
    title: 'FULL VENUE',
    description: 'Exclusive hire of Manor for events, celebrations and corporate functions.',
    capacity: 'For 150 to 250 guests.',
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
    const accordionItems = [
      {
        title: 'Features',
        content: (
          <ul className="list-disc list-inside space-y-1">
            {data.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        ),
        defaultOpen: venueKey === 'downstairs'
      },
      {
        title: 'Capacity',
        content: <p>{data.capacity}</p>
      },
      {
        title: 'Availability & Pricing',
        content: <p>Contact us for availability and custom pricing options.</p>
      },
      {
        title: 'Access',
        content: <p>Accessible via main entrance on Newcastle Street.</p>
      }
    ];

    return (
      <div className="flex flex-col">
        {/* Image with title overlay */}
        <div className="relative mb-4">
          <img 
            src={data.image} 
            alt={data.title}
            className="w-full h-64 md:h-72 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="nav-btn font-blur font-bold px-6 py-2 rounded-full uppercase tracking-wider text-sm">
              {data.title}
            </span>
          </div>
        </div>

        {/* Description */}
        <p 
          className="text-sm mb-1 font-acumin"
          style={{ color: '#E59D50' }}
        >
          {data.description}
        </p>
        <p 
          className="text-sm mb-4 font-acumin"
          style={{ color: '#E59D50' }}
        >
          {data.capacity}
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
          <button
            type="button"
            onClick={() => openBookingModal(venueKey)}
            className="manor-pill-btn manor-pill-btn-gold"
          >
            BOOK NOW
          </button>
        </div>

        {/* Accordion */}
        <AccordionSection items={accordionItems} />
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
