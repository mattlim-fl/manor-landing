import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const Downstairs = () => {
  const accordionItems = [
    {
      title: "Features",
      content: "Main bar area with full cocktail service. Primary dancefloor with professional sound system and lighting. Direct access to outdoor terrace area. Climate controlled environment with industrial design aesthetic."
    },
    {
      title: "Capacity",
      content: "Standing capacity for up to 80 people. Cocktail style events for 60-70 guests. Seated dining arrangements for up to 40 people. Flexible layout options to suit your event requirements."
    },
    {
      title: "Pricing", 
      content: "Downstairs hire from $800 for 4 hours. Pricing varies by day of week, time of year, and event duration. Package includes basic lighting and sound system. Bar service and catering available as add-ons."
    },
    {
      title: "Access",
      content: "Private entrance available for exclusive events. Direct access to main bar and dancefloor. Outdoor terrace access included. Professional sound and lighting equipment included. Dedicated staff support available."
    }
  ];

  const greatForCards = [
    {
      title: "BIRTHDAY PARTIES",
      description: "Celebrate in style with your closest friends in our intimate downstairs space, complete with dancefloor and full bar service.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "CORPORATE MIXERS",
      description: "Host networking events and team celebrations in a sophisticated setting with professional bar service and atmosphere.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "COCKTAIL PARTIES",
      description: "Perfect for intimate gatherings with premium cocktail service, atmospheric lighting, and our signature industrial design.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <ServicePageTemplate
      heroImage="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      heroTitle="DOWNSTAIRS"
      description="Hire our intimate downstairs area featuring the main bar, dancefloor, and terrace access. Perfect for cocktail parties, celebrations, and corporate events up to 80 people."
      accordionItems={accordionItems}
      greatForCards={greatForCards}
      bookingUrl="https://hippieclub.simplybook.net/v2/#book/service/3"
    />
  );
};

export default Downstairs;
