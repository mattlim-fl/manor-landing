
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
            Our Services
          </h1>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 animate-fade-in">
            {/* Karaoke */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px]">
              <div 
                className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-12 py-8">
                <h2 className="manor-heading text-4xl mb-6 text-manor-white">
                  KARAOKE
                </h2>
                <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg">
                  Private karaoke sessions with premium sound system and song selection.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Link 
                    to="/karaoke#booking-container"
                    className="manor-btn-primary w-full"
                  >
                    BOOK NOW
                  </Link>
                  <Link 
                    to="/karaoke"
                    className="manor-btn-secondary w-full"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>

            {/* 25+ Priority Entry */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px]">
              <div 
                className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-12 py-8">
                <h2 className="manor-heading text-4xl mb-6 text-manor-white">
                  25+ PRIORITY ENTRY
                </h2>
                <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg">
                  Skip the queue with guaranteed priority entry for ages 25 and over.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Link 
                    to="/priority-entry#booking-container"
                    className="manor-btn-primary w-full"
                  >
                    BOOK NOW
                  </Link>
                  <Link 
                    to="/priority-entry"
                    className="manor-btn-secondary w-full"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>

            {/* Birthdays & Occasions */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px] lg:col-span-1 md:col-span-2">
              <div 
                className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-12 py-8">
                <h2 className="manor-heading text-4xl mb-6 text-manor-white">
                  BIRTHDAYS & OCCASIONS
                </h2>
                <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg">
                  Celebrate your special moments with customized party packages.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Link 
                    to="/birthdays-occasions#booking-container"
                    className="manor-btn-primary w-full"
                  >
                    BOOK NOW
                  </Link>
                  <Link 
                    to="/birthdays-occasions"
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
