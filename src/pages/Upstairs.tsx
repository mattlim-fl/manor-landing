
import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const Upstairs = () => {
  const accordionItems = [
    {
      title: "Features",
      content: "Premium VIP seating areas with elevated views of the venue. Secondary bar with cocktail service. Private restroom facilities. Sophisticated lighting and sound system. Direct views of the main dancefloor below."
    },
    {
      title: "Capacity",
      content: "Standing capacity for up to 60 people. VIP table seating for 30-40 guests. Intimate gatherings from 15 people minimum. Premium positioning with the best views in the venue."
    },
    {
      title: "Pricing", 
      content: "Upstairs hire from $1200 for 4 hours. Premium pricing reflects exclusive access and elevated experience. Package includes VIP table service and dedicated staff. Bar service and premium catering options available."
    },
    {
      title: "Access",
      content: "Private staircase access to upstairs area. Exclusive VIP restroom facilities. Elevated views of entire venue. Premium table service throughout your event. Direct access to secondary bar area."
    }
  ];

  const greatForCards = [
    {
      title: "VIP CELEBRATIONS",
      description: "Elevate your special occasion with premium upstairs access, offering the best views and most exclusive atmosphere in the venue.",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "EXECUTIVE EVENTS",
      description: "Impress clients and stakeholders with premium positioning and elevated service in our sophisticated upstairs area.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "INTIMATE DINNERS",
      description: "Perfect for smaller groups seeking privacy and premium service with panoramic views of the venue below.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <ServicePageTemplate
      heroImage="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      heroTitle="UPSTAIRS"
      description="Exclusive hire of our premium upstairs area with VIP seating, elevated views, and sophisticated atmosphere. Perfect for intimate celebrations and executive events up to 60 people."
      accordionItems={accordionItems}
      greatForCards={greatForCards}
      bookingUrl="https://manor.simplybook.me/upstairs"
    />
  );
};

export default Upstairs;
