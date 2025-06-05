
import Header from "../components/Header";

const Services = () => {
  const services = [
    {
      id: 1,
      name: "VIP Tables",
      capacity: "Tables for 2-12 people",
      description: "Premium table service with dedicated waitstaff and prime location on the dancefloor. Includes reserved seating and bottle service options.",
      pricing: "From $200",
      status: "Available Now",
      image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      cta: "Book VIP Table",
      available: true
    },
    {
      id: 2,
      name: "Special Events",
      capacity: "Corporate & Private Parties",
      description: "Full venue hire available for corporate events, private parties, product launches, and celebrations. Custom packages available.",
      pricing: "Contact for pricing",
      status: "Available Now",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      cta: "Book Event",
      available: true
    },
    {
      id: 3,
      name: "Karaoke Booths",
      capacity: "Small groups, 4-8 people",
      description: "Private karaoke booths with state-of-the-art sound systems and extensive song libraries. Perfect for intimate celebrations.",
      pricing: "Pricing TBA",
      status: "Coming Soon",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      cta: "Learn More",
      available: false
    },
    {
      id: 4,
      name: "Group Bookings",
      capacity: "Large groups, 15+ people",
      description: "Special rates for large group bookings, hen's nights, buck's parties, and celebrations. Multiple table arrangements available.",
      pricing: "Group rates available",
      status: "Available Now",
      image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      cta: "Book Group",
      available: true
    },
    {
      id: 5,
      name: "Bottle Service",
      capacity: "Add-on service",
      description: "Premium bottle service with top-shelf spirits, champagne, and cocktail packages. Dedicated service staff included.",
      pricing: "From $150",
      status: "Available Now",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      cta: "Add Bottles",
      available: true
    },
    {
      id: 6,
      name: "Birthday Packages",
      capacity: "Celebration packages",
      description: "Special birthday celebration packages including decorations, dedicated service, and complimentary treats for the birthday guest.",
      pricing: "From $300",
      status: "Available Now",
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      cta: "Book Birthday",
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-manor-white text-manor-black">
      <Header />
      
      {/* Page Header */}
      <div className="pt-24 pb-12 px-4 bg-manor-black text-manor-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="manor-heading text-5xl md:text-7xl mb-6">
            Our Offers
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl">
            Premium nightclub experiences designed for every occasion. 
            From intimate table service to full venue hire.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group">
                {/* Service Image */}
                <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-manor-black/20 transition-opacity duration-300 group-hover:bg-manor-black/40"></div>
                </div>

                {/* Service Info */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="manor-heading text-2xl md:text-3xl">
                      {service.name}
                    </h3>
                    <span className={`font-bold uppercase text-xs tracking-wide px-3 py-1 ${
                      service.available 
                        ? 'text-manor-gold bg-manor-gold/10' 
                        : 'text-manor-gray bg-manor-gray/10'
                    }`}>
                      {service.status}
                    </span>
                  </div>

                  <p className="text-manor-gray font-medium uppercase text-sm tracking-wide">
                    {service.capacity}
                  </p>

                  <p className="text-manor-gray leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex justify-between items-center pt-4">
                    <span className="font-bold text-lg">
                      {service.pricing}
                    </span>
                    <button 
                      className={`px-6 py-3 font-bold uppercase tracking-wide text-sm transition-all duration-300 ${
                        service.available
                          ? 'bg-manor-black text-manor-white hover:bg-manor-gray'
                          : 'bg-manor-gray text-manor-white cursor-not-allowed opacity-50'
                      }`}
                      disabled={!service.available}
                    >
                      {service.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-manor-black text-manor-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="manor-heading text-4xl md:text-5xl mb-6">
            Ready to Book?
          </h2>
          <p className="text-xl mb-8 font-light">
            Contact us for custom packages or to make a reservation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="manor-btn-primary">
              Book Now
            </button>
            <a href="tel:+61812345678" className="manor-btn-secondary">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
