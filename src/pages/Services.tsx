
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Services = () => {
  return (
    <div className="min-h-screen bg-manor-black text-manor-white">
      <Header />
      
      {/* Services Hero Section */}
      <div className="relative h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="manor-heading text-6xl md:text-8xl text-manor-white mb-12 animate-fade-in">
            Our Offers
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
            {/* VIP Tables */}
            <div className="relative group overflow-hidden rounded-lg">
              <div 
                className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                <h2 className="manor-heading text-4xl mb-4 text-manor-white">
                  VIP TABLES
                </h2>
                <p className="text-lg mb-6 text-manor-white">
                  Premium table service with dedicated waitstaff and prime dancefloor location.
                </p>
                <Link 
                  to="/vip-tables"
                  className="manor-btn-primary"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Special Events */}
            <div className="relative group overflow-hidden rounded-lg">
              <div 
                className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                <h2 className="manor-heading text-4xl mb-4 text-manor-white">
                  SPECIAL EVENTS
                </h2>
                <p className="text-lg mb-6 text-manor-white">
                  Full venue hire for corporate events, private parties, and celebrations.
                </p>
                <Link 
                  to="/special-events"
                  className="manor-btn-primary"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 animate-fade-in">
            <Link to="/contact" className="manor-btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
