
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";

const Index = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen bg-manor-black text-manor-white">
      <Header />
      
      {/* Hero Section - Full Width */}
      <div className="relative h-screen flex flex-col">
        {/* Main Hero */}
        <div className="flex-1 relative overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
              }}
            />
          </video>
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <h1 className="manor-heading text-6xl md:text-8xl lg:text-9xl text-manor-white mb-6 animate-fade-in">
              MANOR
            </h1>
            <div className="space-y-4 mb-8 animate-fade-in">
              <p className="text-lg md:text-xl font-light tracking-wider text-manor-gold">Leederville</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <button 
                onClick={() => setShowBookingModal(true)}
                className="manor-btn-primary"
              >
                Book Now
              </button>
              <Link to="/services" className="manor-btn-secondary">
                Our Offers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] bg-manor-white">
          <DialogHeader>
            <DialogTitle className="text-manor-black text-2xl manor-heading">
              Book Your Manor Experience
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <iframe
              src="https://hippieclub.simplybook.net/v2/#book"
              width="100%"
              height="600"
              frameBorder="0"
              className="w-full rounded-lg"
              title="Manor Booking Form"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
