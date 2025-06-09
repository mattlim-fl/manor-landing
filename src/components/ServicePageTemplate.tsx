import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

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
}

const ServicePageTemplate: React.FC<ServicePageProps> = ({
  heroImage,
  heroTitle,
  description,
  accordionItems,
  greatForCards,
  bookingUrl
}) => {
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);
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

  const toggleAccordion = (index: number) => {
    setExpandedAccordion(expandedAccordion === index ? null : index);
  };

  const openBooking = () => {
    setShowBooking(true);
    setTimeout(() => {
      document.getElementById('booking-container')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-manor-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="manor-heading text-6xl md:text-8xl text-manor-white text-center mb-8">
            {heroTitle}
          </h1>
          <button 
            onClick={openBooking}
            className="manor-btn-primary"
          >
            BOOK NOW
          </button>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-xl text-manor-black leading-relaxed">
          {description}
        </p>
      </div>

      {/* Overview Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="manor-heading text-3xl text-manor-black mb-8">OVERVIEW</h2>
        <div className="space-y-4">
          {accordionItems.map((item, index) => (
            <div key={index} className="border-b border-manor-gray">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center py-6 text-left hover:text-manor-gold transition-colors"
              >
                <span className="text-xl font-medium text-manor-black">
                  {item.title}
                </span>
                {expandedAccordion === index ? (
                  <Minus size={24} className="text-manor-black" />
                ) : (
                  <Plus size={24} className="text-manor-black" />
                )}
              </button>
              {expandedAccordion === index && (
                <div className="pb-6 text-manor-black leading-relaxed">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Booking Container */}
      {showBooking && (
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
      )}

      {/* Great For Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="manor-heading text-3xl text-manor-black mb-12">GREAT FOR</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {greatForCards.map((card, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden mb-4">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300" />
              </div>
              <h3 className="manor-heading text-xl text-manor-black mb-2">
                {card.title}
              </h3>
              <p className="text-manor-black mb-4 leading-relaxed">
                {card.description}
              </p>
              <button className="text-manor-black font-medium uppercase tracking-wide hover:text-manor-gold transition-colors">
                FIND OUT MORE
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stay In Touch Footer */}
      <div className="bg-manor-black py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="manor-heading text-3xl text-manor-white mb-8">
            STAY IN TOUCH
          </h2>
          <p className="text-manor-white mb-8">
            Subscribe to newsletter to be the first to receive updates and information on the latest from Manor & Peruke
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3 bg-manor-white text-manor-black"
            />
            <button className="bg-manor-white text-manor-black px-8 py-3 font-medium hover:bg-manor-gold transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePageTemplate;
