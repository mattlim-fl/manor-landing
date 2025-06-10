
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-manor-black text-manor-white">
      <Header />
      
      {/* Hero Section - Full Width */}
      <div className="relative h-screen flex flex-col">
        {/* Main Hero */}
        <div className="flex-1 relative overflow-hidden">
          {/* Static Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
            }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <h1 className="manor-heading text-6xl md:text-8xl lg:text-9xl text-manor-white mb-6 animate-fade-in">
              MANOR
            </h1>
            <div className="space-y-4 mb-12 animate-fade-in">
              <p className="text-lg md:text-xl font-light tracking-wider text-manor-gold">Leederville</p>
            </div>
            
            {/* Service Cards */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 animate-fade-in max-w-7xl mx-auto">
              {/* Karaoke */}
              <div className="relative group overflow-hidden rounded-lg min-h-[400px] min-w-[300px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col justify-between items-center text-center px-8 py-6">
                  <div className="flex-1 flex items-center">
                    <h2 className="manor-heading text-3xl text-manor-white">
                      KARAOKE
                    </h2>
                  </div>
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Link 
                      to="/karaoke#booking-container"
                      className="bg-manor-gold text-manor-black px-6 py-3 font-medium hover:bg-yellow-400 transition-colors text-center rounded"
                    >
                      BOOK NOW
                    </Link>
                    <Link 
                      to="/karaoke"
                      className="border-2 border-manor-white text-manor-white px-6 py-3 font-medium hover:bg-manor-white hover:text-manor-black transition-colors text-center rounded"
                    >
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>

              {/* 25+ Priority Entry */}
              <div className="relative group overflow-hidden rounded-lg min-h-[400px] min-w-[300px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col justify-between items-center text-center px-8 py-6">
                  <div className="flex-1 flex items-center">
                    <h2 className="manor-heading text-3xl text-manor-white">
                      25+ PRIORITY ENTRY
                    </h2>
                  </div>
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Link 
                      to="/priority-entry#booking-container"
                      className="bg-manor-gold text-manor-black px-6 py-3 font-medium hover:bg-yellow-400 transition-colors text-center rounded"
                    >
                      BOOK NOW
                    </Link>
                    <Link 
                      to="/priority-entry"
                      className="border-2 border-manor-white text-manor-white px-6 py-3 font-medium hover:bg-manor-white hover:text-manor-black transition-colors text-center rounded"
                    >
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>

              {/* Birthdays & Occasions */}
              <div className="relative group overflow-hidden rounded-lg min-h-[400px] min-w-[300px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col justify-between items-center text-center px-8 py-6">
                  <div className="flex-1 flex items-center">
                    <h2 className="manor-heading text-3xl text-manor-white">
                      BIRTHDAYS & OCCASIONS
                    </h2>
                  </div>
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Link 
                      to="/birthdays-occasions#booking-container"
                      className="bg-manor-gold text-manor-black px-6 py-3 font-medium hover:bg-yellow-400 transition-colors text-center rounded"
                    >
                      BOOK NOW
                    </Link>
                    <Link 
                      to="/birthdays-occasions"
                      className="border-2 border-manor-white text-manor-white px-6 py-3 font-medium hover:bg-manor-white hover:text-manor-black transition-colors text-center rounded"
                    >
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>

              {/* Venue Hire */}
              <div className="relative group overflow-hidden rounded-lg min-h-[400px] min-w-[300px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col justify-between items-center text-center px-8 py-6">
                  <div className="flex-1 flex items-center">
                    <h2 className="manor-heading text-3xl text-manor-white">
                      VENUE HIRE
                    </h2>
                  </div>
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Link 
                      to="/services"
                      className="bg-manor-gold text-manor-black px-6 py-3 font-medium hover:bg-yellow-400 transition-colors text-center rounded"
                    >
                      VIEW OPTIONS
                    </Link>
                    <Link 
                      to="/services"
                      className="border-2 border-manor-white text-manor-white px-6 py-3 font-medium hover:bg-manor-white hover:text-manor-black transition-colors text-center rounded"
                    >
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
