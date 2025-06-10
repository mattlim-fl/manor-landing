
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Services = () => {
  return (
    <div className="min-h-screen bg-manor-black text-manor-white">
      <Header />
      
      {/* Services Hero Section */}
      <div className="relative h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="manor-heading text-6xl md:text-8xl text-manor-white mb-12 animate-fade-in">
            Venue Hire
          </h1>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 animate-fade-in">
            {/* Downstairs */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px]">
              <div 
                className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-12 py-8">
                <h2 className="manor-heading text-4xl mb-6 text-manor-white">
                  DOWNSTAIRS
                </h2>
                <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg">
                  Hire our intimate downstairs area with main bar, dancefloor, and terrace access for up to 80 people.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Link 
                    to="/downstairs#booking-container"
                    className="manor-btn-primary w-full"
                  >
                    BOOK NOW
                  </Link>
                  <Link 
                    to="/downstairs"
                    className="manor-btn-secondary w-full"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>

            {/* Upstairs */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px]">
              <div 
                className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-12 py-8">
                <h2 className="manor-heading text-4xl mb-6 text-manor-white">
                  UPSTAIRS
                </h2>
                <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg">
                  Premium upstairs area with VIP seating, elevated views, and sophisticated atmosphere for up to 60 people.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Link 
                    to="/upstairs#booking-container"
                    className="manor-btn-primary w-full"
                  >
                    BOOK NOW
                  </Link>
                  <Link 
                    to="/upstairs"
                    className="manor-btn-secondary w-full"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>

            {/* Full Venue */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px] lg:col-span-1 md:col-span-2">
              <div 
                className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-12 py-8">
                <h2 className="manor-heading text-4xl mb-6 text-manor-white">
                  FULL VENUE
                </h2>
                <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg">
                  Complete exclusive hire of the entire Manor for major events, celebrations, and corporate functions up to 150 people.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Link 
                    to="/full-venue#booking-container"
                    className="manor-btn-primary w-full"
                  >
                    BOOK NOW
                  </Link>
                  <Link 
                    to="/full-venue"
                    className="manor-btn-secondary w-full"
                  >
                    LEARN MORE
                  </Link>
                </div>
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
