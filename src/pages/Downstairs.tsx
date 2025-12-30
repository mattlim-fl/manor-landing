import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import AccordionSection from '../components/AccordionSection';

const galleryImages = [
  '/downstairs-1.jpg',
  '/downstairs-2.jpg', 
  '/downstairs-3.jpg',
  '/downstairs-4.jpg'
];

const Downstairs = () => {
  const accordionItems = [
    {
      title: 'Features',
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Main Bar area with cocktail service</li>
          <li>Dance floor with professional sound system</li>
          <li>DJ equipment & lighting</li>
          <li>Direct access to courtyard</li>
          <li>Ample male & female bathrooms</li>
        </ul>
      ),
      defaultOpen: true
    },
    {
      title: 'Capacity',
      content: (
        <div>
          <p>Suitable for 50 to 150 guests</p>
          <p>Flexible layout options to suit your event</p>
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
            <p>Venue hire fees available upon request</p>
          </div>
          <div>
            <p className="font-medium">Saturday</p>
            <p>6pm to 11pm*</p>
            <p>Venue hire fees available upon request</p>
          </div>
          <p className="text-xs italic">*At 11pm the venue opens to the public. Your guests are welcome to stay as long as they like.</p>
        </div>
      )
    },
    {
      title: 'Access',
      content: <p>Private entrance available down the Manor laneway.</p>
    }
  ];

  return (
    <div className="min-h-screen flex flex-col leopard-bg text-white">
      <Header showLogo={true} />
      
      {/* Back Button */}
      <div className="absolute top-[34px] md:top-[40px] left-4 z-[110]">
        <Link
          to="/venue-hire"
          className="flex items-center justify-center w-8 h-8 transition-transform hover:scale-110"
          aria-label="Back to Venue Hire"
        >
          <ChevronLeft size={24} style={{ color: '#E59D50' }} />
        </Link>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto w-full">
          
          {/* Page Title */}
          <h1 
            className="font-blur font-bold text-4xl md:text-5xl lg:text-6xl text-center mb-8 uppercase tracking-wider"
            style={{ color: '#E59D50' }}
          >
            Downstairs
          </h1>

          {/* Image Carousel */}
          <div className="mb-8">
            <ImageCarousel 
              images={galleryImages} 
              alt="Downstairs venue"
            />
          </div>

          {/* Description */}
          <div className="text-center mb-8">
            <p 
              className="text-lg md:text-xl font-acumin mb-2"
              style={{ color: '#D04E2B' }}
            >
              Featuring the main bar, dance floor and courtyard.
            </p>
            <p 
              className="text-base md:text-lg font-acumin"
              style={{ color: '#E59D50' }}
            >
              Great for cocktail parties, celebrations, events and corporate functions up to 150 people.
            </p>
          </div>

          {/* Enquire Button */}
          <div className="flex justify-center mb-12">
            <a 
              href="mailto:afterdark@manorleederville.com.au?subject=Downstairs%20Venue%20Hire%20Enquiry"
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

export default Downstairs;
