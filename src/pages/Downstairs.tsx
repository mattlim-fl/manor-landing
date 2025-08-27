
import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const Downstairs = () => {
  const accordionItems = [
    {
      title: "Features",
      content: "• Main Bar area with cocktail service\n• Dance floor with professional sound system\n• DJ equipment & lighting\n• Direct access to courtyard\n• Ample male & female bathrooms"
    },
    {
      title: "Capacity",
      content: "• Suitable for 50 to 150 guests\n• Flexible layout options to suit your event"
    },
    {
      title: "Availability & Pricing", 
      content: "Sunday to Friday\n• 6pm to 5am\n• Venue hire fees available upon request\n\nSaturday\n• 6pm to 11pm*\n• Venue hire fees available upon request\n\n*At 11pm the venue opens to the public. Your guests are welcome to stay as long as they like."
    },
    {
      title: "Access",
      content: "Private entrance available down the Manor laneway."
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
      description="Featuring the main bar, dance floor and courtyard.\n\nGreat for cocktail parties, celebrations, events and corporate functions up to 150 people."
      accordionItems={accordionItems}
      greatForCards={greatForCards}
      showSectionsAfterOverview={false}
      currentPage="downstairs"
    />
  );
};

export default Downstairs;
