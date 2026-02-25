import Header from "../components/Header";
import Footer from "../components/Footer";
import { ContactForm } from "../components/contact";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col leopard-bg text-white">
      <Header />

      {/* Contact Section */}
      <div className="flex-1 flex flex-col pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto w-full">
          <h1
            className="font-blur font-bold text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in uppercase tracking-wider text-center"
            style={{ color: '#E59D50' }}
          >
            Contact
          </h1>

          <p className="text-center text-white/70 font-acumin max-w-md mx-auto mb-10">
            Have a question or need to get in touch? Select a category below and we'll help you out.
          </p>

          {/* Contact Form */}
          <div className="max-w-lg mx-auto animate-fade-in">
            <div className="bg-black/60 backdrop-blur-sm border-2 border-manor-gold/30 rounded-xl p-6 md:p-8">
              <ContactForm venue="manor" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 text-center animate-fade-in">
            <div>
              <h3
                className="font-blur font-bold text-xl mb-3 uppercase tracking-wider"
                style={{ color: '#D04E2B' }}
              >
                Address
              </h3>
              <p
                className="text-lg font-acumin"
                style={{ color: '#E59D50' }}
              >
                663 Newcastle St<br />
                Leederville WA 6007
              </p>
            </div>

            <div>
              <h3
                className="font-blur font-bold text-xl mb-3 uppercase tracking-wider"
                style={{ color: '#D04E2B' }}
              >
                Email
              </h3>
              <p
                className="text-lg font-acumin"
                style={{ color: '#E59D50' }}
              >
                afterdark@manorleederville.com.au
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
