
import Header from "../components/Header";

const Contact = () => {
  return (
    <div className="min-h-screen bg-manor-black text-manor-white">
      <Header />
      
      {/* Contact Hero Section */}
      <div className="relative h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-blur font-medium text-6xl md:text-8xl text-manor-white mb-12 animate-fade-in uppercase tracking-wider">
            Contact
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 text-lg animate-fade-in">
            <div className="space-y-6">
              <div>
                <h3 className="font-blur font-medium text-2xl mb-4 text-manor-gold uppercase tracking-wider">Address</h3>
                <p className="text-xl">
                  123 Nightlife Street<br />
                  Perth WA 6000
                </p>
              </div>
              
              <div>
                <h3 className="font-blur font-medium text-2xl mb-4 text-manor-gold uppercase tracking-wider">Hours</h3>
                <p className="text-xl">
                  Thursday - Saturday<br />
                  9PM - 3AM
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-blur font-medium text-2xl mb-4 text-manor-gold uppercase tracking-wider">Phone</h3>
                <p className="text-xl">+61 8 1234 5678</p>
              </div>
              
              <div>
                <h3 className="font-blur font-medium text-2xl mb-4 text-manor-gold uppercase tracking-wider">Email</h3>
                <p className="text-xl">info@manor.com.au</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 animate-fade-in">
            <button className="manor-btn-primary">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
