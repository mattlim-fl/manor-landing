
import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const FullVenue = () => {
  const accordionItems = [
    {
      title: "Features",
      content: "Exclusive access to entire Manor venue including upstairs and downstairs areas. Both main and secondary bars with full cocktail service. Complete dancefloor and VIP seating areas. Professional sound, lighting, and AV equipment throughout. Outdoor terrace access and private entrance arrangements."
    },
    {
      title: "Capacity",
      content: "Full venue capacity for 120-150 people standing. Seated dining for up to 80 guests across both levels. Flexible layouts from cocktail style to formal dining. Multiple areas for different event activities and guest experiences."
    },
    {
      title: "Pricing", 
      content: "Full venue hire from $3500 for 5 hours. Premium exclusive access with complete venue control. Package includes all sound and lighting equipment, both bar areas, and dedicated event coordination. Custom pricing for extended events and additional services."
    },
    {
      title: "Access",
      content: "Complete exclusive venue access with private entry. Full control of both upstairs and downstairs areas. All bar and kitchen facilities included. Professional event coordination and dedicated security. Custom setup and breakdown included."
    }
  ];

  const greatForCards = [
    {
      title: "PRODUCT LAUNCHES",
      description: "Take over the entire Manor for your brand launch with complete control over atmosphere, branding, and guest experience across multiple levels.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "WEDDING RECEPTIONS",
      description: "Celebrate your special day with exclusive access to the entire venue, creating unforgettable memories across our sophisticated spaces.",
      image: "https://images.unsplash.com/photo-1519167758481-83f29c96ba47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "CORPORATE GALAS",
      description: "Host prestigious corporate events with full venue exclusivity, premium service, and complete control over every aspect of your celebration.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <ServicePageTemplate
      heroImage="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      heroTitle="FULL VENUE"
      description="Complete exclusive hire of the entire Manor including both upstairs and downstairs areas. Perfect for product launches, wedding receptions, and major corporate events up to 150 people."
      accordionItems={accordionItems}
      greatForCards={greatForCards}
      bookingUrl="https://manor.simplybook.me/full-venue"
    />
  );
};

export default FullVenue;
