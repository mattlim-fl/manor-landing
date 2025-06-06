
import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const VipTables = () => {
  const accordionItems = [
    {
      title: "Features",
      content: "Dedicated waitstaff providing premium service throughout the night. Prime dancefloor location with the best views of the DJ and entertainment. Bottle service options with premium spirits and champagne. Reserved seating area exclusively for your party."
    },
    {
      title: "Capacity", 
      content: "Tables accommodate groups of 2-12 people with various table sizes available. Intimate tables for couples, medium tables for small groups, and large tables for celebrations. All tables positioned for optimal viewing and atmosphere."
    },
    {
      title: "Pricing",
      content: "VIP table service starting from $200, with pricing varying by table size, location, and night of the week. Special rates available for recurring bookings and large groups. All packages include dedicated service and reserved seating."
    },
    {
      title: "Access",
      content: "Priority entry bypassing general admission lines. Access to dedicated VIP seating area with premium views. Table service throughout the night with dedicated waitstaff. Exclusive VIP restroom facilities."
    }
  ];

  const greatForCards = [
    {
      title: "CORPORATE ENTERTAINMENT",
      description: "Impress clients and colleagues with premium table service in Perth's most sophisticated nightclub. Professional networking in an unforgettable setting.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "BIRTHDAY CELEBRATIONS", 
      description: "Make your special day truly unforgettable with VIP treatment, bottle service, and the best seats in the house for you and your friends.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "DATE NIGHTS",
      description: "Create an intimate and luxurious evening with premium table service, perfect for romantic celebrations and special occasions.",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <ServicePageTemplate
      heroImage="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      heroTitle="VIP TABLES"
      description="Premium table service with dedicated waitstaff and prime location on the dancefloor. Includes reserved seating and bottle service options for groups of 2-12 people."
      accordionItems={accordionItems}
      greatForCards={greatForCards}
      bookingUrl="https://manor.simplybook.me/vip-tables"
    />
  );
};

export default VipTables;
