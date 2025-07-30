
import ServicePageTemplate from '../components/ServicePageTemplate';

const BirthdaysOccasions = () => {
  const heroImage = 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  const heroTitle = 'BIRTHDAYS & OCCASIONS';
  const description = 'Celebrate your special moments at Manor with our customized party packages. From intimate gatherings to larger celebrations, we create unforgettable experiences tailored to your occasion.';

  const accordionItems = [
    {
      title: 'Package Options',
      content: 'Choose from intimate packages for 10-15 guests or larger celebrations for up to 50 people. All packages include dedicated service and customizable amenities.'
    },
    {
      title: 'Customization',
      content: 'Personalized decorations, custom music playlists, specialty cocktails, and birthday cake arrangements available.'
    },
    {
      title: 'Advance Booking',
      content: 'Recommend booking 2-4 weeks in advance. Special occasion packages require 48-hour advance notice minimum.'
    }
  ];

  const greatForCards = [];

  const bookingUrl = 'https://hippieclub.simplybook.net/v2/#book';
  const whatsappNumber = '61412345678'; // Replace with Manor's actual WhatsApp business number
  const whatsappMessage = 'Hi! I\'d like to discuss planning a birthday celebration or special occasion at Manor. Could you please help me with the details and availability?';

  return (
    <ServicePageTemplate
      heroImage={heroImage}
      heroTitle={heroTitle}
      description={description}
      accordionItems={accordionItems}
      greatForCards={greatForCards}
      bookingUrl={bookingUrl}
      whatsappNumber={whatsappNumber}
      whatsappMessage={whatsappMessage}
    />
  );
};

export default BirthdaysOccasions;
