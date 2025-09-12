
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
      content: "• Suitable for 20 to 70 guests\n• Flexible layout options to suit your event"
    },
    {
      title: "Availability & Pricing", 
      content: "Sunday to Friday\n• 6pm to 5am\n• Venue hire fees available upon request\n\nSaturday\n• 6pm to 11pm*\n• Venue hire fees available upon request\n\n*At 11pm the venue opens to the public. Your guests are welcome to stay as long as they like."
    },
    {
      title: "Access",
      content: "Private staircase access to upstairs area."
    }
  ];

  const galleryImages = [
    "/upstairs-1.jpg",
    "/upstairs-2.jpg", 
    "/upstairs-3.jpg"
  ];

  return (
    <UpstairsServicePageTemplate
      heroImage="/upstairs-1.jpg"
      heroTitle="UPSTAIRS"
      description="Exclusive hire of our premium upstairs area with VIP seating, elevated views, and sophisticated atmosphere. Perfect for intimate celebrations and executive events up to 60 people."
      accordionItems={accordionItems}
      greatForCards={[]}
      showSectionsAfterOverview={false}
      galleryImages={galleryImages}
    />
  );
};

export default Upstairs;
