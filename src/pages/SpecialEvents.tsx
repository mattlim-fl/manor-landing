
import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const SpecialEvents = () => {
  const accordionItems = [
    {
      title: "Features",
      content: "Full venue exclusive access for your private event. Custom setup and decoration to match your event theme. Dedicated event coordinator to manage all aspects. State-of-the-art audiovisual equipment including sound system, lighting, and projection capabilities."
    },
    {
      title: "Capacity",
      content: "Full venue hire accommodates 50-150 people depending on setup and requirements. Flexible floor plan options from cocktail style to seated dining. Multiple areas available including main floor, VIP sections, and bar areas."
    },
    {
      title: "Pricing", 
      content: "Contact our events team for a custom quote based on your specific requirements, guest count, timing, and additional services. Packages include venue hire, basic setup, and event coordination."
    },
    {
      title: "Access",
      content: "Exclusive venue access with private entry arrangements. Full facility usage including all sound and lighting equipment. Dedicated staff support throughout your event. Custom security arrangements if required."
    }
  ];

  const greatForCards = [
    {
      title: "PRODUCT LAUNCHES",
      description: "Launch your brand in style with exclusive venue access, custom lighting, and audiovisual support to showcase your products in the best light.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "PRIVATE PARTIES",
      description: "Exclusive celebrations for your group with full venue access, custom setup, and dedicated service to make your event truly special.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "CORPORATE FUNCTIONS",
      description: "Professional events with impact. From awards ceremonies to team celebrations, create memorable experiences for your colleagues and clients.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <ServicePageTemplate
      heroImage="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      heroTitle="SPECIAL EVENTS"
      description="Full venue hire available for corporate events, private parties, product launches, and celebrations. Custom packages with dedicated event coordination."
      accordionItems={accordionItems}
      greatForCards={greatForCards}
    />
  );
};

export default SpecialEvents;
