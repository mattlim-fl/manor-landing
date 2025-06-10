
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

  const greatForCards = [
    {
      title: 'Milestone Birthdays',
      description: 'Celebrate your 21st, 30th, 40th or any milestone birthday in style.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Graduation Parties',
      description: 'Mark your academic achievements with friends and family.',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Anniversary Celebrations',
      description: 'Romantic settings for couples celebrating relationship milestones.',
      image: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const bookingUrl = 'https://hippieclub.simplybook.net/v2/#book';

  return (
    <ServicePageTemplate
      heroImage={heroImage}
      heroTitle={heroTitle}
      description={description}
      accordionItems={accordionItems}
      greatForCards={greatForCards}
      bookingUrl={bookingUrl}
    />
  );
};

export default BirthdaysOccasions;
