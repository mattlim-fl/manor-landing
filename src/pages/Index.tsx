
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-manor-black text-manor-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-screen flex flex-col lg:flex-row">
        {/* Left Side - Main Hero */}
        <div className="flex-1 relative bg-cover bg-center bg-no-repeat" 
             style={{
               backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
             }}>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="manor-heading text-6xl md:text-8xl lg:text-9xl text-manor-white mb-6 animate-fade-in">
              MANOR
            </h1>
            <div className="space-y-4 mb-8 animate-fade-in">
              <p className="text-xl md:text-2xl font-light tracking-wide">
                Open Thu-Sat 9PM-3AM
              </p>
              <p className="text-lg md:text-xl font-light tracking-wider text-manor-gold">
                Perth, WA
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <button className="manor-btn-primary">
                Book Now
              </button>
              <Link to="/services" className="manor-btn-secondary">
                Our Offers
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Services Preview */}
        <div className="flex-1 bg-manor-white text-manor-black p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="manor-heading text-4xl md:text-5xl mb-12 text-center lg:text-left">
            Experience
          </h2>
          
          <div className="space-y-8">
            {/* VIP Tables */}
            <div className="border-b border-manor-gray pb-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="manor-heading text-2xl md:text-3xl">VIP Tables</h3>
                <span className="text-manor-gold font-bold uppercase text-sm tracking-wide">
                  Available Now
                </span>
              </div>
              <p className="text-manor-gray mb-4 text-lg">
                Tables for 2-12 people. Reserve your spot for Thursday, Friday or Saturday nights.
              </p>
              <button className="bg-manor-black text-manor-white px-6 py-3 font-bold uppercase tracking-wide transition-all duration-300 hover:bg-manor-gray">
                Book VIP Table
              </button>
            </div>

            {/* Special Events */}
            <div className="border-b border-manor-gray pb-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="manor-heading text-2xl md:text-3xl">Special Events</h3>
                <span className="text-manor-gold font-bold uppercase text-sm tracking-wide">
                  Available Now
                </span>
              </div>
              <p className="text-manor-gray mb-4 text-lg">
                Corporate events, private parties, and celebrations. Contact for custom packages.
              </p>
              <button className="bg-manor-black text-manor-white px-6 py-3 font-bold uppercase tracking-wide transition-all duration-300 hover:bg-manor-gray">
                Book Event
              </button>
            </div>

            {/* Karaoke Booths */}
            <div className="pb-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="manor-heading text-2xl md:text-3xl">Karaoke Booths</h3>
                <span className="text-manor-gray font-bold uppercase text-sm tracking-wide">
                  Coming Soon
                </span>
              </div>
              <p className="text-manor-gray mb-4 text-lg">
                Private karaoke booths for small groups. Perfect for intimate celebrations.
              </p>
              <button className="bg-manor-gray text-manor-white px-6 py-3 font-bold uppercase tracking-wide cursor-not-allowed opacity-50">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-manor-black py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="manor-heading text-4xl md:text-5xl mb-8">
            Contact
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-lg">
            <div>
              <h3 className="font-bold mb-2 text-manor-gold">Address</h3>
              <p>123 Nightlife Street<br />Perth WA 6000</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-manor-gold">Phone</h3>
              <p>+61 8 1234 5678</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
