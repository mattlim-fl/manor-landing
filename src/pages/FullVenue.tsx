
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
      title: "Pricing", 
      content: "Custom pricing available upon enquiry."
    },
    {
      title: "Access",
      content: "Complete exclusive venue access with private entry. Full control of both upstairs and downstairs areas. All bar and kitchen facilities included. Professional event coordination and dedicated security. Custom setup and breakdown included."
    }
  ];

  return (
    <FullVenueServicePageTemplate
      heroImage="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      heroTitle="FULL VENUE"
      description="Complete exclusive hire of the entire Manor including both upstairs and downstairs areas. Perfect for product launches, wedding receptions, and major corporate events up to 150 people."
      accordionItems={accordionItems}
      greatForCards={[]}
      showSectionsAfterOverview={false}
    />
  );
};

export default FullVenue;
