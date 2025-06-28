
import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const Upstairs = () => {
  const accordionItems = [
    {
      title: "Features",
      content: "• Lounge Bar with cocktail service\n• DJ equipment & sound system\n• Karaoke Booth\n• Variety of lounge furniture"
    },
    {
      title: "Capacity",
      content: "• Suitable for 20 to 60 guests\n• Flexible layout options to suit your event"
    },
    {
      title: "Availability & Pricing", 
      content: "Upstairs hire from $1200 for 4 hours. Premium pricing reflects exclusive access and elevated experience. Package includes VIP table service and dedicated staff. Bar service and premium catering options available."
    },
    {
      title: "Access",
      content: "Private staircase access to upstairs area. Exclusive VIP restroom facilities. Elevated views of entire venue. Premium table service throughout your event. Direct access to secondary bar area."
    }
  ];

  return (
    <ServicePageTemplate
      heroImage="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      heroTitle="UPSTAIRS"
      description="Exclusive hire of our premium upstairs area with VIP seating, elevated views, and sophisticated atmosphere. Perfect for intimate celebrations and executive events up to 60 people."
      accordionItems={accordionItems}
      greatForCards={[]}
      bookingUrl="https://hippieclub.simplybook.net/v2/#book/service/4"
      showSectionsAfterOverview={false}
    />
  );
};

export default Upstairs;
