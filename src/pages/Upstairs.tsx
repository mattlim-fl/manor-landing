
import React from 'react';
import UpstairsServicePageTemplate from '../components/UpstairsServicePageTemplate';

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
      content: "Sunday to Friday\n• 6pm to 5am\n• $1,500 + GST\n\nSaturday\n• 6pm to 11pm*\n• $2,000 + GST\n\n*At 11pm the venue opens to the public. Your guests are welcome to stay as long as they like."
    },
    {
      title: "Access",
      content: "Private staircase access to upstairs area. Exclusive VIP restroom facilities. Elevated views of entire venue. Premium table service throughout your event. Direct access to secondary bar area."
    }
  ];

  return (
    <UpstairsServicePageTemplate
      heroImage="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      heroTitle="UPSTAIRS"
      description="Exclusive hire of our premium upstairs area with VIP seating, elevated views, and sophisticated atmosphere. Perfect for intimate celebrations and executive events up to 60 people."
      accordionItems={accordionItems}
      greatForCards={[]}
      showSectionsAfterOverview={false}
    />
  );
};

export default Upstairs;
