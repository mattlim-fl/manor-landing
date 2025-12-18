import Header from '../components/Header';
import Footer from '../components/Footer';
import AccordionSection from '../components/AccordionSection';

const SpecialEvents = () => {
  const accordionItems = [
    {
      title: "Features",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Full venue exclusive access for your private event</li>
          <li>Custom setup and decoration to match your event theme</li>
          <li>Dedicated event coordinator to manage all aspects</li>
          <li>State-of-the-art audiovisual equipment</li>
        </ul>
      ),
      defaultOpen: true
    },
    {
      title: "Capacity",
      content: (
        <p>Full venue hire accommodates 50-150 people depending on setup and requirements. Flexible floor plan options from cocktail style to seated dining.</p>
      )
    },
    {
      title: "Pricing", 
      content: (
        <p>Contact our events team for a custom quote based on your specific requirements, guest count, timing, and additional services.</p>
      )
    },
    {
      title: "Access",
      content: (
        <p>Exclusive venue access with private entry arrangements. Full facility usage including all sound and lighting equipment. Dedicated staff support throughout your event.</p>
      )
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
            Special Events
          </h1>

          {/* Description */}
          <div className="text-center mb-8">
            <p 
              className="text-lg md:text-xl font-acumin mb-2"
              style={{ color: '#D04E2B' }}
            >
              Full venue hire for corporate events, private parties, and product launches.
            </p>
            <p 
              className="text-base md:text-lg font-acumin"
              style={{ color: '#E59D50' }}
            >
              Custom packages with dedicated event coordination.
            </p>
          </div>

          {/* Enquire Button */}
          <div className="flex justify-center mb-12">
            <a 
              href="mailto:afterdark@manorleederville.com.au?subject=Special%20Events%20Enquiry"
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

export default SpecialEvents;
