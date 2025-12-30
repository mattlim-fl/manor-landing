import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import SocialEnquiryModal from '../components/SocialEnquiryModal';
import { ENABLE_SOCIAL_ENQUIRY, INSTAGRAM_HANDLE, FACEBOOK_PAGE_URL } from '@/lib/config';

const guestListImages = [
  '/venue-dancefloor.png',
  '/venue-bar-crowd.png',
  '/venue-disco-balls.png',
];

const BirthdaysOccasions = () => {
  const [showSocialEnquiry, setShowSocialEnquiry] = useState(false);

  const handleEnquireClick = () => {
    if (ENABLE_SOCIAL_ENQUIRY) {
      setShowSocialEnquiry(true);
    } else {
      window.location.href = 'mailto:afterdark@manorleederville.com.au?subject=Birthdays%20%26%20Occasions%20Enquiry';
    }
  };

  return (
    <div className="min-h-screen flex flex-col leopard-bg text-white">
      <Header showLogo={true} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto w-full">
          
          {/* Page Title */}
          <h1 
            className="font-blur font-bold text-4xl md:text-5xl lg:text-6xl text-center mb-8 uppercase tracking-wider"
            style={{ color: '#E59D50' }}
          >
            Guest List
          </h1>

          {/* Image Carousel */}
          <div className="mb-8">
            <ImageCarousel 
              images={guestListImages} 
              alt="Venue"
            />
          </div>

          {/* Subheading */}
          <h2 
            className="font-blur font-bold text-2xl md:text-3xl text-center mb-4 uppercase tracking-wider"
            style={{ color: '#D04E2B' }}
          >
            Birthdays & Occasions
          </h2>

          {/* Description */}
          <div className="text-center mb-8">
            <p 
              className="text-base md:text-lg font-acumin mb-2"
              style={{ color: '#E59D50' }}
            >
              Message our team to organise a birthday or special occasion.
            </p>
            <p 
              className="text-base md:text-lg font-acumin"
              style={{ color: '#E59D50' }}
            >
              Guest List entry and reserved areas available.
            </p>
          </div>

          {/* Enquire Button */}
          <div className="flex justify-center mb-12">
            <button 
              onClick={handleEnquireClick}
              className="nav-btn inline-block font-blur font-bold px-10 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300"
            >
              ENQUIRE
            </button>
          </div>

        </div>
      </div>

      <Footer />

      {/* Social Enquiry Modal */}
      <SocialEnquiryModal
        isOpen={showSocialEnquiry}
        onClose={() => setShowSocialEnquiry(false)}
        instagramHandle={INSTAGRAM_HANDLE}
        facebookPageUrl={FACEBOOK_PAGE_URL}
      />
    </div>
  );
};

export default BirthdaysOccasions;
