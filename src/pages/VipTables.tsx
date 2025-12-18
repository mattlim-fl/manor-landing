import Header from '../components/Header';
import Footer from '../components/Footer';
import AccordionSection from '../components/AccordionSection';

// Declare global functions for VIP booking
declare global {
  interface Window {
    openVIPModal: () => void;
    openManorVIPModal: () => void;
    openHippieVIPModal: () => void;
  }
}

const VipTables = () => {
  const accordionItems = [
    {
      title: "Features",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Dedicated waitstaff providing premium service throughout the night</li>
          <li>Prime dancefloor location with the best views of the DJ and entertainment</li>
          <li>Bottle service options with premium spirits and champagne</li>
          <li>Reserved seating area exclusively for your party</li>
        </ul>
      ),
      defaultOpen: true
    },
    {
      title: "Capacity", 
      content: (
        <p>Tables accommodate groups of 2-12 people with various table sizes available. Intimate tables for couples, medium tables for small groups, and large tables for celebrations.</p>
      )
    },
    {
      title: "Pricing",
      content: (
        <p>VIP table service starting from $200, with pricing varying by table size, location, and night of the week. Special rates available for recurring bookings and large groups.</p>
      )
    },
    {
      title: "Access",
      content: (
        <p>Priority entry bypassing general admission lines. Access to dedicated VIP seating area with premium views. Table service throughout the night with dedicated waitstaff.</p>
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
            VIP Tables
          </h1>

          {/* Description */}
          <div className="text-center mb-8">
            <p 
              className="text-lg md:text-xl font-acumin mb-2"
              style={{ color: '#D04E2B' }}
            >
              Premium table service with dedicated waitstaff.
            </p>
            <p 
              className="text-base md:text-lg font-acumin"
              style={{ color: '#E59D50' }}
            >
              Includes reserved seating and bottle service options for groups of 2-12 people.
            </p>
          </div>

          {/* Booking Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => window.openVIPModal?.()}
              className="nav-btn font-blur font-bold px-8 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300"
            >
              Book VIP Tickets
            </button>
            
            <button 
              onClick={() => window.openManorVIPModal?.()}
              className="nav-btn font-blur font-bold px-8 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300"
            >
              Book Manor VIP
            </button>
          </div>

          {/* Accordion Sections */}
          <AccordionSection items={accordionItems} />

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VipTables;
