
import React from 'react';
import FullVenueServicePageTemplate from '../components/FullVenueServicePageTemplate';

const FullVenue = () => {
  const accordionItems = [
    {
      title: "Features",
      content: "Exclusive Manor venue access including upstairs and downstairs. Both main and lounge bars with curated cocktail service. Spacious dance floor with professional sound, lighting and DJ equipment. Outdoor courtyard, private laneway entrance and ample bathrooms."
    },
    {
      title: "Capacity",
      content: "Full venue capacity for up to 250 people. Flexible layouts from cocktail style to lounge bar. Multiple areas for different activities and guest experiences."
    },
    {
      title: "Availability & Pricing", 
      content: "Sunday to Friday\n• 6pm to 5am\n• Custom pricing available upon request\n\nSaturday\n• 6pm to 11pm*\n• Custom pricing available upon request\n\n*At 11pm the venue opens to the public. Your guests are welcome to stay as long as they like."
    },
    {
      title: "Access",
      content: "Exclusive venue access with private laneway entry. Full control of both upstairs and downstairs areas."
    }
  ];

  const galleryImages = [
    "/full-venue-1.jpg",
    "/full-venue-2.jpg", 
    "/full-venue-3.jpg"
  ];

  return (
    <FullVenueServicePageTemplate
      heroImage="/full-venue-1.jpg"
      heroTitle="FULL VENUE"
      description="Complete exclusive hire of the entire Manor including both upstairs and downstairs areas. Perfect for product launches, wedding receptions, and major corporate events up to 150 people."
      accordionItems={accordionItems}
      greatForCards={[]}
      showSectionsAfterOverview={false}
      galleryImages={galleryImages}
    />
  );
};

export default FullVenue;
