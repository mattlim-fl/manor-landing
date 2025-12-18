import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import AccordionSection from '../components/AccordionSection';

const galleryImages = [
  '/full-venue-1.jpg',
  '/full-venue-2.jpg', 
  '/full-venue-3.jpg'
];

const FullVenue = () => {
  const accordionItems = [
    {
      title: 'Features',
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Exclusive Manor venue access including upstairs and downstairs</li>
          <li>Both main and lounge bars with curated cocktail service</li>
          <li>Spacious dance floor with professional sound, lighting and DJ equipment</li>
          <li>Outdoor courtyard</li>
          <li>Private laneway entrance</li>
          <li>Ample bathrooms</li>
        </ul>
      ),
      defaultOpen: true
    },
    {
      title: 'Capacity',
      content: (
        <div>
          <p>Full venue capacity for up to 250 people</p>
          <p>Flexible layouts from cocktail style to lounge bar</p>
          <p>Multiple areas for different activities and guest experiences</p>
        </div>
      )
    },
    {
      title: 'Availability & Pricing',
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium">Sunday to Friday</p>
            <p>6pm to 5am</p>
            <p>Custom pricing available upon request</p>
          </div>
          <div>
            <p className="font-medium">Saturday</p>
            <p>6pm to 11pm*</p>
            <p>Custom pricing available upon request</p>
          </div>
          <p className="text-xs italic">*At 11pm the venue opens to the public. Your guests are welcome to stay as long as they like.</p>
        </div>
      )
    },
    {
      title: 'Access',
      content: <p>Exclusive venue access with private laneway entry. Full control of both upstairs and downstairs areas.</p>
    }
  ];

  return (
    <div className="min-h-screen flex flex-col leopard-bg text-white">
      <Header showLogo={true} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto w-full">
          
          {/* Page Title */}
          <h1 
            className="font-blur font-bold text-4xl md:text-5xl lg:text-6xl text-center mb-8 uppercase tracking-wider"
            style={{ color: '#E59D50' }}
          >
            Full Venue
          </h1>

          {/* Image Carousel */}
          <div className="mb-8">
            <ImageCarousel 
              images={galleryImages} 
              alt="Full venue"
            />
          </div>

          {/* Description */}
          <div className="text-center mb-8">
            <p 
              className="text-lg md:text-xl font-acumin mb-2"
              style={{ color: '#D04E2B' }}
            >
              Exclusive hire of Manor for events, celebrations and corporate functions.
            </p>
            <p 
              className="text-base md:text-lg font-acumin"
              style={{ color: '#E59D50' }}
            >
              Perfect for product launches, wedding receptions, and major corporate events up to 250 people.
            </p>
          </div>

          {/* Enquire Button */}
          <div className="flex justify-center mb-12">
            <a 
              href="mailto:afterdark@manorleederville.com.au?subject=Full%20Venue%20Hire%20Enquiry"
              className="nav-btn inline-block font-blur font-bold px-10 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300"
            >
              ENQUIRE
            </a>
          </div>

          {/* Accordion Sections */}
          <AccordionSection items={accordionItems} />

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FullVenue;
