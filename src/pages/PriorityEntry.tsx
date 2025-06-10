
import ServicePageTemplate from '../components/ServicePageTemplate';

const PriorityEntry = () => {
  const heroImage = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  const heroTitle = '25+ PRIORITY ENTRY';
  const description = 'Skip the queue and enjoy guaranteed entry with our 25+ Priority Entry service. Perfect for mature guests who want to avoid the wait and dive straight into the Manor experience.';

  const accordionItems = [
    {
      title: 'Age Requirements',
      content: 'This service is exclusively for guests aged 25 and over. Valid ID required at entry.'
    },
    {
      title: 'What\'s Included',
      content: 'Priority queue access, guaranteed entry, and dedicated reception service.'
    },
    {
      title: 'Booking Process',
      content: 'Pre-booking required. Limited spots available each night to maintain exclusivity.'
    }
  ];

  const greatForCards = [
    {
      title: 'Professional Networking',
      description: 'Connect with like-minded professionals in a sophisticated environment.',
      image: 'https://images.unsplash.com/photo-1556761175-4413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Date Nights',
      description: 'Avoid the hassle of queuing and focus on enjoying your evening together.',
      image: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Mature Social Scene',
      description: 'Experience Manor with guests who share your refined tastes and interests.',
      image: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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

export default PriorityEntry;
