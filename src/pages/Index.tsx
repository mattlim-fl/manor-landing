
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-manor-black text-manor-white">
      <Header />
      
      {/* Hero Section - Full Width */}
      <div className="relative min-h-screen flex flex-col">
        {/* Main Hero */}
        <div className="flex-1 relative overflow-hidden">
          {/* Black Background */}
          <div className="absolute inset-0 bg-manor-black" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <div className="pt-20 pb-8">
              <h1 className="manor-heading text-6xl md:text-8xl lg:text-9xl text-manor-white mb-6 animate-fade-in">
                MANOR
              </h1>
              <div className="space-y-4 mb-12 animate-fade-in">
                <p className="text-lg md:text-xl font-light tracking-wider text-manor-gold">Leederville</p>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons - Bottom Right */}
          <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-20">
            <Link 
              to="/karaoke"
              className="bg-manor-gold text-manor-black font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-manor-black hover:text-manor-gold hover:border hover:border-manor-gold text-sm whitespace-nowrap"
            >
              Karaoke
            </Link>
            
            <Link 
              to="/services"
              className="bg-manor-gold text-manor-black font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-manor-black hover:text-manor-gold hover:border hover:border-manor-gold text-sm whitespace-nowrap"
            >
              Venue Hire
            </Link>
            
            <Link 
              to="/priority-entry"
              className="bg-manor-gold text-manor-black font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-manor-black hover:text-manor-gold hover:border hover:border-manor-gold text-sm whitespace-nowrap"
            >
              25+ Priority Entry
            </Link>
            
            <Link 
              to="/birthdays-occasions"
              className="bg-manor-gold text-manor-black font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-manor-black hover:text-manor-gold hover:border hover:border-manor-gold text-sm whitespace-nowrap"
            >
              Guest List & Birthdays
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
