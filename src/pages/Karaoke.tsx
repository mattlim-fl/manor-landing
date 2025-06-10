
import ServicePageTemplate from '../components/ServicePageTemplate';

const Karaoke = () => {
  const heroImage = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  const heroTitle = 'KARAOKE';
  const description = 'Experience the ultimate karaoke night at Manor with our state-of-the-art private karaoke rooms. Perfect for groups looking to have an unforgettable time with premium sound systems and an extensive song library.';

  const accordionItems = [
    {
      title: 'What\'s Included',
      content: 'Private karaoke room, premium sound system, microphones, extensive song library, and dedicated service staff.'
    },
    {
      title: 'Duration & Pricing',
      content: 'Sessions available from 1-4 hours. Pricing varies based on room size and duration. Contact us for detailed pricing.'
    },
    {
      title: 'Group Size',
      content: 'Accommodates groups of 4-20 people depending on the room selected.'
    }
  ];

  const greatForCards = [
    {
      title: 'Birthday Celebrations',
      description: 'Make your birthday unforgettable with friends in a private karaoke setting.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Corporate Events',
      description: 'Team building activities and corporate entertainment in a relaxed environment.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Date Nights',
      description: 'Unique and fun date experience for couples looking for something different.',
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

export default Karaoke;
