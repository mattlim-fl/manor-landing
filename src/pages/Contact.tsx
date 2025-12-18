import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col leopard-bg text-white">
      <Header />
      
      {/* Contact Hero Section */}
      <div className="flex-1 flex flex-col justify-center pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="font-blur font-bold text-4xl md:text-5xl lg:text-6xl mb-12 animate-fade-in uppercase tracking-wider"
            style={{ color: '#E59D50' }}
          >
            Contact
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 text-lg animate-fade-in">
            <div className="space-y-6">
              <div>
                <h3 
                  className="font-blur font-bold text-2xl mb-4 uppercase tracking-wider"
                  style={{ color: '#D04E2B' }}
                >
                  Address
                </h3>
                <p 
                  className="text-xl font-acumin"
                  style={{ color: '#E59D50' }}
                >
                  663 Newcastle St<br />
                  Leederville WA 6007
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-blur font-bold text-2xl mb-4 uppercase tracking-wider"
                  style={{ color: '#D04E2B' }}
                >
                  Hours
                </h3>
                <p 
                  className="text-xl font-acumin"
                  style={{ color: '#E59D50' }}
                >
                  Saturdays<br />
                  9PM - 5AM
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 
                  className="font-blur font-bold text-2xl mb-4 uppercase tracking-wider"
                  style={{ color: '#D04E2B' }}
                >
                  Phone
                </h3>
                <p 
                  className="text-xl font-acumin"
                  style={{ color: '#E59D50' }}
                >
                  (08) 9227 8349
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-blur font-bold text-2xl mb-4 uppercase tracking-wider"
                  style={{ color: '#D04E2B' }}
                >
                  Email
                </h3>
                <p 
                  className="text-xl font-acumin"
                  style={{ color: '#E59D50' }}
                >
                  afterdark@manorleederville.com.au
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 animate-fade-in">
            <a 
              href="mailto:afterdark@manorleederville.com.au"
              className="nav-btn inline-block font-blur font-bold px-10 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
