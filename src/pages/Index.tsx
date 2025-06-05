import { Link } from "react-router-dom";
import Header from "../components/Header";
const Index = () => {
  return <div className="min-h-screen bg-manor-black text-manor-white">
      <Header />
      
      {/* Hero Section - Full Width */}
      <div className="relative h-screen flex flex-col">
        {/* Main Hero */}
        <div className="flex-1 relative bg-cover bg-center bg-no-repeat" style={{
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
              <p className="text-lg md:text-xl font-light tracking-wider text-manor-gold">Leederville, WA</p>
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
      </div>
    </div>;
};
export default Index;